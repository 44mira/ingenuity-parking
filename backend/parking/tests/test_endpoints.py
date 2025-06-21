from datetime import datetime

import pytest
from django.urls import reverse
from djmoney.money import Money

from parking.models import ParkingReservation


@pytest.mark.django_db
def test_reservation_cancel(client, parking_reservation, user):
    client.force_login(user)
    url = reverse(
        "v1:parking:reservation-cancel",
        args=[parking_reservation.id],
    )

    # sad path  ===============================================================

    response = client.post(url)
    parking_reservation.refresh_from_db()

    assert response.status_code == 400
    assert response.data["detail"] == "Can only cancel upcoming reservations."

    assert parking_reservation.status == "ACTIVE"

    # happy path ==============================================================

    parking_reservation.status = ParkingReservation.Status.UPCOMING
    parking_reservation.save()

    response = client.post(url)
    parking_reservation.refresh_from_db()

    assert response.status_code == 200
    assert response.data["detail"] == "Reservation cancelled."

    assert parking_reservation.status == "CANCELLED"


@pytest.mark.django_db
def test_reservation_scoping(
    client, user, superuser, parking_reservation, parking_location
):
    # user can only see their reservations ====================================

    ParkingReservation.objects.create(
        location=parking_location,
        reserve_start=datetime.fromisoformat("2023-12-01T10:00:00+00:00"),
        reserve_end=datetime.fromisoformat("2023-12-02T12:00:00+00:00"),
        price=Money(10, "PHP"),
        status="ACTIVE",
        owner=superuser,
    )

    client.force_login(user)
    url = reverse("v1:parking:reservation-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.data["results"]) == 1

    # superuser can see all reservations ======================================

    client.force_login(superuser)
    url = reverse("v1:parking:reservation-list")
    response = client.get(url)

    assert response.status_code == 200
    assert len(response.data["results"]) == 2


@pytest.mark.django_db
def test_location_permissions(client, user, superuser, parking_location):
    client.force_login(user)
    url_list = reverse("v1:parking:location-list")
    url_delete = reverse("v1:parking:location-detail", args=[1])

    response = client.get(url_list)

    assert response.status_code == 200
    assert len(response.data["results"]) == 1

    response = client.delete(url_delete)

    assert response.status_code == 403

    client.force_login(superuser)

    response = client.get(url_list)

    assert response.status_code == 200
    assert len(response.data["results"]) == 1

    response = client.delete(url_delete)

    assert response.status_code == 204
