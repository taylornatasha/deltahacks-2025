export type HabitInterval = {
    timesPer: number,
    period: "Day" | "Week"
}

export interface Habit {
    id: string,
    habit: string,
    startDate: Date,
    interval: HabitInterval
}