from django.urls import path

from .views import Pages, Page

urlpatterns = [
    path('', Pages.as_view()),
    path('<int:page_id>/', Page.as_view()),
]
