from os import access
from django.urls import path

from .views import AccountLogin, AccountCreate, AccountGetUser

urlpatterns = [
    path('login', AccountLogin.as_view()),
    path('create', AccountCreate.as_view()),
    path('user', AccountGetUser.as_view())
]
