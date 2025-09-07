/**
 * AIAIAI Consulting - Authentication System
 * Sistema de autenticación para la aplicación
 */

class AuthManager {
    constructor() {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        // Load user data from localStorage
        this.loadUserData();
        
        // Check if user is authenticated
        this.checkAuth();
        
        // Add logout functionality to all pages
        this.addLogoutHandlers();
    }

    loadUserData() {
        try {
            const userData = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            
            if (userData && token) {
                this.user = JSON.parse(userData);
                this.token = token;
                this.isAuthenticated = true;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            this.logout();
        }
    }

    checkAuth() {
        // Disabled for MVP - no authentication required
        // if (!this.isAuthenticated) {
        //     // Redirect to login if not authenticated
        //     if (!window.location.pathname.includes('login.html')) {
        //         window.location.href = 'login.html';
        //     }
        // } else {
        //     // Update UI with user info
        //     this.updateUserUI();
        // }
        
        // For MVP, always show as authenticated
        this.isAuthenticated = true;
        this.updateUserUI();
    }

    updateUserUI() {
        // Add user info to header if it exists
        const header = document.querySelector('.header .nav');
        if (header && this.user) {
            // Check if user menu already exists
            if (!document.querySelector('.user-menu')) {
                const userMenu = this.createUserMenu();
                header.appendChild(userMenu);
            }
        }
    }

    createUserMenu() {
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-left: auto;
        `;

        const userAvatar = document.createElement('div');
        userAvatar.className = 'user-avatar';
        userAvatar.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        userAvatar.textContent = this.user.name ? this.user.name.charAt(0).toUpperCase() : 'U';
        userAvatar.title = `Hola, ${this.user.name || 'Usuario'}`;

        const userInfo = document.createElement('div');
        userInfo.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        `;

        const userName = document.createElement('div');
        userName.style.cssText = `
            font-weight: 600;
            color: var(--dark);
            font-size: 0.875rem;
        `;
        userName.textContent = this.user.name || 'Usuario';

        const userRole = document.createElement('div');
        userRole.style.cssText = `
            color: var(--gray);
            font-size: 0.75rem;
        `;
        userRole.textContent = this.user.role || 'Usuario';

        userInfo.appendChild(userName);
        userInfo.appendChild(userRole);

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Cerrar Sesión';
        logoutButton.style.cssText = `
            padding: 0.5rem 1rem;
            background: var(--error);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        logoutButton.addEventListener('click', () => this.logout());

        userMenu.appendChild(userAvatar);
        userMenu.appendChild(userInfo);
        userMenu.appendChild(logoutButton);

        return userMenu;
    }

    addLogoutHandlers() {
        // Add logout functionality to any existing logout buttons
        const logoutButtons = document.querySelectorAll('[data-logout]');
        logoutButtons.forEach(button => {
            button.addEventListener('click', () => this.logout());
        });
    }

    logout() {
        // Clear user data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Reset state
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        
        // Redirect to login
        window.location.href = 'login.html';
    }

    // Method to check if user has specific role
    hasRole(role) {
        return this.isAuthenticated && this.user && this.user.role === role;
    }

    // Method to check if user has any of the specified roles
    hasAnyRole(roles) {
        return this.isAuthenticated && this.user && roles.includes(this.user.role);
    }

    // Method to get current user
    getCurrentUser() {
        return this.user;
    }

    // Method to get current token
    getCurrentToken() {
        return this.token;
    }

    // Method to check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated;
    }
}

// Global auth manager instance
window.authManager = new AuthManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
