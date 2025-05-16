from django.core import mail
from django.template.loader import render_to_string

from celery import shared_task
from .models import Order, OrderItem


@shared_task(bind=True)
def order_created(self, order_id):
    try:
        order = Order.objects.get(id=order_id)
        items = OrderItem.objects.filter(order = order)

        print(items)

        text_content = render_to_string(
            "email/text_email.txt",
            context={
                "customer_name" : order.name + " " + order.surname,
                "order_number" : order.pk,
                "order_date" : order.created,
                "order_items" : items,
                "total_amount": order.get_total_cost()
            },
      
)
       
        subject = f"Order №{order.pk} "


        with mail.get_connection() as connection:
            mail.EmailMessage(
                subject=subject,
                body=text_content,
                from_email="ia.02guzbo@gmail.com",
                to=[order.email],
                bcc=["ia.02guzbo@gmail.com"],
                headers={"Message-ID": "order"},
                connection=connection,
            ).send()

    except Exception as e:
        raise self.retry(exc=e, countdown=5)
