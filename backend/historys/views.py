from datetime import datetime
from rest_framework.views import APIView

from rest_framework import status
from rest_framework.response import Response
from django.http import Http404

from websites.models import Website

from .models import History
from .serializers import HistorySerializer, HistorysSerializer

from rest_framework.permissions import AllowAny


class Historys(APIView):
    def get(self, request):
        website_id = request.GET.get('website')
        if not website_id:
            return Response({
                'detail': "Envie o parametro website"
            }, status=status.HTTP_400_BAD_REQUEST)

        query_website = Website.objects.filter(
            id=website_id, user_id=request.user.id).first()
        if not query_website:
            raise Http404()

        historys = History.objects.filter(website_id=website_id)

        serializer = HistorysSerializer(historys, many=True)

        return Response({"historys": serializer.data})


class HistoryAuthorization(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        website_id = request.data.get('website', 0)
        ip = request.META['REMOTE_ADDR']

        query_website = Website.objects.filter(
            id=website_id).first()
        if not query_website:
            return Response({
                'detail': "O website não pode ser encontrado"
            }, status=status.HTTP_400_BAD_REQUEST)

        history = History.objects.filter(
            ip=ip,
            website_id=website_id
        ).first()

        authorized = True
        if history:
            if history.banned == False:
                History.objects.filter(
                    ip=ip,
                    website_id=website_id
                ).update(date=datetime.now())
            else:
                authorized = False
        else:
            history = History.objects.create(
                ip=ip,
                website_id=website_id
            )

        return Response({"authorized": authorized}, status=status.HTTP_200_OK)


class HistoryBan(APIView):
    def put(self, request, history_id):
        history = History.objects.filter(
            id=history_id
        ).first()

        if not history:
            return Response({"detail": "O registro não foi encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        status_ban = 0
        if history.banned == False:
            status_ban = 1

        history = History.objects.filter(
            id=history_id
        ).update(
            banned=status_ban
        )

        return Response({"success": "true"})
