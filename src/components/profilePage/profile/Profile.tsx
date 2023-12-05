import { ChangeEvent, useState } from 'react'
import { ProfileData, ProfileReduxDataForm, ProfileStatus } from 'components/profilePage/profile/index'
import { useSelector } from 'react-redux'
import { loginSelector, profileSelector } from 'components/profilePage/model/profileSelector'
import { useAppDispatch } from 'redux/store'
import { Preloader } from 'components/common/preloader'
import { savePhoto, saveProfile } from 'redux/profileReducer'
import { ProfileResponseType } from 'api/profileApi'
import userPhoto from 'assets/img/user.png'
import { Button, Icon, Subtitle } from 'components/common'
import s from './Profile.module.css'

type Props = {
    isOwner: boolean
}

export const Profile = ({ isOwner }: Props) => {

    const [editMode, setEditMode] = useState(false)
    const profile = useSelector(profileSelector)
    const user = useSelector(profileSelector)
    const login = useSelector(loginSelector)
    const dispatch = useAppDispatch()

    const onMainPhotoSelected = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
            await dispatch(savePhoto(e.currentTarget.files[0]))
        }
    }

    const onSubmit = async (formData: ProfileResponseType) => {
        try {
            dispatch(saveProfile(formData))
            setEditMode(false)
        } catch (e) {
            console.log(e)
        }
    }

    const changeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    if (!profile) return <Preloader />

    return (

        <div className={s.wrapper}>
            <div className={s.photoWrapper}>
                <img
                    src={profile.photos.large || userPhoto}
                    className={s.mainPhoto}
                    alt='logo-main' />
                {isOwner && (
                    <label title={'edit photo'} className={s.inputFile}>
                        <input type='file' name='file' onChange={onMainPhotoSelected} />
                        <Icon id={'edit'} width={'20'} height={'20'} viewBox={'0 0 25 25'} />
                    </label>
                )}
            </div>


            <div>
                <div className={s.nameWrapper}>
                    <Subtitle title={user?.fullName || login || ''} />
                    {profile.lookingForAJob && <span className={s.smallText}>in looking of work</span>}
                </div>
                < ProfileStatus />
                {editMode && <ProfileReduxDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />}
                {!editMode && <ProfileData profile={profile} />}


                {!editMode && isOwner && (
                    <Button title={'Edit profilePage'} className={s.buttonEdit} callback={changeEditModeHandler}>
                        <Icon id={'edit'} width={'18'} height={'18'} />
                        <span>Edit Profile</span>
                    </Button>
                )}
            </div>

        </div>
    )
}