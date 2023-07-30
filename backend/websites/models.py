from django.db import models

from accounts.models import User


class Website(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.TextField(max_length=200, null=True)
    bgcolor = models.CharField(
        max_length=100, null=True, default='#000000')
    txtcolor = models.CharField(
        max_length=100, null=True, default='#FFFFFF')
    slug = models.CharField(max_length=230, unique=True)
    user = models.ForeignKey(User,  on_delete=models.CASCADE)
