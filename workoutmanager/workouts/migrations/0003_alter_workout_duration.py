# Generated by Django 4.0.6 on 2022-07-08 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0002_alter_workout_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='duration',
            field=models.DurationField(blank=True, null=True),
        ),
    ]
