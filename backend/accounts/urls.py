from os import access
from django.urls import path

from .views import AccountLogin, AccountCreate

urlpatterns = [
    path('login/', AccountLogin.as_view()),
    path('create/', AccountCreate.as_view()),
]
