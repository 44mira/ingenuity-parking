from datetime import datetime

import pytest
from django.core.exceptions import ValidationError
from pytest_django import asserts

from parking.models import ParkingLocation, ParkingReservation


@pytest.mark.django_db
def test_no_reservation_overlap(parking_reservation):
    parking_location = ParkingLocation.objects.first()
    initial_slots = parking_location.slots

    try:
        ParkingReservation.objects.create(
            parking_location=parking_location,
            reserve_start=datetime.fromisoformat("2024-10-01T12:00:00Z"),
            reserve_end=datetime.fromisoformat("2024-10-01T12:00:00Z"),
        )
    except ValidationError:
        assert False, "Should not raise ValidationError."

    assert parking_location.slots == initial_slots - 1


@pytest.mark.django_db
def test_no_slots():
    parking_location = ParkingLocation.objects.create(
        name="Test Location 2",
        slots=0,
    )

    with asserts.assertRaisesMessage(
        ValidationError,
        "There are no slots available for this parking location.",
    ):
        ParkingReservation.objects.create(
            parking_location=parking_location,
        )

    assert parking_location.slots == 0


@pytest.mark.django_db
def test_reservation_overlap(parking_reservation):
    parking_location = ParkingLocation.objects.first()
    initial_slots = parking_location.slots

    with asserts.assertRaisesMessage(
        ValidationError,
        "This reservation overlaps with an existing reservation.",
    ):
        ParkingReservation.objects.create(
            parking_location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T13:00:00Z"),
        )

    with asserts.assertRaisesMessage(
        ValidationError,
        "This reservation overlaps with an existing reservation.",
    ):
        ParkingReservation.objects.create(
            parking_location=parking_location,
            reserve_start=datetime.fromisoformat("2023-10-01T11:00:00Z"),
            reserve_end=datetime.fromisoformat("2023-10-01T11:30:00Z"),
        )

    assert parking_location.slots == initial_slots
