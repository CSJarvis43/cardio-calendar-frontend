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
            day_of_week: "wednesday",
            streak: 4,
            user_id: 1
        }
    },
})