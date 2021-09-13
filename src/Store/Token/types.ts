import { Token } from "Models/token.model";
import { Dispatch } from "react";

export enum TokenActionTypes {
	UPDATE_TOKEN = "UPDATE_TOKEN",
	CLEAR_TOKEN = "CLEAR_TOKEN"
}

export interface IUpdateToken {
	type: TokenActionTypes.UPDATE_TOKEN;
	payload: Token;
}

export interface IClearToken {
	type: TokenActionTypes.CLEAR_TOKEN;
}

export type TokenActions = IUpdateToken | IClearToken;

export type ITokenContext = {
	tokenState: Token;
	tokenDispatch: Dispatch<TokenActions>;
};
