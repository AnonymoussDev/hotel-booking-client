import HttpService from './http-service';

class HotelServiceService {
    constructor() {
        this.httpService = new HttpService();
    }

    async getServices(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-core/api/v1/service`, {
            params: options,
        });
    }

    // admin
    async getServicesAdmin(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/service`, {
            params: options,
        });
    }

    async getServiceAdmin(serviceId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/service/${serviceId}`,
        );
    }

    async updateServiceById(serviceId, updateServiceDto) {
        return await this.httpService.request(
            'PUT',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/service/${serviceId}`,
            { body: updateServiceDto },
            false,
        );
    }

    async deleteServiceById(serviceId) {
        return await this.httpService.request('DELETE', `${process.env.REACT_APP_API_URL}/api/v1/service/${serviceId}`);
    }

    async revertServiceById(serviceId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/api/v1/service/trash/restore/${serviceId}`,
        );
    }

    async deletePermanentlyServiceById(serviceId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_URL}/api/v1/service/trash/delete/${serviceId}`,
        );
    }
}

export default HotelServiceService;
