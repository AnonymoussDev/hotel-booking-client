import HttpService from './http-service';

class HotelServiceService {
    constructor() {
        this.httpService = new HttpService();
    }

    async getServices(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_CORE_URL}/api/v1/service`, {
            params: options,
        });
    }
}

export default HotelServiceService;
