import httpService from "Interceptors/config";
import config from "Config/config";

const refresh = async (token: string) => {
	return await httpService.post(`${config.apiEndpoints.auth}/refresh`, { Token: token });
};

const TokenServices = {
	refresh
};

export default TokenServices;
