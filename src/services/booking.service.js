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
}

export default BookingService;
