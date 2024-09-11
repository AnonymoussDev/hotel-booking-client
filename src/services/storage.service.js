class StorageService {
    constructor() {
        this.localStorage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
    }

    // localStorage
    set(key, value) {
        this.localStorage.setItem(this.generateKey(key), value);
    }

    get(key) {
        return this.localStorage.getItem(this.generateKey(key));
    }

    getAccessToken(token) {
        return this.localStorage.getItem(this.generateKey('token'));
    }

    setAccessToken(token) {
        this.localStorage.setItem(this.generateKey('token'), token);
    }

    removeAccessToken() {
        this.localStorage.removeItem(this.generateKey('token'));
    }

    remove(key) {
        this.localStorage.removeItem(this.generateKey(key));
    }

    setObject(key, value) {
        this.localStorage.setItem(this.generateKey(key), JSON.stringify(value));
    }

    getObject(key) {
        return JSON.parse(this.localStorage.getItem(this.generateKey(key)));
    }

    // sessionStorage
    setSession(key, value) {
        this.sessionStorage.setItem(this.generateKey(key), value);
    }

    getSession(key) {
        return this.sessionStorage.getItem(this.generateKey(key));
    }

    setSessionObject(key, value) {
        this.sessionStorage.setItem(this.generateKey(key), JSON.stringify(value));
    }

    getSessionObject(key) {
        return JSON.parse(this.sessionStorage.getItem(this.generateKey(key)));
    }

    generateKey(key) {
        return `${key}`;
    }
}

const storageServiceInstance = new StorageService();
export default storageServiceInstance;
