import { AxiosInstance } from "axios";
import { TokenAuthHelper } from "Helpers/token.authHelper";
import { UserAuthHelper } from "Helpers/user.authHelper";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Token } from "Models/token.model";
import TokenServices from "Services/token.services";

/**
 * EXAMPLE: https://codepen.io/shihab-live/pen/PozaObO
 */

export const initializeAuthInterceptors = (authHttpService: AxiosInstance) => {
	authHttpService.interceptors.request.use(
		async (request) => {
            const tokens: Token = TokenAuthHelper.getToken();
			if (tokens.RefreshToken && tokens.AccessToken) {
				const decodedAccessToken = jwtDecode<JwtPayload>(tokens.AccessToken);
				if (decodedAccessToken.exp) {
                    if (Date.now() >= decodedAccessToken?.exp * 1000) {
                        console.log("Tokens expired. renewing..");
						try {
							const {
								data: { AccessToken }
							}: any = await TokenServices.refresh(tokens.RefreshToken);
                            TokenAuthHelper.setToken({...tokens, AccessToken});
                            tokens.AccessToken = AccessToken;
						} catch (error: any) {
                            console.error(error);
						}
					}
				}
				if (typeof window !== "undefined" && UserAuthHelper.getUser()?.Email && tokens.AccessToken && tokens.RefreshToken) {
					console.log("setting bearer");
					request.headers.Authorization = `Bearer ${tokens.AccessToken}`;
				}
			}
			return request;
		},
		(error) => {
			if (error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		}
	);

	authHttpService.interceptors.response.use(
		(res) => {
			return res;
		},
		(error) => {
			if (error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		}
	);
};

export function initializeGeneralInterceptor(httpService: AxiosInstance) {
	httpService.interceptors.response.use(
		(res) => res,
		(error) => {
			if (error.response) {
				return Promise.reject(error.response);
			} else {
				return Promise.reject(error);
			}
		}
	);
}
