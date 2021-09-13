import { UserAuthHelper } from "Helpers/user.authHelper";
import { User } from "Models/user.model";
import { UserActions, UserActionTypes } from "Store/User/types";

export const USER_INITIAL_VALUE: User = UserAuthHelper.getUser() || {
	Email: "",
	FirstName: "",
	Id: "",
	LastName: "",
	CreatedAt: null
};

export const userReducer = (state: User, action: UserActions): User => {
	switch (action.type) {
		case UserActionTypes.UPDATE_USER:
			UserAuthHelper.setUser(action.payload);
			return { ...state, ...action.payload };
		case UserActionTypes.CLEAR_USER:
			UserAuthHelper.clearUser();
			return state;
		default:
			return state;
	}
};
