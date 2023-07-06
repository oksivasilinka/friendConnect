export type MessagesType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number
    name: string
}

export type PostsType = {
    id?: number
    message: string
    likeCount: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}

export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType,
    _callSubscriber: () => void,
    getState: () => RootStateType,
    subscribe: (observer: () => void) => void,
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | UpdateNewPostTextActionType | AddNewMessageACType | ChangeNewMessageType

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextActionType = ReturnType<typeof ChangeNewTextAC>
type AddNewMessageACType = ReturnType<typeof addNewMessageAC>
type ChangeNewMessageType = ReturnType<typeof ChangeNewMessageAC>

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = 'UPDATE-NEW-POST-TEXT';
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

export const addPostAC = (postText: string) => ({
    type: ADD_POST,
    newPostText: postText
}) as const

export const ChangeNewTextAC = (postText: string) => ({
    type: UPDATE_NEW_POST,
    postText: postText
}) as const

export const addNewMessageAC = (messageText: string) => ({
    type: ADD_NEW_MESSAGE,
    newMessageText: messageText
}) as const

export const ChangeNewMessageAC = (messageText: string) => ({
    type: UPDATE_NEW_MESSAGE,
    messageText: messageText
}) as const

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello', likeCount: 20},
                {id: 2, message: 'Hi', likeCount: 10},
                {id: 3, message: 'How are You', likeCount: 15},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Oksana'},
                {id: 2, name: 'Vova'},
                {id: 3, name: 'Valera'},
                {id: 4, name: 'Masha'},
                {id: 5, name: 'Olya'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Hi'},
                {id: 3, message: 'How are You'},
                {id: 4, message: 'nice'},
                {id: 5, message: 'ok'},
            ],
            newMessageText: ''
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost = {
                id: new Date().getTime(),
                message: action.newPostText,
                likeCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST) {
            this._state.profilePage.newPostText = action.postText
            this._callSubscriber()
        } else if (action.type === ADD_NEW_MESSAGE) {
            const newMessage = {
                id: new Date().getTime(),
                message: action.newMessageText,
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_MESSAGE) {
            this._state.dialogsPage.newMessageText = action.messageText
            this._callSubscriber()
        }
    }
}