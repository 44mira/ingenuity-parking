from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from parking.api.v1.serializers import (ParkingLocationSerializer,
                                        ParkingReservationSerializer)
from parking.models import ParkingLocation, ParkingReservation
from parking.permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name"]
    permission_classes = [IsAdminOrReadOnly]


class ParkingReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ParkingReservationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    permission_classes = [IsOwnerOrReadOnly]
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
        return ParkingReservation.objects.filter(owner=self.request.user)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        reservation = self.get_object()

        if reservation.status != ParkingReservation.Status.UPCOMING:
            return Response(
                {"detail": "Can only cancel upcoming reservations."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reservation.status = ParkingReservation.Status.CANCELLED.value
        reservation.save()
        return Response(
            {"detail": "Reservation cancelled."},
            status=status.HTTP_200_OK,
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
