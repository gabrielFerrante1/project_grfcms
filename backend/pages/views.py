from rest_framework.views import APIView

from rest_framework import status
from rest_framework.response import Response
from django.http.response import Http404

from websites.models import Website

from .models import Page as ModelPage
from .serializers import PagesSerializer, PageSerializer


class Pages(APIView):
    def get(self, request):
        pages = ModelPage.objects.filter(user_id=request.user.id)

        pages = PagesSerializer(pages, many=True)

        return Response(pages.data)

    def post(self, request):
        website_id = request.POST.get('website', 0)
        if not Website.objects.filter(id=website_id, user_id=request.user.id).first():
            return Response({"detail": "Envie o parametro website"}, status=status.HTTP_400_BAD_REQUEST)

        page = PageSerializer(data=request.data)

        if page.is_valid():
            page.save(website_id=website_id, user_id=request.user.id)
            return Response(page.data, status=status.HTTP_201_CREATED)

        return Response(page.errors, status=status.HTTP_400_BAD_REQUEST)


class Page(APIView):
    def get_queryset(self, page_id, user_id, list=False):
        page_queryset = ModelPage.objects.filter(
            id=page_id, user_id=user_id)

        if not page_queryset:
            raise Http404()

        if list == True:
            page_queryset = page_queryset.get()
        else:
            page_queryset = page_queryset.first()

        return page_queryset

    def get(self, request, page_id):
        page = self.get_queryset(page_id, request.user.id, list=True)

        page = PageSerializer(page)

        return Response(page.data)

    def put(self, request, page_id):
        page_queryset = self.get_queryset(page_id, request.user.id)

        serializer = PageSerializer(
            page_queryset, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.update(instance=page_queryset,
                              validated_data=request.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, page_id):
        page = self.get_queryset(page_id, request.user.id)
        page.delete()

        return Response({"id": page_id})
