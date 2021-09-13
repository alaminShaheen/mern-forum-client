import { User } from "Models/user.model";
import { IClearUser, IUpdateUser, UserActionTypes } from "Store/User/types";

export function updateUser(user: User): IUpdateUser {
	return {
		payload: user,
		type: UserActionTypes.UPDATE_USER
	};
}

export function clearUser(): IClearUser {
	return {
		type: UserActionTypes.CLEAR_USER
	};
}
