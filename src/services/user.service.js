import HttpService from './http-service';

class UserService {
    constructor() {
        this.httpService = new HttpService();
    }

    //admin
    async getUsers(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/user`, {
            params: options,
        });
    }

    async getUserById(userId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/user/${userId}`,
        );
    }

    async updateUserById(userId, updateUserDto) {
        console.log(userId, updateUserDto);
        return await this.httpService.request(
            'PATCH',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/user/${userId}`,
            { body: updateUserDto },
            false,
        );
    }

    async lockUnlockUserById(userId, isLocked) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/user/lock-unlock/${userId}?isLocked=${isLocked}`,
        );
    }

    async deleteUserById(userId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_URL}/hotel-admin/api/v1/user/delete/${userId}`,
        );
    }
}

export default UserService;
