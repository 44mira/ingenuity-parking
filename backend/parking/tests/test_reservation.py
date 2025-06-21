from datetime import datetime

import pytest
from django.core.exceptions import ValidationError
from djmoney.money import Money
from pytest_django import asserts

from parking.models import ParkingLocation, ParkingReservation


@pytest.mark.django_db
def test_no_reservation_overlap(parking_reservation, parking_location, user):
    initial_slots = parking_location.get_available_slots()

    try:
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2024-10-01T12:00:00Z"),
            reserve_end=datetime.fromisoformat("2024-10-01T12:30:00Z"),
            price=Money(10, "PHP"),
            status="PAST",
            owner=user,
        )
        pr.full_clean()
        pr.save()

        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2024-10-01T12:00:00Z"),
            reserve_end=datetime.fromisoformat("2024-10-01T12:30:00Z"),
            price=Money(10, "PHP"),
            status="UPCOMING",
            owner=user,
        )
        pr.full_clean()
        pr.save()
    except ValidationError:
        assert False, "Should not raise ValidationError."

    assert parking_location.get_available_slots() == initial_slots - 1


@pytest.mark.django_db
def test_no_slots(user):
    parking_location = ParkingLocation.objects.create(
        name="Test Location 2",
        slots=0,
    )

    with asserts.assertRaisesMessage(
        ValidationError,
        "There are no slots available for this parking location.",
    ):
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2024-10-01T12:00:00Z"),
            reserve_end=datetime.fromisoformat("2024-10-01T12:30:00Z"),
            status="PAST",
            price=Money(10, "PHP"),
            owner=user,
        )
        pr.full_clean()
        pr.save()

    assert parking_location.get_available_slots() == 0


@pytest.mark.django_db
def test_invalid_date(parking_location, user):
    initial_slots = parking_location.get_available_slots()

    with asserts.assertRaisesMessage(
        ValidationError,
        "Start date must be before end date.",
    ):
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T13:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            status="PAST",
            price=Money(10, "PHP"),
            owner=user,
        )

        pr.full_clean()
        pr.save()

    assert parking_location.get_available_slots() == initial_slots


@pytest.mark.django_db
def test_reservation_overlap(parking_reservation, parking_location, user):
    initial_slots = parking_location.get_available_slots()

    try:
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T13:00:00Z"),
            status="PAST",
            price=Money(10, "PHP"),
            owner=user,
        )
        pr.full_clean()
    except ValidationError:
        assert False, "Past overlap should not raise ValidationError."

    try:
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T13:00:00Z"),
            status="CANCELLED",
            price=Money(10, "PHP"),
            owner=user,
        )
        pr.full_clean()
    except ValidationError:
        assert False, "Cancelled overlap should not raise ValidationError."

    with asserts.assertRaisesMessage(
        ValidationError,
        "This reservation overlaps with an existing reservation.",
    ):
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T13:00:00Z"),
            status="ACTIVE",
            price=Money(10, "PHP"),
            owner=user,
        )
        pr.full_clean()
        pr.save()

    with asserts.assertRaisesMessage(
        ValidationError,
        "This reservation overlaps with an existing reservation.",
    ):
        pr = ParkingReservation(
            location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T11:30:00Z"),
            status="UPCOMING",
            price=Money(10, "PHP"),
            owner=user,
        )
        pr.full_clean()
        pr.save()

    assert parking_location.get_available_slots() == initial_slots
