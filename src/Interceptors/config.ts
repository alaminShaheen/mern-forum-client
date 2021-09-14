import axios from 'axios';
import { initializeAuthInterceptors, initializeGeneralInterceptor } from 'Interceptors/interceptors';

const httpService = axios.create();
initializeGeneralInterceptor(httpService);

const authHttpService = axios.create();
initializeAuthInterceptors(authHttpService);

// initializeAuthInterceptors(authHttpService);
const AxiosInstances = { authHttpService, httpService };

export default AxiosInstances;
