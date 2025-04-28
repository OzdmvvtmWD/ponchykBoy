from django.core import mail
from django.template.loader import render_to_string

from celery import shared_task
from .models import Feedback


@shared_task(bind=True)
def feedback_created(self, feedback_id):
    try:
        feedback = Feedback.objects.get(id=feedback_id)

        text_content = render_to_string(
            "email/feedback_thanks_email.txt",
            context={
                "name":feedback.name,
                "surname":feedback.surname
                
            },
      
)
       
        subject = f"Feedback №{feedback.pk} "


        with mail.get_connection() as connection:
            mail.EmailMessage(
                subject=subject,
                body=text_content,
                from_email="ia.02guzbo@gmail.com",
                to=[feedback.email],
                bcc=["ia.02guzbo@gmail.com"],
                headers={"Message-ID": "order"},
                connection=connection,
            ).send()

    except Exception as e:
        raise self.retry(exc=e, countdown=5)
