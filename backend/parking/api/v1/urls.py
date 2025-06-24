from django.urls import include, path
from rest_framework import routers

from parking.api.v1.viewsets import (ParkingLocationViewSet,
                                     ParkingReservationViewSet, UserViewSet)

router = routers.SimpleRouter()
router.register("location", ParkingLocationViewSet, basename="location")
router.register("reservation", ParkingReservationViewSet, basename="reservation")
router.register("user", UserViewSet, basename="user")

urlpatterns = router.urls
