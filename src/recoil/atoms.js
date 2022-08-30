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