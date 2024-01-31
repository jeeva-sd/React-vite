import { appConfig } from '~/config';
import AxiosService from './service';

const http = new AxiosService({
    baseURL: appConfig.api.baseUrl,
    timeOut: appConfig.api.timeOut
});

export { http };