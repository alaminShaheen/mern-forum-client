import { User } from "Models/user.model";
import { Dispatch } from "react";

export enum UserActionTypes {
	UPDATE_USER = "UPDATE_USER",
	CLEAR_USER = "CLEAR_USER"
}

export interface IUpdateUser {
	type: UserActionTypes.UPDATE_USER;
	payload: User;
}

export interface IClearUser {
	type: UserActionTypes.CLEAR_USER;
}

export type UserActions = IClearUser | IUpdateUser;

export type IUserContext = {
	userState: User;
	userDispatch: Dispatch<UserActions>;
};
