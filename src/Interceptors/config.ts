// import { initializeAuthInterceptors, initializeGeneralInterceptor } from "Interceptors/interceptors";
import axios from "axios";
import { initializeAuthInterceptors, initializeGeneralInterceptor } from "Interceptors/interceptors";

const httpService = axios.create();
initializeGeneralInterceptor(httpService);

export const authHttpService = axios.create();
initializeAuthInterceptors(authHttpService);

export default httpService;
