import { TokenAuthHelper } from "Helpers/token.authHelper";
import { Token } from "Models/token.model";
import { TokenActions, TokenActionTypes } from "Store/Token/types";

export const TOKEN_INITIAL_VALUE: Token = TokenAuthHelper.getToken() || {
	AccessToken: "",
	RefreshToken: ""
};

export const tokenReducer = (state: Token, action: TokenActions): Token => {
	switch (action.type) {
		case TokenActionTypes.UPDATE_TOKEN:
			TokenAuthHelper.setToken(action.payload);
			return { ...state, ...action.payload };
		case TokenActionTypes.CLEAR_TOKEN:
			TokenAuthHelper.clearToken();
			return state;
		default:
			return state;
	}
};
