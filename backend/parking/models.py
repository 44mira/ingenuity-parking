from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from djmoney.models.fields import MoneyField
from moneyed import PHP


class ParkingLocation(models.Model):
    class Meta:
        verbose_name = _("Location")
        verbose_name_plural = _("Locations")

    slots = models.IntegerField(
        _("Slots"),
        help_text="The number of parking slots in the location.",
    )
    name = models.CharField(
        _("Name"),
        max_length=50,
        help_text="The name of the parking location.",
    )

    def get_available_slots(self):
        """
        Available slots are obtained by subtracting active and upcoming slots
        from capacity.
        """
        status = ParkingReservation.Status
        return (
            self.slots
            - self.reservations.filter(
                status__in=[status.ACTIVE.value, status.UPCOMING.value]
            ).count()
        )

    def __str__(self):
        return self.name


class ParkingReservation(models.Model):
    class Meta:
        verbose_name = _("Reservation")
        verbose_name_plural = _("Reservations")

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", _("Active")
        UPCOMING = "UPCOMING", _("Upcoming")
        CANCELLED = "CANCELLED", _("Cancelled")
        PAST = "PAST", _("Past")

    location = models.ForeignKey(
        ParkingLocation,
        on_delete=models.CASCADE,
        related_name="reservations",
        help_text="The parking location associated with this reservation.",
        verbose_name=_("Parking Location"),
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reservations",
        help_text="The owner of this reservation.",
        verbose_name=_("Owner"),
    )

    price = MoneyField(
        verbose_name=_("Price"),
        max_digits=14,
        decimal_places=2,
        default_currency=PHP,
        help_text="The price of the reservation slot.",
    )

    status = models.CharField(
        _("Status"),
        max_length=15,
        choices=Status.choices,
        help_text="The status of this reservation.",
    )

    reserve_start = models.DateTimeField(
        _("Reservation Start"),
        help_text="The start date and time of the reservation.",
    )
    reserve_end = models.DateTimeField(
        _("Reservation End"),
        help_text="The end date and time of the reservation.",
    )

    created_at = models.DateTimeField(
        _("Created at"),
        auto_now_add=True,
        help_text="The time the reservation was created.",
    )

    def clean(self, *args, **kwargs):
        # check for slot count
        if self.location.slots <= 0:
            raise ValidationError(
                "There are no slots available for this parking location."
            )

        # check for invalid range
        if self.reserve_start >= self.reserve_end:
            raise ValidationError("Start date must be before end date.")

        # check for overlapping
        # for all active or upcoming reservations:
        # (StartA <= EndB) AND (EndA >= StartB)
        overlaps = ParkingReservation.objects.exclude(pk=self.pk).filter(
            Q(location=self.location)
            & Q(status__in=[self.Status.ACTIVE.value, self.Status.UPCOMING.value])
            & Q(reserve_start__lte=self.reserve_end)
            & Q(reserve_end__gte=self.reserve_start),
        )

        if self.status in ("ACTIVE", "UPCOMING") and overlaps.exists():
            raise ValidationError(
                "This reservation overlaps with an existing reservation."
            )

        super().clean(*args, **kwargs)

    def __str__(self):
        return f"{self.location.name} : {self.reserve_start}-{self.reserve_end}"
