from django.db import models

from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

from django.conf import settings

class Dropbox_link(models.Model):
    title = models.CharField(max_length=256)
    user = models.CharField(max_length=512, default="Jack")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    link = models.CharField(max_length=256, unique=True)
    used = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        accountSID = 'ACd5f752e66ec5cea5a04525a898959d2e'
        authToken = 'bbb11ff0a0673fb43f6af513625add31'
        twilioClient = Client(accountSID, authToken)

        twilioNumber = '+14324233581'
        targetNumberArray = settings.UPDATE_NUMBERS

        #for number in targetNumberArray:

        #    try:
        #        message = twilioClient.messages.create(
        #            body=self.title + " - posted as DROPBOX URL LINK @MEDKNIGHTS", 
        #            from_=twilioNumber, 
        #            to=number
        #        )
        #    except TwilioRestException as e:
        #        print(e)

        return super().save(*args, **kwargs) #calls the "real" save() method from django model extension