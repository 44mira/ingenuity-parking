from datetime import datetime

import pytest

from parking.models import ParkingLocation, ParkingReservation


@pytest.fixture
@pytest.mark.django_db
def parking_location():
    return ParkingLocation.objects.create(slots=10, name="Test Location")


@pytest.fixture
@pytest.mark.django_db
def parking_reservation(parking_location):
    return ParkingReservation.objects.create(
        parking_location=parking_location,
        reserve_start=datetime.fromisoformat("2023-10-01T10:00:00Z"),
        reserve_end=datetime.fromisoformat("2023-10-01T12:00:00Z"),
    )
