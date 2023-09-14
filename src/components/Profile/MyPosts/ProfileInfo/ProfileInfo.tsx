import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from "redux/profileReducer";
import {Preloader} from "../../../common/preloader/preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "./../../../../assets/img/user.png"
import {ProfileReduxDataForm} from "Components/Profile/MyPosts/ProfileInfo/ProfileDataForm";


export type ProfileInfo = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: FormDataType) => void
}

export type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string

}

export const ProfileInfo: React.FC<ProfileInfo> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const onSubmit = (formData: FormDataType) => {
        saveProfile(formData)
    }

    const [editMode, setEditMode] = useState(false)
    if (!profile) return <Preloader/>

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
            savePhoto(e.currentTarget.files[0])
        }
    }

    return (
        <div className={s.descriptionBlock}>
            <div>
                <div className={s.imageBlock}>
                    <img
                        src={profile.photos.large || userPhoto}
                        className={s.mainPhoto}
                        alt="logo-main"/>

                    {isOwner && <input className={s.input} type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

            {editMode ? <ProfileReduxDataForm onSubmit={onSubmit}/> :
                <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }}/>}


        </div>
    )
}

type ContactProps = {
    contactTitle: string
    contactValue: string | null
}

type ProfileDataProps = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataProps) => {
    return (

        <div className={s.infoBlock}>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit Profile</button>
            </div>}
            <h4>Full name: </h4> {profile.fullName}
            <h4>Обо мне: </h4> {profile.aboutMe}
            <h4>Поиск работы: </h4> {profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}
            <h4>Описание: </h4> {profile.lookingForAJobDescription}
            <div>
                <h4> Контакты: </h4>
                {Object.keys(profile.contacts).map(key => {

                    // @ts-ignore
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}


export const Contact: React.FC<ContactProps> = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )

}