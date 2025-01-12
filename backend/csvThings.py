import json
from pathlib import Path

# Define the keys for habit data
habit_keys = ['name', 'xp', 'pokemon', 'habit', 'startDate', 'timesPer', 'period']

# Path to the JSON file
json_file = 'habits.json'

def read_habits():
    """
    Read all habits from the JSON file.
    Returns:
        list: A list of dictionaries representing habits.
    """
    # Check if the file exists
    if not Path(json_file).exists():
        return []  # Return an empty list if no data exists

    # Read the file and return the data
    with open(json_file, 'r', encoding='utf-8') as file:
        try:
            habits = json.load(file)
        except json.JSONDecodeError as e:
            return []
    return habits

def write_habit(habit):
    if not all(key in habit for key in habit_keys):
        raise ValueError(f"Habit must contain the following keys: {habit_keys}")

    if Path(json_file).exists():
        try:
            with open(json_file, 'r', encoding='utf-8') as file:
                habits = json.load(file)
        except json.JSONDecodeError as e:
            print("empty json")
            habits = []
    else:
        habits = []

    habits.append(habit)

    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(habits, file, indent=4)

def increase_xp(habit_name):
    """
    Increase the XP for a specific habit by 1.
    Args:
        habit_name (str): The name of the habit to update.
    """
    if not Path(json_file).exists():
        raise ValueError("No data file found!")

    with open(json_file, 'r', encoding='utf-8') as file:
        habits = json.load(file)

    habit_found = False
    for habit in habits:
        if habit['name'] == habit_name:
            habit['xp'] = int(habit['xp']) + 1
            habit_found = True
            break

    if not habit_found:
        raise ValueError(f"Habit with name '{habit_name}' not found.")

    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(habits, file, indent=4)
