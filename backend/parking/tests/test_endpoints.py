import pytest
from django.urls import reverse

from parking.models import ParkingReservation


@pytest.mark.django_db
def test_parking_reservation_cancel(client, parking_reservation, user):
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
