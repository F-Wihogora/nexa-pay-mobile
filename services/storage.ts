import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './api';

const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'user_data',
    IS_LOGGED_IN: 'is_logged_in',
};

export class StorageService {
    static async saveAuthData(token: string, user: User): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
            await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
        } catch (error) {
            console.error('Failed to save auth data:', error);
            throw error;
        }
    }

    static async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        } catch (error) {
            console.error('Failed to get token:', error);
            return null;
        }
    }

    static async getUser(): Promise<User | null> {
        try {
            const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    }

    static async isLoggedIn(): Promise<boolean> {
        try {
            const isLoggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
            return isLoggedIn === 'true';
        } catch (error) {
            console.error('Failed to check login status:', error);
            return false;
        }
    }

    static async clearAuthData(): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
            await AsyncStorage.removeItem(STORAGE_KEYS.USER);
            await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
        } catch (error) {
            console.error('Failed to clear auth data:', error);
            throw error;
        }
    }

    static async initializeAuth(): Promise<{ token: string | null; user: User | null; isLoggedIn: boolean }> {
        try {
            const [token, user, isLoggedIn] = await Promise.all([
                this.getToken(),
                this.getUser(),
                this.isLoggedIn(),
            ]);

            return { token, user, isLoggedIn };
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            return { token: null, user: null, isLoggedIn: false };
        }
    }
}