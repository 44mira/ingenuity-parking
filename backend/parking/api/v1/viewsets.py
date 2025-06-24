from django.contrib.auth.models import User
from django.db.models import Count, ExpressionWrapper, F, IntegerField, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from parking.api.v1.serializers import (ParkingLocationSerializer,
                                        ParkingReservationSerializer,
                                        UserSerializer)
from parking.models import ParkingLocation, ParkingReservation
from parking.permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


class ParkingLocationViewSet(viewsets.ModelViewSet):
    # optimize querying available slots by calculating in bulk
    queryset = ParkingLocation.objects.annotate(
        reserved_count=Count(
            "reservations",
            filter=Q(
                reservations__status__in=[
                    ParkingReservation.Status.ACTIVE.value,
                    ParkingReservation.Status.UPCOMING.value,
                ]
            ),
        )
    ).annotate(
        available_slots=ExpressionWrapper(
            F("slots") - F("reserved_count"),
            output_field=IntegerField(),
        )
    )

    serializer_class = ParkingLocationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name"]
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]


class ParkingReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ParkingReservationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["username"]
    filterset_fields = ["is_staff", "is_active"]
