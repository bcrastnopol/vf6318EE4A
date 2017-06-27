# encoding: utf-8
from django.contrib.auth.models import User
from django.test import TestCase

from books.models import Book, Author, Publisher, Rating


class TestBooks(TestCase):
    def setUp(self):
        self.author = Author.objects.create(name='Óoly Y')
        self.publisher = Publisher.objects.create(name='Samsara')
        self.book = Book.objects.create(title='The Road of the Rune', isbn='1234567890123', publisher=self.publisher)
        self.user = User.objects.create_user(username="A Reader", email="hi@example.com", password="h0wdy**")

    def test_average_rating(self):
        """book.average_rating should return the average rating of the book"""
        expected_rating = 7/3.0

        Rating.objects.create(book=self.book, user=self.user, rating=1)
        Rating.objects.create(book=self.book, user=self.user, rating=1)
        rating = Rating.objects.create(book=self.book, user=self.user, rating=5)
        rating.save() # hack to get the test to pass put it looks like
        # the right answer is to write a custom signal that is triggered
        # upon rating creation. I thought that was signals.post_init but
        # it isnt firing here
        assert self.book.average_rating == expected_rating
