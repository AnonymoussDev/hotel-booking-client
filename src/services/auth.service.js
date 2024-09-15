import HttpService from './http-service';

class AuthService {
    constructor() {
        this.httpService = new HttpService();
    }

    async login(authCredential) {
        console.log(authCredential);
        return await this.httpService.request('POST', `${process.env.REACT_APP_API_URL}/hotel-auth/api/v1/auth/login`, {
            body: authCredential,
        });
    }

    async register(authCredential) {
        return await this.httpService.request(
            'POST',
            `${process.env.RREACT_APP_API_URL}/hotel-auth/api/v1/auth/signup`,
            { body: authCredential },
            false,
        );
    }

    async verifyRegister(email, token) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_URL}/hotel-auth/api/v1/auth/signup/verify`,
            {
                params: {
                    email: email,
                    token: token,
                },
            },
            false,
        );
    }

    async getCurrentUser() {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_URL}/hotel-auth/api/v1/auth/me`);
    }
}

export default AuthService;
