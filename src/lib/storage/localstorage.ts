import * as localStorage from 'local-storage';

export const storage = {
    async save(key: string, value: string) {
        localStorage.set(key, value);
    },
    async getValueFor(key: string) {
        return localStorage.get(key);
    },
    async remove(key: string) {
        localStorage.clear()
    },
    async clearAuth() {
        localStorage.clear();
    }
};


