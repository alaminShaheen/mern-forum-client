import httpService, { authHttpService } from "Interceptors/config";
import config from "Config/config";
import { RegisterFormType } from "Pages/Register";
import { LoginFormType } from "Pages/Login";

const register = async (formData: RegisterFormType) => {
	return await httpService.post(`${config.apiEndpoints.auth}/register`, formData);
};

const login = async (formData: LoginFormType) => {
	return await httpService.post(`${config.apiEndpoints.auth}/login`, formData);
};

const logout = async (refreshToken: string) => {
	const body = {
		Token: refreshToken
	};
	return await authHttpService.delete(`${config.apiEndpoints.auth}/logout`, { data: { Token: refreshToken } });
};

const AuthServices = {
	register,
	login,
	logout
};

export default AuthServices;
