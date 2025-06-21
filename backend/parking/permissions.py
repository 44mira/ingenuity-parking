from datetime import datetime

from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow full access for admin; read-only for other users.
    """

    def has_permission(self, request, view):
        if request.user.is_staff:
            return True
        return request.method in permissions.SAFE_METHODS


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allow full access only for reservation owner; read-only otherwise.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
