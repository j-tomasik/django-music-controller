from django.shortcuts import render
from music_controller.settings import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https:///accounts.spotfiy.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            
            
        }).prepare().url
        
        return Response({'url': url}, status=status.HTTP_200_OK)



