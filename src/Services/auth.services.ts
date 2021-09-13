import config from "Config/config";
import { RegisterFormType } from "Pages/Register";
import { LoginFormType } from "Pages/Login";
import AxiosInstances from "Interceptors/config";

const register = async (formData: RegisterFormType) => {
	return await AxiosInstances.httpService.post(
		`${config.apiEndpoints.auth}/register`,
		formData
	);
};

const login = async (formData: LoginFormType) => {
	return await AxiosInstances.httpService.post(
		`${config.apiEndpoints.auth}/login`,
		formData
	);
};

const logout = async (refreshToken: string) => {
	const body = {
		Token: refreshToken,
	};
	return await AxiosInstances.authHttpService.delete(
		`${config.apiEndpoints.auth}/logout`,
		{ data: { Token: refreshToken } }
	);
};

const AuthServices = {
	register,
	login,
	logout,
};

export default AuthServices;
