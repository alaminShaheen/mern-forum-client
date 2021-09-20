import { AxiosError, AxiosInstance } from 'axios';
import { TokenAuthHelper } from 'Helpers/token.authHelper';
import { Token } from 'Models/token.model';
import TokenServices from 'Services/token.services';
declare module 'axios' {
    export interface AxiosRequestConfig {
      _retry?: boolean;
    }
  }

export const initializeAuthInterceptors = (authHttpService: AxiosInstance) => {
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
                if (error.response.status === 403 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    const tokens: Token = TokenAuthHelper.getToken();
                    console.log('Tokens expired. renewing..');
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
                        return Promise.reject(error.response)
                    }
                } else return Promise.reject(error.response);
            }
        }
    );
};

export function initializeGeneralInterceptor(httpService: AxiosInstance) {
    httpService.interceptors.request.use(
        (config) => config,
        (error: AxiosError) => {
            if (error.response) {
                console.log(error);

                return Promise.reject(error.response);
            } else {
                console.log(error);
                return Promise.reject(error);
            }
        }
    );

    httpService.interceptors.response.use(
        (config) => config,
        (error: AxiosError) => {
            if (error.response) {
                console.log(error);

                return Promise.reject(error.response);
            } else {
                console.log(error);
                return Promise.reject(error);
            }
        }
    );
}
