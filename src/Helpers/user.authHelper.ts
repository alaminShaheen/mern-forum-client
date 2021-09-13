import { User } from "Models/user.model";

export class UserAuthHelper {
	static setUser(user: User) {
		if (window) window.localStorage.setItem("user", JSON.stringify(user));
	}

	static clearUser() {
		if (window) window.localStorage.removeItem("user");
	}

	static getUser() {
		if (window) {
			const user = localStorage
				? window.localStorage.getItem("user")
				: null;
			return JSON.parse(user!);
		}
		return {};
	}
}
