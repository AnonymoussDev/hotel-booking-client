import HttpService from './http-service';

class ProductService {
    constructor() {
        this.httpService = new HttpService();
    }

    async getProductsByServices(serviceId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_CORE_URL}/api/v1/product/service/${serviceId}`,
        );
    }
}

export default ProductService;
