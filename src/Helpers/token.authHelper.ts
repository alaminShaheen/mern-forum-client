import { Token } from "Models/token.model";

export class TokenAuthHelper {
	static setToken(token: Token) {
		if (window) window.localStorage.setItem("token", JSON.stringify(token));
	}

	static clearToken() {
		if (window) window.localStorage.removeItem("token");
	}

	static getToken() {
		if (window) {
			const token = localStorage ? window.localStorage.getItem("token") : null;
			return JSON.parse(token!);
		}
		return {};
	}
}
