import { Token } from "Models/token.model";
import { IUpdateToken, TokenActionTypes, IClearToken } from "Store/Token/types";

export function updateToken(token: Token): IUpdateToken {
	return {
		payload: token,
		type: TokenActionTypes.UPDATE_TOKEN
	};
}

export function clearToken(): IClearToken {
	return {
		type: TokenActionTypes.CLEAR_TOKEN
	};
}
