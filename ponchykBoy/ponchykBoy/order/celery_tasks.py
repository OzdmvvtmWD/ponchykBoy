import time
from django.core.mail import send_mail
from celery import shared_task
from .models import Order


@shared_task
def order_created(order_id):
    time.sleep(50)
    print("task working!")
   
    # order = Order.objects.get(id=order_id)
    # subject = 'Order nr. {}'.format(order_id)
    # message = 'Dear {},\n\nYou have successfully placed an order.\
    #             Your order id is {}.'.format(order.name,
    #                                          order.id)
    # mail_sent = send_mail(subject,
    #                       message,
    #                       'admin@myshop.com',
    #                       [order.email])
    # return mail_sent