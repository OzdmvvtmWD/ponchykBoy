from django.contrib import admin
from .models import Order, OrderItem, ShopFilial, Status

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','order_status', 'name', 'surname', 'email', 'phone_number', 'shop', 'order_date', 'created')
    list_filter = ( 'order_status','created', 'order_date', 'shop')
    search_fields = ('id','name', 'surname', 'email', 'phone_number')
    inlines = [OrderItemInline]



admin.site.register(Order,OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(ShopFilial)
admin.site.register(Status)