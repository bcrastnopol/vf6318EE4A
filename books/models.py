# encoding: utf-8
from __future__ import unicode_literals

from django.db import models
from django.db.models import signals


def _calc_rating(sender, instance, *args, **kwargs):
    if sender == Rating:
        book = instance.book
    else:
        book = instance
    bookRatings = Rating.objects.values().filter(book=book)
    if len(bookRatings) == 0:
        book.average_rating = 0
    else:
        book.average_rating = sum([br['rating'] for br in bookRatings]) / (len(bookRatings) * 1.0)


class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.ManyToManyField('Author', related_name='books')
    description = models.TextField(blank=True)
    publisher = models.ForeignKey('Publisher')
    isbn = models.CharField(max_length=255)
    average_rating = models.FloatField(default=0)

    class Meta:
        ordering = ('title', )

    def __unicode__(self):
        return self.title


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Rating(models.Model):
    rating = models.IntegerField()
    user = models.ForeignKey('auth.User', related_name='ratings')
    book = models.ForeignKey('Book', related_name='ratings')

    def __unicode__(self):
        return "{} - {} by {}".format(self.rating, self.book.title, self.user.username)

signals.pre_save.connect(_calc_rating, sender=Book)
signals.pre_save.connect(_calc_rating, sender=Rating)
signals.post_init.connect(_calc_rating, sender=Book)

