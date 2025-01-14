import json
from pathlib import Path

# Define the keys for habit data
habit_keys = ['name', 'xp', 'pokemon', 'habit', 'startDate', 'timesPer', 'period', 'lastDoneTime']
battle_keys = ['id', 'p1', 'p2', 'p1PkmnName', 'p2PkmnName', 'p1Health', 'p2Health', 'startDate']


def read_habits(json_file):
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

def write_habit(habit, json_file):
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

def write_battle(battle, json_file):
    if not all(key in battle for key in battle_keys):
        raise ValueError(f"Battle must contain the following keys: {battle_keys}")

    if Path(json_file).exists():
        try:
            with open(json_file, 'r', encoding='utf-8') as file:
                battles = json.load(file)
        except json.JSONDecodeError as e:
            print("empty json")
            battles = []
    else:
        battles = []

    battles.append(battle)

    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(battles, file, indent=4)

def increase_xp(habit_name, json_file):
    """
    Increase the XP for a specific habit by 1.
    Args:
        habit_name (str): The name of the habit to update.
    """
    if not Path(json_file).exists():
        raise ValueError("No data file found!")

    with open(json_file, 'r', encoding='utf-8') as file:
        try:
            habits = json.load(file)
        except json.JSONDecodeError as e:
            print("empty json???")
            return

    habit_found = False
    for habit in habits:
        if habit['habit'] == habit_name:
            habit['xp'] = int(habit['xp']) + 1
            habit_found = True
            break

    if not habit_found:
        raise ValueError(f"Habit with name '{habit_name}' not found.")

    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump(habits, file, indent=4)
