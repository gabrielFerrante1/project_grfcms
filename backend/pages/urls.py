from django.urls import path

from .views import Pages, Page, PageData

urlpatterns = [
    path('', Pages.as_view()),
    path('<int:page_id>', Page.as_view()),
    path('<str:page_slug>', PageData.as_view()),
]
