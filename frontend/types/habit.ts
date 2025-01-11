export type HabitInterval = {
    hours: number,
    days: number,
    weeks: number
}

export interface Habit {
    id: string,
    habit: string,
    startDate: Date,
    interval: HabitInterval
}