from django.db import models

from websites.models import Website


class History(models.Model):
    ip = models.CharField(max_length=80)
    website = models.ForeignKey(Website, on_delete=models.CASCADE)
    banned = models.BooleanField(default=0)
    date = models.DateTimeField(auto_now_add=True)
