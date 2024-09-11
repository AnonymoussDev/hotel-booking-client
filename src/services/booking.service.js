import HttpService from './http-service';

class BookingService {
    constructor() {
        this.httpService = new HttpService();
    }

    async createBooking(createBookingDto) {
        return await this.httpService.request('POST', `${process.env.REACT_APP_API_CORE_URL}/api/v1/booking`, {
            body: createBookingDto,
        });
    }

    async getBookingsUser(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_CORE_URL}/api/v1/booking`, {
            params: options,
        });
    }

    async cancelBookingUser(cancelBookingDto) {
        return await this.httpService.request('POST', `${process.env.REACT_APP_API_CORE_URL}/api/v1/booking/cancel`, {
            body: cancelBookingDto,
        });
    }

    // admin
    async getBookingsAdmin(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/booking`, {
            params: options,
        });
    }
    async getBookingDetailAdmin(bookingId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/booking/${bookingId}`,
        );
    }
    async addBookingAdmin(bookingId, serviceBookingDto) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/booking/${bookingId}/add-service`,
            { body: serviceBookingDto },
        );
    }
    async checkoutBookingById(bookingId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/booking/check-out/${bookingId}`,
        );
    }

    async checkinBookingById(bookingId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/booking/check-in/${bookingId}`,
        );
    }
}

export default BookingService;
