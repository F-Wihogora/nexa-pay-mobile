const API_BASE_URL = 'http://localhost:9210';

export interface User {
    username: string;
    email: string;
    role: 'admin' | 'cashier';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
    error?: string;
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
    role?: 'admin' | 'cashier';
}

export interface LoginData {
    email: string;
    password: string;
}

class ApiService {
    private static instance: ApiService;
    private token: string | null = null;

    private constructor() { }

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }

    clearToken() {
        this.token = null;
    }

    private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultHeaders: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            defaultHeaders['Authorization'] = `Bearer ${this.token}`;
        }

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async signup(userData: SignupData): Promise<AuthResponse> {
        const response = await this.makeRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        if (response.success && response.token) {
            this.setToken(response.token);
        }

        return response;
    }

    async login(credentials: LoginData): Promise<AuthResponse> {
        const response = await this.makeRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (response.success && response.token) {
            this.setToken(response.token);
        }

        return response;
    }

    logout() {
        this.clearToken();
    }

    // Wallet endpoints
    async getBalance(uid: string): Promise<any> {
        return this.makeRequest(`/balance/${uid}`);
    }

    async topup(uid: string, amount: number): Promise<any> {
        return this.makeRequest('/topup', {
            method: 'POST',
            body: JSON.stringify({ uid, amount }),
        });
    }

    async pay(uid: string, productId: string, quantity: number, totalAmount: number): Promise<any> {
        return this.makeRequest('/pay', {
            method: 'POST',
            body: JSON.stringify({ uid, productId, quantity, totalAmount }),
        });
    }

    // Product endpoints
    async getProducts(): Promise<any> {
        return this.makeRequest('/products');
    }

    // Transaction endpoints
    async getTransactions(uid: string, limit?: number): Promise<any> {
        const query = limit ? `?limit=${limit}` : '';
        return this.makeRequest(`/transactions/${uid}${query}`);
    }
}

export const apiService = ApiService.getInstance();