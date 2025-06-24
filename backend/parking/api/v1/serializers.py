from django.contrib.auth.models import User
from django_restql.fields import NestedField
from django_restql.mixins import DynamicFieldsMixin
from django_restql.serializers import NestedModelSerializer
from rest_framework import serializers

from parking.models import ParkingLocation, ParkingReservation


class ParkingLocationSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    available_slots = serializers.SerializerMethodField()

    class Meta:
        model = ParkingLocation
        fields = "__all__"
        extra_fields = ["available_slots"]

    def get_available_slots(self, obj):
        return getattr(obj, "available_slots", obj.get_available_slots())


class ParkingReservationSerializer(DynamicFieldsMixin, NestedModelSerializer):
    location = NestedField(ParkingLocationSerializer, accept_pk_only=True)

    class Meta:
        model = ParkingReservation
        fields = "__all__"


class UserSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "pk",
            "username",
            "is_active",
            "is_staff",
            "last_login",
            "date_joined",
        ]
