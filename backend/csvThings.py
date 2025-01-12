import csv

habit_keys = ['name', 'xp', 'pokemon', 'habit']

def write_habit(habits):
    with open('habits.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows([list(habits.values())])

def read_habits():
    with open('habits.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        habits = []
        for row in reader:
            temp = dict()
            for i, info in enumerate(row):
                temp[habit_keys[i]] = info
            habits.append(temp)
    return habits