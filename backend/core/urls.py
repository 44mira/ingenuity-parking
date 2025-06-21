from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/",
        include(
            (
                [
                    path("auth/", include("dj_rest_auth.urls")),
                    path(
                        "auth/registration/",
                        include("dj_rest_auth.registration.urls"),
                    ),
                    path(
                        "parking/",
                        include(
                            ("parking.api.v1.urls", "parking"),
                            namespace="parking",
                        ),
                    ),
                ],
                "v1",
            ),
            namespace="v1",
        ),
    ),
]

api_info = openapi.Info(
    title="Ingenuity Parking API",
    default_version="v1",
)

schema_view = get_schema_view(
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns += [
    path(
        "api/swagger<format>/",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "api/docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        "api/redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]
