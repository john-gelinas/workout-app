# Generated by Django 4.0.6 on 2022-08-06 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0009_alter_exercise_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercisetype',
            name='assisted',
            field=models.BooleanField(default=False),
        ),
    ]