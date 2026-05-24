EMISSION_FACTORS = {
    'diesel_liter': 2.68,
    'electricity_kwh': 0.82,
    'flight_km': 0.15,
}


def normalize_unit(value, unit):

    if unit == 'gallons':
        return value * 3.785, 'liters'

    return value, unit


def calculate_emission(activity_type, value):

    factor = EMISSION_FACTORS.get(activity_type, 0)

    return value * factor


def is_suspicious(value):

    return value < 0 or value > 100000 