import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Company
from .models import EmissionRecord
from .models import AuditLog

from .serializers import EmissionRecordSerializer

from .utils import *


@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    company, _ = Company.objects.get_or_create(
        name='Demo Company'
    )

    for _, row in df.iterrows():

        value, unit = normalize_unit(
            float(row['value']),
            row['unit']
        )

        co2e = calculate_emission(
            'diesel_liter',
            value
        )

        suspicious = is_suspicious(value)

        EmissionRecord.objects.create(
            company=company,
            source='sap',
            scope='Scope 1',
            category='Fuel',
            activity=row['activity'],
            value=row['value'],
            unit=row['unit'],
            normalized_value=value,
            normalized_unit=unit,
            co2e=co2e,
            suspicious=suspicious,
            original_payload=row.to_dict()
        )

    return Response({'message': 'SAP uploaded'})


@api_view(['POST'])
def upload_utility(request):

    file = request.FILES['file']

    df = pd.read_csv(file)

    company, _ = Company.objects.get_or_create(
        name='Demo Company'
    )

    for _, row in df.iterrows():

        value = float(row['kwh'])

        co2e = calculate_emission(
            'electricity_kwh',
            value
        )

        suspicious = is_suspicious(value)

        EmissionRecord.objects.create(
            company=company,
            source='utility',
            scope='Scope 2',
            category='Electricity',
            activity='Electricity Usage',
            value=value,
            unit='kWh',
            normalized_value=value,
            normalized_unit='kWh',
            co2e=co2e,
            suspicious=suspicious,
            original_payload=row.to_dict()
        )

    return Response({'message': 'Utility uploaded'})


@api_view(['POST'])
def sync_travel(request):

    company, _ = Company.objects.get_or_create(
        name='Demo Company'
    )

    mock_data = [
        {
            'employee': 'John',
            'from': 'DEL',
            'to': 'DXB',
            'distance': 2200
        },
        {
            'employee': 'Sarah',
            'from': 'BOM',
            'to': 'BLR',
            'distance': 980
        }
    ]

    for row in mock_data:

        co2e = calculate_emission(
            'flight_km',
            row['distance']
        )

        EmissionRecord.objects.create(
            company=company,
            source='travel',
            scope='Scope 3',
            category='Business Travel',
            activity='Flight',
            value=row['distance'],
            unit='km',
            normalized_value=row['distance'],
            normalized_unit='km',
            co2e=co2e,
            suspicious=False,
            original_payload=row
        )

    return Response({'message': 'Travel synced'})


@api_view(['GET'])
def records(request):

    records = EmissionRecord.objects.all().order_by('-created_at')

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def approve_record(request, pk):

    record = EmissionRecord.objects.get(id=pk)

    old_status = record.status

    record.status = 'approved'

    record.save()

    AuditLog.objects.create(
        record=record,
        action='Approved Record',
        old_status=old_status,
        new_status='approved'
    )

    return Response({'message': 'approved'})


@api_view(['POST'])
def reject_record(request, pk):

    record = EmissionRecord.objects.get(id=pk)

    old_status = record.status

    record.status = 'rejected'

    record.save()

    AuditLog.objects.create(
        record=record,
        action='Rejected Record',
        old_status=old_status,
        new_status='rejected'
    )

    return Response({'message': 'rejected'})