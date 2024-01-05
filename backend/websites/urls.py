from django.urls import path

from .views import Websites, Website 

urlpatterns = [
    path('', Websites.as_view()),
    path('<str:website_slug>', Website.as_view()),
]
