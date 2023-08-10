import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {follow, getUsers, setCurrentPage, unFollow, UsersType} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/preloader";

export type UserPageType = {
    users: UsersType[]
}

type MapStateToPropsType = {
    usersPage: UserPageType
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

type UsersApiPropsType = {
    usersPage: UserPageType
    follow: (id: number) => void,
    unFollow: (id: number) => void,
    pageSize: number
    totalCount: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    isFetching: boolean
    followingInProgress: number[]
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersAPIComponent extends React.Component<UsersApiPropsType, UsersType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                usersPage={this.props.usersPage}
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

export const UsersContainer = connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        getUsers,

    }
)(UsersAPIComponent)