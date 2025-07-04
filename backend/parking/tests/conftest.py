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
def superuser():
    if su := User.objects.filter(username="SuperUser"):
        return su.first()

    return User.objects.create_superuser(
        "SuperUser",
        "test@email.com",
        password="123",
    )


@pytest.fixture
def user():
    if u := User.objects.filter(username="TestUser"):
        return u.first()

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
        reserve_start=datetime.fromisoformat("2023-10-01T10:00:00+00:00"),
        reserve_end=datetime.fromisoformat("2023-10-01T12:00:00+00:00"),
        price=Money(10, "PHP"),
        status="ACTIVE",
        owner=user,
    )
