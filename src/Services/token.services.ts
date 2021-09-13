import config from "Config/config";
import AxiosInstances from "Interceptors/config";

const refresh = async (token: string) => {
	return await AxiosInstances.httpService.post(
		`${config.apiEndpoints.auth}/refresh`,
		{ Token: token }
	);
};

const TokenServices = {
	refresh,
};

export default TokenServices;
