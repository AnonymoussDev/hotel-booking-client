import HttpService from './http-service';

class NotificationService {
    constructor() {
        this.httpService = new HttpService();
    }

    //admin
    async getNotificationAdmin(options) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/notification`,
            {
                params: options,
            },
        );
    }

    async readNotificationAdmin(id) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/notification/read/${id}`,
        );
    }
}

export default NotificationService;
