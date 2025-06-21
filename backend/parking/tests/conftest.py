from datetime import datetime

import pytest
from django.contrib.auth.models import User
from djmoney.money import Money

from parking.models import ParkingLocation, ParkingReservation


@pytest.fixture
def parking_location():
    if pl := ParkingLocation.objects.first():
        return pl

    return ParkingLocation.objects.create(slots=10, name="Test Location")


@pytest.fixture
def user():
    if u := User.objects.first():
        return u

    return User.objects.create_user(
        "TestUser",
        "test@email.com",
        password="123",
    )


@pytest.fixture
def parking_reservation(parking_location, user):
    if pr := ParkingReservation.objects.first():
        return pr

    return ParkingReservation.objects.create(
        location=parking_location,
        reserve_start=datetime.fromisoformat("2023-10-01T10:00:00Z"),
        reserve_end=datetime.fromisoformat("2023-10-01T12:00:00Z"),
        price=Money(10, "PHP"),
        status="PAST",
        owner=user,
    )
