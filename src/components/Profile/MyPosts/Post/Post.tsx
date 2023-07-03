import React from "react";
import s from './Post.module.css'

type PostPropsType = {
    message: string
    likeCount: number
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img
                src="data:image/jpeg;base64,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"
                alt="ava"/>
            {props.message}
            <div>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    )
}