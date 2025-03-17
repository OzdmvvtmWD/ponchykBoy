from django.core import mail
from django.template.loader import render_to_string

from celery import shared_task
from .models import Order


@shared_task(bind=True)
def order_created(self, order_id):
    try:
        order = Order.objects.get(id=order_id)

        text_content = render_to_string(
            "email/text_email.txt",
            context={
                "customer_name" : order.name + " " + order.surname,
                "order_number" : order.pk,
                "order_date" : order.created,
                "total_amount": order.get_total_cost()
            },
      
)
       
        subject = f"Order №{order.pk} "


        with mail.get_connection() as connection:
            mail.EmailMessage(
                subject=subject,
                body=text_content,
                from_email="from@example.com",
                to=[order.email],
                bcc=["bcc@example.com"],
                headers={"Message-ID": "foo"},
                connection=connection,
            ).send()

    except Exception as e:
        raise self.retry(exc=e, countdown=5)
