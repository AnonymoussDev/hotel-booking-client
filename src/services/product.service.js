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

    //admin
    async getProductsAdmin(options) {
        return await this.httpService.request('GET', `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product`, {
            params: options,
        });
    }

    async getProductAdmin(productId) {
        return await this.httpService.request(
            'GET',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product/${productId}`,
        );
    }

    async createProduct(productCreateDto) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product`,
            { body: productCreateDto },
            false,
        );
    }

    async updateProductById(productId, productUpdateDto) {
        return await this.httpService.request(
            'PATCH',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product/${productId}`,
            { body: productUpdateDto },
            false,
        );
    }

    async deleteProductById(productId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product/${productId}`,
        );
    }

    async revertProductById(productId) {
        return await this.httpService.request(
            'POST',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product/trash/restore/${productId}`,
        );
    }

    async deletePermanentlyProductById(productId) {
        return await this.httpService.request(
            'DELETE',
            `${process.env.REACT_APP_API_ADMIN_URL}/api/v1/product/trash/delete/${productId}`,
        );
    }
}

export default ProductService;
