from django.contrib import admin
from .models import Order, OrderItem


# class OrderItemInline(admin.TabularInline):
#     model = OrderItem
#     raw_id_fields = ['product']


# class OrderAdmin(admin.ModelAdmin):
#     list_display = ['id', 'email', 'phone_number', 'name',
#                     'surname', 'order_date', 'is_paid',
#                     'created', 'updated']
#     list_filter = ['is_paid', 'created', 'updated']
#     inlines = [OrderItemInline]

admin.site.register(Order)
admin.site.register(OrderItem)