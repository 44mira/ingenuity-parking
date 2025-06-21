from rest_framework import viewsets

from parking.api.v1.serializers import (ParkingLocationSerializer,
                                        ParkingReservationSerializer)
from parking.models import ParkingLocation, ParkingReservation


class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer


class ParkingReservationViewSet(viewsets.ModelViewSet):
    queryset = ParkingReservation.objects.all()
    serializer_class = ParkingReservationSerializer
