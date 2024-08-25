import HttpService from './http-service';

class RoomService {
    constructor() {
        this.httpService = new HttpService();
    }

    async getAvailableRooms(options) {
        // console.log(expectedCheckIn, expectedCheckOut, num, type);
        let params = {};
        if (options.expectedCheckIn) params['checkin'] = options.expectedCheckIn;
        if (options.expectedCheckOut) params['checkout'] = options.expectedCheckOut;
        if (options.num) params['capacity'] = options.num;
        if (options.type) params['roomType'] = options.type;
        if (options.keyWord) params['keyword'] = options.keyWord;
        if (options.pageNum) params['pageNum'] = options.pageNum;
        params['pageSize'] = 9;
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_CORE_URL}/api/v1/room`, {
            params: params,
        });
    }

    async getRoomDetail(roomId) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_CORE_URL}/api/v1/room/${roomId}`);
    }

    async getRatingByRoomId(roomId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_CORE_URL}/api/v1/room-rating/room/${roomId}`,
        );
    }

    async createRoomRating(createRoomRatingDto, roomId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_CORE_URL}/api/v1/room-rating/${roomId}`,
            { body: createRoomRatingDto },
        );
    }

    // admin
    async getRoomsAdmin(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/room`, {
            params: options,
        });
    }

    async getRoomDetailAdmin(roomId) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/room/${roomId}`);
    }
}

export default RoomService;
