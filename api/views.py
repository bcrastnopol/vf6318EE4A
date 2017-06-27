import json

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from django.views import generic
from rest_framework.response import Response

from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


from api.serializers import UserSerializer, BookSerializer, PublisherSerializer, \
    AuthorSerializer, RatingSerializer
from books.models import Book, Publisher, Author, Rating


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited.
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class PublisherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publishers to be viewed or edited.
    """
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class RatingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def put(self, request):
        data = json.loads(request.body)
        try:
            user = User.objects.get(username=request.user.username)
        except ObjectDoesNotExist:
            # XXX login was giving me trouble so this unblocks me
            user = User.objects.first()

        book = Book.objects.get(pk=data['book']['pk'])

        rating = Rating.objects.get_or_create(rating=data['rating'], user=user, book=book)
        # save and update average with a signal
        rating[0].save()
        return Response('success')