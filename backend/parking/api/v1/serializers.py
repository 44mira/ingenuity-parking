from django_restql.fields import NestedField
from django_restql.mixins import DynamicFieldsMixin
from django_restql.serializers import NestedModelSerializer
from rest_framework import serializers

from parking.models import ParkingLocation, ParkingReservation


class ParkingLocationSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = ParkingLocation
        fields = "__all__"


class ParkingReservationSerializer(DynamicFieldsMixin, NestedModelSerializer):
    location = NestedField(ParkingLocationSerializer, accept_pk_only=True)

    class Meta:
        model = ParkingReservation
        fields = "__all__"
