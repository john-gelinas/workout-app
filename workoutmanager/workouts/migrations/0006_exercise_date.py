# Generated by Django 4.0.6 on 2022-07-25 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0005_alter_exercisetype_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='date',
            field=models.DateTimeField(default='2000-01-01 00:00'),
            preserve_default=False,
        ),
    ]