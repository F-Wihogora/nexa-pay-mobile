import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StorageService } from './storage';
import { User } from './api';

export const useSessionGuard = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const { isLoggedIn, user } = await StorageService.initializeAuth();

            if (!isLoggedIn || !user) {
                console.log('❌ No valid session found, redirecting to welcome');
                router.replace('/');
                return;
            }

            setIsAuthenticated(true);
            setCurrentUser(user);
            console.log('✅ Session validated for user:', user.username);
        } catch (error) {
            console.error('❌ Session check failed:', error);
            setIsAuthenticated(false);
            router.replace('/');
        }
    };

    return { isAuthenticated, currentUser, checkAuthStatus };
};