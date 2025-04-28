from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Feedback
from .serializer import FeedbackSerializer
from .celery_tasks import feedback_created

class FeedbackViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        feedback = response.data  
        feedback_id = feedback.get('id')

        if feedback_id:
            feedback_created.delay(feedback_id)

        return response