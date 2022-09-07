import dayjs from "dayjs";
import { atom } from "recoil";

export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
})

export const usernameState = atom({
    key: 'usernameState',
    default: "",
})

export const passwordState = atom({
    key: 'passwordState',
    default: "",
})

export const currentUser = atom({
    key: 'currentUser',
    default: null,
})

export const showPassword = atom({
    key: 'showPassword',
    default: false,
})

export const errorMessageState = atom({
    key: "errorMessageState",
    default: "",
})

export const activityEventsState = atom({
    key: "activityEventsState",
    default: [],
})

export const selectedCalendarEventState = atom({
    key: "selectedCalendarEventState",
    default: [1],
})

export const activitiesByDayState = atom({
    key: "activitiesByDayState",
    default: [],
})

export const selectedDateState = atom({
    key: "selectedDateState",
    default: {
        active_day: {
            date: "2022-08-31",
            day_of_week: "wednesday"
        }
    }
})

export const deletingActivityState = atom({
    key: "deletingActivityState",
    default: 1
})

export const newEventDataState = atom({
    key: 'newEventDataState',
    default: {
        exercise_type: "",
        calories: 0,
        activity_length: 0,
        distance: 0,
        rating: 0,
        active_day_id: null
    },
})

export const addEventDateState = atom({
    key: "addEventDateState",
    default: dayjs()
})

export const activeDaysForNewEventState = atom({
    key: "activeDaysForNewEventState",
    default: []
})