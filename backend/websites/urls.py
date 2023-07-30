from django.urls import path

from .views import Websites, Website 

urlpatterns = [
    path('', Websites.as_view()),
    path('<int:website_id>/', Website.as_view()), 
]
