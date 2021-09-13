// import { initializeAuthInterceptors, initializeGeneralInterceptor } from "Interceptors/interceptors";
import axios, { AxiosError } from "axios";
import { TokenAuthHelper } from "Helpers/token.authHelper";
import {
	initializeAuthInterceptors,
	initializeGeneralInterceptor,
} from "Interceptors/interceptors";
import { Token } from "Models/token.model";
import TokenServices from "Services/token.services";

const httpService = axios.create();

httpService.interceptors.request.use(
	(config) => config,
	(error) => {
		if (error.response) {
			return Promise.reject(error.response);
		} else {
			return Promise.reject(error);
		}
	}
);

const authHttpService = axios.create();

authHttpService.interceptors.request.use(
	(request) => {
		const tokens: Token = TokenAuthHelper.getToken();
		if (tokens.AccessToken) {
			request.headers.Authorization = `Bearer ${tokens.AccessToken}`;
		}
		return request;
	},
	(error) => Promise.reject(error)
);

authHttpService.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalConfig = error.config;
		if (error.response) {
			if (error.response.status === 403) {
				const tokens: Token = TokenAuthHelper.getToken();
				console.log("Tokens expired. renewing..");
				try {
					const {
						data: { AccessToken },
					}: any = await TokenServices.refresh(tokens.RefreshToken);
					TokenAuthHelper.setToken(
						new Token({
							RefreshToken: tokens.RefreshToken,
							AccessToken,
						})
					);
					tokens.AccessToken = AccessToken;
					return authHttpService(originalConfig);
				} catch (error: any) {
					return Promise.reject(error);
				}
			}
		}
	}
);

// initializeAuthInterceptors(authHttpService);
const AxiosInstances = { authHttpService, httpService };

export default AxiosInstances;
