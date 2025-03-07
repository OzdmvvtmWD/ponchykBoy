import time
from django.core.mail import EmailMessage
from django.core.mail import send_mail
from celery import shared_task
from .models import Order


@shared_task
def order_created(order_id):
    time.sleep(50)
    order = Order.objects.get(id=order_id)
    subject = 'Order nr. {}'.format(order_id)
    message = 'Dear {},\n\nYou have successfully placed an order.\
                Your order id is {}.'.format(order.name,
                                             order.id)
    email = EmailMessage(
        subject,
        message,
        "from@example.com",
        [order.email],
        ["bcc@example.com"],
        # reply_to=["another@example.com"],
        headers={"Message-ID": "foo"},
    )

    return email