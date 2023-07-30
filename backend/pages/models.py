from django.db import models

from accounts.models import User
from websites.models import Website


class Page(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    slug = models.CharField(max_length=150, unique=True)
    is_index = models.BooleanField(default=False)
    website = models.ForeignKey(Website, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
