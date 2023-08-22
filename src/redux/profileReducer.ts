import {Dispatch} from "redux";
import {ProfileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';


export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: null | string
        vk: string
        twitter: string
        instagram: string
        youtube: null | string
        github: string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type PostsType = {
    id?: number
    message: string
    likeCount: number
}

type AddPostACType = ReturnType<typeof addPostAC>
type setUserProfileACType = ReturnType<typeof setUserProfile>
type setStatusACType = ReturnType<typeof setStatus>

type InitialStateType = typeof initialState

type ActionTypes = AddPostACType | setUserProfileACType | setStatusACType

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likeCount: 20},
        {id: 2, message: 'Hi', likeCount: 10},
        {id: 3, message: 'How are You', likeCount: 15},
    ] as Array<PostsType>,
    profile: null,
    status: ''
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: new Date().getTime(), message: action.newPostText, likeCount: 0}
            return {...state, posts: [...state.posts, newPost]};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state || initialState
    }
}

export const addPostAC = (postText: string) => ({type: ADD_POST, newPostText: postText}) as const
const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile}) as const
const setStatus = (status: string) => ({type: SET_STATUS, status}) as const

export const getProfile = (id: string) => (dispatch: Dispatch) => {
    ProfileAPI.getUserProfile(id)
        .then(data => {
            dispatch(setUserProfile(data))
        })
}

export const getStatus = (userId: string) => (dispatch: Dispatch) => {
    ProfileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatus(res))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    ProfileAPI.updateStatus(status)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}