from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from parking.api.v1.serializers import (ParkingLocationSerializer,
                                        ParkingReservationSerializer)
from parking.models import ParkingLocation, ParkingReservation
from parking.permissions import (CanCancelReservation, IsAdminOrReadOnly,
                                 IsOwnerOrReadOnly)


class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name"]
    permission_classes = [IsAdminOrReadOnly]


class ParkingReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ParkingReservationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    permission_classes = [CanCancelReservation, IsOwnerOrReadOnly]
    search_fields = ["location__name"]
    filterset_fields = [
        "reserve_start",
        "reserve_end",
        "location__name",
        "status",
        "owner",
        "created_at",
    ]

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_staff:
            return ParkingReservation.objects.all()
        return ParkingReservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
