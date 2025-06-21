from django.contrib import admin

from parking.models import ParkingLocation, ParkingReservation


@admin.register(ParkingLocation)
class ParkingLocationAdmin(admin.ModelAdmin):
    fields = ["name", "slots"]
    list_display = ["name", "slots"]
    search_fields = ["name"]
    search_help_text = "Search locations by name."


@admin.register(ParkingReservation)
class ParkingReservationAdmin(admin.ModelAdmin):
    list_display = [
        "location__name",
        "status",
        "created_at",
        "reserve_start",
        "reserve_end",
        "price",
    ]
    search_fields = ["location__name", "created_at", "status"]
    search_help_text = "Search through reservations."
