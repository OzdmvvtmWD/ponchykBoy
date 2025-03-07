from decimal import Decimal
from backend import settings
from app.models import Product

class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            print("empty cart")
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, product, number: int, is_update_num: bool):
        product_id = str(product.id)

        if product_id not in self.cart:
            self.cart[product_id] = {'number': 0, 'cost': str(product.cost)}
        if is_update_num:
            self.cart[product_id]['number'] = number
        else:
            self.cart[product_id]['number'] += number
        self.save() 

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True

    def get_total_cost(self):
        return sum(Decimal(item['cost']) * item['number'] for item in self.cart.values())

    def get_all(self):
        
        print(self.session[settings.CART_SESSION_ID])
        return self.cart
    
    def is_empty(self):
        return self.__len__() <= 0

    def __iter__(self):
        product_ids = self.cart.keys()
        products = Product.objects.filter(id__in=product_ids)
        for product in products:
            self.cart[str(product.id)]['product'] = product

        for item in self.cart.values():
            item['cost'] = Decimal(item['cost'])
            item['total_cost'] = item['cost'] * item['number']
            yield item

    def __len__(self):
        return sum(item['number'] for item in self.cart.values())
