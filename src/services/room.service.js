import HttpService from './http-service';

class RoomService {
    constructor() {
        this.httpService = new HttpService();
    }

    async getAvailableRooms(options) {
        // console.log(expectedCheckIn, expectedCheckOut, num, type);
        let params = {};
        if (options.expectedCheckIn) params['checkIn'] = options.expectedCheckIn;
        if (options.expectedCheckOut) params['checkOut'] = options.expectedCheckOut;
        if (options.num) params['capacity'] = options.num;
        if (options.type) params['roomType'] = options.type;
        if (options.keyWord) params['keyword'] = options.keyWord;
        if (options.pageNum) params['pageNum'] = options.pageNum;
        params['pageSize'] = 9;
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-core/api/v1/room`, {
            params: params,
        });
    }

    async getRoomDetail(roomId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-core/api/v1/room/${roomId}`,
        );
    }

    async getRatingByRoomId(roomId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-core/api/v1/room-rating/room/${roomId}`,
        );
    }

    async createRoomRating(createRoomRatingDto, roomId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-core/api/v1/room-rating/${roomId}`,
            { body: createRoomRatingDto },
        );
    }

    // admin
    async getRoomsAdmin(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room`, {
            params: options,
        });
    }

    async getRoomAvailablesAdmin(options) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/available`,
            {
                params: options,
            },
        );
    }

    async getRoomDetailAdmin(roomId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/${roomId}`,
        );
    }

    async createRoom(roomCreateDTO) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room`,
            { body: roomCreateDTO },
            false,
        );
    }

    async updateRoomById(roomId, updateRoomDto) {
        return await this.httpService.request(
            'PUT',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/${roomId}`,
            { body: updateRoomDto },
            false,
        );
    }

    async deleteRoomById(roomId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/${roomId}`,
        );
    }

    async deleteRoomPermanentlyById(roomId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/trash/delete/${roomId}`,
        );
    }

    async revertRoomById(roomId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/trash/restore/${roomId}`,
        );
    }

    async addSaleToRoom(saleId, roomIds) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/add-sale`,
            {
                body: { saleId: saleId, roomIds: roomIds },
            },
        );
    }

    async removeSaleToRoom(roomIds) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/room/delete-sale`,
            { body: roomIds },
        );
    }
}

export default RoomService;
