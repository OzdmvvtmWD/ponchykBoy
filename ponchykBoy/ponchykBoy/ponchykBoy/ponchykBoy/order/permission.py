from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwner(BasePermission):
  

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.is_active
        )

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsOwnerOrCreateOnly(BasePermission):
  

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Перевірка чи користувач — власник об'єкта
        return obj.user == request.user