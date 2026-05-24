from django.db import models


class Company(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class EmissionRecord(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    SOURCE_CHOICES = [
        ('sap', 'SAP'),
        ('utility', 'Utility'),
        ('travel', 'Travel'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    scope = models.CharField(max_length=50)

    category = models.CharField(max_length=255)

    activity = models.CharField(max_length=255)

    value = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_value = models.FloatField()

    normalized_unit = models.CharField(max_length=50)

    co2e = models.FloatField()

    suspicious = models.BooleanField(default=False)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='pending'
    )

    original_payload = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)


class AuditLog(models.Model):

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(max_length=255)

    old_status = models.CharField(max_length=50)

    new_status = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)


