// import {rerenderEntireTree} from "../render";

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
}

export type SidebarType = {}


export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType,
    getState: () => RootStateType,
    _callSubscriber: () => void,
    addPost: () => void,
    updateNewPostText: (newPostText: string) => void,
    subscribe: (observer: () => void) => void
}

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
            ]
        },
        sidebar: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state changed')
    },
    addPost() {
        const newPost = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likeCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''

        this._callSubscriber()
    },
    updateNewPostText(newPostText) {
        this._state.profilePage.newPostText = newPostText
        this._callSubscriber()
    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}