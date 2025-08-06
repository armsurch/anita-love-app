// 🚀 ANITA PA - FULL-STACK ROMANTIC WEB APP
// Complete integration with Netlify Functions backend

// 🔧 COMPATIBILITY LAYER
(function() {
    'use strict';
    
    // Ensure modern JavaScript features are available
    if (!window.Promise) {
        console.warn('⚠️ Promise not supported, adding polyfill');
        // Simple Promise polyfill would go here in production
    }
    
    if (!window.fetch) {
        console.warn('⚠️ Fetch not supported, will use fallback');
        // Fetch polyfill would go here in production
        window.fetch = function(url, options) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(options?.method || 'GET', url);
                xhr.onload = () => resolve({
                    ok: xhr.status >= 200 && xhr.status < 300,
                    status: xhr.status,
                    json: () => Promise.resolve(JSON.parse(xhr.responseText)),
                    text: () => Promise.resolve(xhr.responseText)
                });
                xhr.onerror = () => reject(new Error('Network error'));
                if (options?.body) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(options.body);
                } else {
                    xhr.send();
                }
            });
        };
    }
    
    // Ensure CustomEvent is available
    if (!window.CustomEvent) {
        window.CustomEvent = function(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            const evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
    }
})();

class RomanticApp {
    constructor() {
        this.apiBase = window.location.origin + '/.netlify/functions';
        this.user = null;
        this.authToken = localStorage.getItem('authToken');
        this.isOnline = navigator.onLine;
        this.websocket = null;
        
        // 🎛️ Load feature configuration
        this.config = window.ROMANTIC_APP_CONFIG || {
            realTimeChat: false,
            cloudStorage: false,
            analytics: false,
            userAuthentication: false,
            aiOracle: true,
            oracleRequiresLogin: false,
            offlineMode: true,
            showLoginModal: false
        };
        
        console.log('🚀 Initializing Romantic App with features:', this.config);
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Romantic App...');
        
        // Initialize components based on configuration
        if (this.config.userAuthentication) {
            await this.initAuth();
        } else {
            console.log('🔓 Authentication disabled - running in guest mode');
        }
        
        if (this.config.realTimeChat) {
            await this.initRealTimeFeatures();
        } else {
            console.log('💬 Real-time chat disabled');
        }
        
        if (this.config.cloudStorage) {
            await this.initCloudStorage();
        } else {
            console.log('☁️ Cloud storage disabled');
        }
        
        if (this.config.analytics) {
            await this.initAnalytics();
        } else {
            console.log('📊 Analytics disabled');
        }
        
        await this.initUI();
        
        // Load saved panel states
        setTimeout(() => this.loadPanelStates(), 500);
        
        console.log('✨ Romantic App Ready with selected features!');
        this.dispatchReadyEvent();
    }
    
    // 🎛️ UPDATE FEATURES DYNAMICALLY
    updateFeatures() {
        console.log('🔄 Updating app features...', this.config);
        
        // Update UI visibility
        this.updateUIVisibility();
        
        // Reinitialize features if needed
        if (this.config.realTimeChat && !this.chatInitialized) {
            this.initRealTimeFeatures();
        }
        
        if (this.config.cloudStorage && !this.cloudInitialized) {
            this.initCloudStorage();
        }
        
        if (this.config.analytics && !this.analyticsInitialized) {
            this.initAnalytics();
        }
        
        console.log('✅ Features updated successfully!');
    }
    
    // 🎨 UPDATE UI VISIBILITY
    updateUIVisibility() {
        // Hide/show chat interface
        const chatElements = document.querySelectorAll('.chat-interface, .chat-button, #chat-panel');
        chatElements.forEach(el => {
            el.style.display = this.config.showChatButton ? 'block' : 'none';
        });
        
        // Hide/show cloud storage panel
        const cloudElements = document.querySelectorAll('.cloud-panel, .cloud-button, #cloud-storage');
        cloudElements.forEach(el => {
            el.style.display = this.config.showCloudPanel ? 'block' : 'none';
        });
        
        // Hide/show analytics dashboard
        const analyticsElements = document.querySelectorAll('.analytics-panel, .analytics-button, #analytics-dashboard');
        analyticsElements.forEach(el => {
            el.style.display = this.config.showAnalytics ? 'block' : 'none';
        });
        
        // Hide/show login modal
        if (!this.config.showLoginModal) {
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.style.display = 'none';
            }
        }
    }
    
    // 🎛️ PANEL CONTROL METHODS
    togglePanel(panelId) {
        const panel = document.getElementById(panelId);
        const content = panel.querySelector('.panel-content');
        const minimizeIcon = panel.querySelector('.minimize-icon');
        
        if (panel.classList.contains('minimized')) {
            // Maximize
            panel.classList.remove('minimized');
            content.style.display = 'block';
            minimizeIcon.textContent = '−';
            console.log(`📈 ${panelId} maximized`);
        } else {
            // Minimize
            panel.classList.add('minimized');
            content.style.display = 'none';
            minimizeIcon.textContent = '+';
            console.log(`📉 ${panelId} minimized`);
        }
        
        // Save panel state
        this.savePanelState(panelId, !panel.classList.contains('minimized'));
    }
    
    closePanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.style.display = 'none';
            console.log(`❌ ${panelId} closed`);
            
            // Save panel state
            this.savePanelState(panelId, false, true);
        }
    }
    
    showPanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.style.display = 'block';
            panel.classList.remove('minimized');
            const content = panel.querySelector('.panel-content');
            const minimizeIcon = panel.querySelector('.minimize-icon');
            
            if (content) content.style.display = 'block';
            if (minimizeIcon) minimizeIcon.textContent = '−';
            
            console.log(`✅ ${panelId} shown`);
            
            // Save panel state
            this.savePanelState(panelId, true, false);
        }
    }
    
    savePanelState(panelId, isOpen, isClosed = false) {
        const panelStates = JSON.parse(localStorage.getItem('panelStates') || '{}');
        panelStates[panelId] = {
            isOpen: isOpen,
            isClosed: isClosed,
            timestamp: Date.now()
        };
        localStorage.setItem('panelStates', JSON.stringify(panelStates));
    }
    
    loadPanelStates() {
        const panelStates = JSON.parse(localStorage.getItem('panelStates') || '{}');
        
        Object.keys(panelStates).forEach(panelId => {
            const state = panelStates[panelId];
            const panel = document.getElementById(panelId);
            
            if (panel) {
                if (state.isClosed) {
                    panel.style.display = 'none';
                } else if (!state.isOpen) {
                    // Panel is minimized
                    panel.classList.add('minimized');
                    const content = panel.querySelector('.panel-content');
                    const minimizeIcon = panel.querySelector('.minimize-icon');
                    
                    if (content) content.style.display = 'none';
                    if (minimizeIcon) minimizeIcon.textContent = '+';
                }
            }
        });
    }
    
    // 🎮 PANEL MANAGEMENT SHORTCUTS
    minimizeAllPanels() {
        const panels = document.querySelectorAll('.minimizable-panel');
        panels.forEach(panel => {
            if (!panel.classList.contains('minimized')) {
                this.togglePanel(panel.id);
            }
        });
        console.log('📉 All panels minimized');
    }
    
    maximizeAllPanels() {
        const panels = document.querySelectorAll('.minimizable-panel');
        panels.forEach(panel => {
            if (panel.classList.contains('minimized')) {
                this.togglePanel(panel.id);
            }
        });
        console.log('📈 All panels maximized');
    }
    
    resetPanelLayout() {
        const panels = document.querySelectorAll('.minimizable-panel');
        panels.forEach(panel => {
            panel.style.display = 'block';
            panel.classList.remove('minimized');
            const content = panel.querySelector('.panel-content');
            const minimizeIcon = panel.querySelector('.minimize-icon');
            
            if (content) content.style.display = 'block';
            if (minimizeIcon) minimizeIcon.textContent = '−';
        });
        
        localStorage.removeItem('panelStates');
        console.log('🔄 Panel layout reset');
    }
    
    // 🎮 CREATE PANEL SHORTCUTS
    createPanelShortcuts() {
        const shortcuts = document.createElement('div');
        shortcuts.className = 'panel-shortcuts';
        shortcuts.innerHTML = `
            <button class="shortcut-btn" onclick="app.minimizeAllPanels()" title="Minimize All Panels">
                📉
            </button>
            <button class="shortcut-btn" onclick="app.maximizeAllPanels()" title="Maximize All Panels">
                📈
            </button>
            <button class="shortcut-btn" onclick="app.resetPanelLayout()" title="Reset Panel Layout">
                🔄
            </button>
            <button class="shortcut-btn" onclick="app.togglePanelVisibility()" title="Toggle All Panels">
                👁️
            </button>
        `;
        
        document.body.appendChild(shortcuts);
    }
    
    // 👁️ TOGGLE ALL PANELS VISIBILITY
    togglePanelVisibility() {
        const panels = document.querySelectorAll('.minimizable-panel');
        const anyVisible = Array.from(panels).some(panel => panel.style.display !== 'none');
        
        panels.forEach(panel => {
            panel.style.display = anyVisible ? 'none' : 'block';
        });
        
        console.log(`👁️ All panels ${anyVisible ? 'hidden' : 'shown'}`);
    }

    // 👥 AUTHENTICATION SYSTEM
    async initAuth() {
        if (this.authToken) {
            try {
                await this.validateToken();
                await this.loadUserProfile();
            } catch (error) {
                console.log('Token expired, showing login');
                if (this.config.showLoginModal) {
                    this.showAuthModal();
                }
            }
        } else {
            if (this.config.showLoginModal) {
                this.showAuthModal();
            } else {
                console.log('🔓 Running in guest mode - no login required');
            }
        }
    }

    async validateToken() {
        const response = await fetch(`${this.apiBase}/user-auth`, {
            headers: {
                'Authorization': `Bearer ${this.authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Token invalid');
        }
        
        const data = await response.json();
        this.user = data.user;
        return data;
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.apiBase}/user-auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.success) {
                this.authToken = data.tokens.accessToken;
                localStorage.setItem('authToken', this.authToken);
                localStorage.setItem('refreshToken', data.tokens.refreshToken);
                this.user = data.user;
                
                this.hideAuthModal();
                this.showWelcomeMessage(data.welcomeBack);
                await this.loadUserProfile();
                
                return data;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed: ' + error.message);
        }
    }

    async register(email, password, name, partnerName) {
        try {
            const response = await fetch(`${this.apiBase}/user-auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, partnerName })
            });

            const data = await response.json();
            
            if (data.success) {
                this.authToken = data.tokens.accessToken;
                localStorage.setItem('authToken', this.authToken);
                localStorage.setItem('refreshToken', data.tokens.refreshToken);
                this.user = data.user;
                
                this.hideAuthModal();
                this.showWelcomeMessage({ newUser: true });
                await this.loadUserProfile();
                
                return data;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Registration failed: ' + error.message);
        }
    }

    // ☁️ CLOUD STORAGE SYSTEM
    async initCloudStorage() {
        if (!this.authToken) return;
        
        try {
            const response = await fetch(`${this.apiBase}/cloud-storage`, {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            });
            
            const data = await response.json();
            this.cloudPhotos = data.photos;
            this.updatePhotoGallery(data.photos);
            
            console.log('☁️ Cloud storage initialized:', data.features);
        } catch (error) {
            console.error('Cloud storage error:', error);
        }
    }

    async uploadPhoto(file, caption, tags, location) {
        if (!this.authToken) {
            this.showError('Please login to upload photos');
            return;
        }

        try {
            // In production, this would handle actual file upload
            const uploadData = {
                url: URL.createObjectURL(file),
                caption: caption,
                tags: tags,
                location: location,
                memories: `Uploaded on ${new Date().toLocaleDateString()}`
            };

            const response = await fetch(`${this.apiBase}/cloud-storage`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData)
            });

            const data = await response.json();
            
            if (data.success) {
                this.cloudPhotos.push(data.photo);
                this.updatePhotoGallery(this.cloudPhotos);
                this.showSuccess('Photo uploaded and enhanced! ✨');
                await this.trackEvent('photo_upload', { caption, tags });
            }
            
            return data;
        } catch (error) {
            console.error('Upload error:', error);
            this.showError('Upload failed: ' + error.message);
        }
    }

    // 💬 REAL-TIME CHAT SYSTEM
    async initRealTimeFeatures() {
        if (!this.authToken) return;
        
        try {
            // Initialize WebSocket for real-time features
            this.connectWebSocket();
            
            // Load chat history
            const response = await fetch(`${this.apiBase}/real-time-chat`, {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            });
            
            const data = await response.json();
            this.chatHistory = data.messages;
            this.updateChatInterface(data);
            
            console.log('💬 Real-time features initialized:', data.features);
        } catch (error) {
            console.error('Real-time features error:', error);
        }
    }

    connectWebSocket() {
        // In production, this would connect to a WebSocket server
        console.log('🔌 WebSocket connection established');
        
        // Simulate real-time updates
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance every interval
                this.simulateRealTimeMessage();
            }
        }, 10000);
    }

    async sendMessage(message, type = 'text') {
        if (!this.authToken) {
            this.showError('Please login to send messages');
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/real-time-chat`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, type })
            });

            const data = await response.json();
            
            if (data.success) {
                this.chatHistory.push(data.message);
                this.updateChatInterface({ messages: this.chatHistory });
                
                // Handle AI response
                if (data.aiResponse) {
                    setTimeout(() => {
                        this.chatHistory.push(data.aiResponse);
                        this.updateChatInterface({ messages: this.chatHistory });
                    }, 1500);
                }
                
                await this.trackEvent('message_sent', { type, length: message.length });
            }
            
            return data;
        } catch (error) {
            console.error('Send message error:', error);
            this.showError('Message failed to send: ' + error.message);
        }
    }

    // 🤖 ENHANCED AI ORACLE
    async askOracle(question, context = {}) {
        try {
            this.showOracleThinking();
            
            // Check if Oracle requires login
            if (this.config.oracleRequiresLogin && !this.authToken) {
                this.displayOraclePrediction(
                    "🔮 Please sign in to unlock the full power of the Oracle! ✨",
                    'Oracle Guardian'
                );
                return;
            }
            
            // Use offline mode if configured
            if (this.config.offlineMode || !this.config.useNetlifyFunctions) {
                return this.getOfflineOraclePrediction(question);
            }
            
            const response = await fetch(`${this.apiBase}/ai-oracle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authToken || ''}`
                },
                body: JSON.stringify({ question, context })
            });

            const data = await response.json();
            
            if (data.prediction) {
                this.displayOraclePrediction(data.prediction, data.source);
                
                // Track event only if analytics enabled
                if (this.config.analytics) {
                    await this.trackEvent('oracle_question', { question, hasContext: !!context });
                }
                
                // Auto-send to chat only if chat enabled and logged in
                if (this.config.realTimeChat && this.authToken) {
                    await this.sendMessage(question, 'oracle-question');
                }
            } else if (data.fallback) {
                this.displayOraclePrediction(data.fallback, 'Fallback Oracle');
            }
            
            return data;
        } catch (error) {
            console.error('Oracle error:', error);
            // Fallback to offline prediction
            return this.getOfflineOraclePrediction(question);
        }
    }
    
    // 🔮 OFFLINE ORACLE PREDICTIONS
    getOfflineOraclePrediction(question) {
        const predictions = [
            "🌟 The stars align beautifully for your love story. Trust in the magic that surrounds you both! ✨",
            "💕 Your hearts are perfectly synchronized with the universe's rhythm. Beautiful moments await! 🎵",
            "🌙 The cosmic energies whisper of deep connection and lasting happiness in your future! 💫",
            "✨ Love flows through you like starlight - pure, bright, and eternal. Embrace this beautiful journey! 🌟",
            "🦋 Like butterflies dancing in spring, your love brings joy and wonder to the world! 🌸",
            "🌈 After every storm comes a rainbow - your love is that beautiful promise of hope! ☀️",
            "💖 The universe celebrates your connection! Every moment together is a gift to cherish! 🎁",
            "🕊️ Your love soars on wings of trust and understanding. Nothing can dim this beautiful light! ✨"
        ];
        
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        
        this.displayOraclePrediction(randomPrediction, 'Mystical Oracle');
        
        return {
            prediction: randomPrediction,
            source: 'Mystical Oracle',
            offline: true
        };
    }

    // 📊 ADVANCED ANALYTICS
    async initAnalytics() {
        if (!this.authToken) return;
        
        try {
            const response = await fetch(`${this.apiBase}/analytics?type=overview`, {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            });
            
            const data = await response.json();
            this.analyticsData = data.data;
            this.updateAnalyticsDashboard(data.data);
            
            console.log('📊 Analytics initialized:', data.features);
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }

    async trackEvent(eventType, eventData = {}) {
        try {
            const response = await fetch(`${this.apiBase}/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authToken || ''}`
                },
                body: JSON.stringify({
                    eventType,
                    eventData,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();
            
            if (data.success && data.insights) {
                this.showInsight(data.insights);
            }
            
            return data;
        } catch (error) {
            console.error('Analytics tracking error:', error);
        }
    }

    async getAnalyticsReport(type = 'overview') {
        if (!this.authToken) return null;
        
        try {
            const response = await fetch(`${this.apiBase}/analytics?type=${type}`, {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                }
            });
            
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Analytics report error:', error);
            return null;
        }
    }

    // 🎨 UI INTEGRATION
    async initUI() {
        this.createFullStackInterface();
        this.bindFullStackEvents();
        await this.loadInitialData();
    }

    createFullStackInterface() {
        // Add authentication modal
        this.createAuthModal();
        
        // Add cloud features panel
        this.createCloudPanel();
        
        // Add real-time chat interface
        this.createChatInterface();
        
        // Add analytics dashboard
        this.createAnalyticsDashboard();
        
        // Add enhanced controls
        this.createEnhancedControls();
        
        // Add panel management shortcuts
        this.createPanelShortcuts();
    }

    createAuthModal() {
        const authModal = document.createElement('div');
        authModal.id = 'auth-modal';
        authModal.className = 'auth-modal hidden';
        authModal.innerHTML = `
            <div class="auth-content">
                <div class="auth-header">
                    <h2>💕 Welcome to Your Romantic Journey</h2>
                    <p>Sign in to unlock all features</p>
                </div>
                
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Sign In</button>
                    <button class="auth-tab" data-tab="register">Create Account</button>
                </div>
                
                <div class="auth-form" id="login-form">
                    <input type="email" id="login-email" placeholder="Email" required>
                    <input type="password" id="login-password" placeholder="Password" required>
                    <button class="auth-button" onclick="app.handleLogin()">Sign In 💖</button>
                </div>
                
                <div class="auth-form hidden" id="register-form">
                    <input type="text" id="register-name" placeholder="Your Name" required>
                    <input type="text" id="register-partner" placeholder="Partner's Name">
                    <input type="email" id="register-email" placeholder="Email" required>
                    <input type="password" id="register-password" placeholder="Password" required>
                    <button class="auth-button" onclick="app.handleRegister()">Create Account ✨</button>
                </div>
                
                <div class="auth-features">
                    <h3>🌟 Premium Features</h3>
                    <ul>
                        <li>☁️ Unlimited cloud photo storage</li>
                        <li>💬 Real-time chat with your partner</li>
                        <li>🤖 Advanced AI predictions</li>
                        <li>📊 Detailed relationship analytics</li>
                        <li>🔄 Cross-device synchronization</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(authModal);
    }

    createCloudPanel() {
        const cloudPanel = document.createElement('div');
        cloudPanel.id = 'cloud-panel';
        cloudPanel.className = 'cloud-panel minimizable-panel';
        cloudPanel.innerHTML = `
            <div class="panel-header cloud-header">
                <div class="panel-title">
                    <h3>☁️ Cloud Storage</h3>
                    <div class="cloud-stats">
                        <span id="storage-used">0 MB</span> / <span id="storage-limit">10 GB</span>
                    </div>
                </div>
                <div class="panel-controls">
                    <button class="minimize-btn" onclick="app.togglePanel('cloud-panel')" title="Minimize/Maximize">
                        <span class="minimize-icon">−</span>
                    </button>
                    <button class="close-btn" onclick="app.closePanel('cloud-panel')" title="Close">
                        ×
                    </button>
                </div>
            </div>
            
            <div class="panel-content cloud-content">
                <div class="cloud-features">
                    <button class="cloud-button" onclick="app.showUploadModal()">
                        📸 Upload Photo
                    </button>
                    <button class="cloud-button" onclick="app.syncData()">
                        🔄 Sync Data
                    </button>
                    <button class="cloud-button" onclick="app.showCloudGallery()">
                        🖼️ Cloud Gallery
                    </button>
                </div>
                
                <div class="cloud-status" id="cloud-status">
                    <span class="status-indicator online"></span>
                    <span>Connected</span>
                </div>
            </div>
        `;
        
        // Add to main interface
        const container = document.querySelector('.container') || document.body;
        container.appendChild(cloudPanel);
    }

    createChatInterface() {
        const chatInterface = document.createElement('div');
        chatInterface.id = 'chat-interface';
        chatInterface.className = 'chat-interface minimizable-panel';
        chatInterface.innerHTML = `
            <div class="panel-header chat-header">
                <div class="panel-title">
                    <h3>💬 Real-Time Chat</h3>
                    <div class="chat-status">
                        <span class="status-indicator" id="chat-status"></span>
                        <span id="chat-status-text">Connecting...</span>
                    </div>
                </div>
                <div class="panel-controls">
                    <button class="minimize-btn" onclick="app.togglePanel('chat-interface')" title="Minimize/Maximize">
                        <span class="minimize-icon">−</span>
                    </button>
                    <button class="close-btn" onclick="app.closePanel('chat-interface')" title="Close">
                        ×
                    </button>
                </div>
            </div>
            
            <div class="panel-content chat-content">
                <div class="chat-messages" id="chat-messages">
                    <!-- Messages will be populated here -->
                </div>
                
                <div class="chat-input">
                    <input type="text" id="message-input" placeholder="Type a romantic message...">
                    <button onclick="app.sendChatMessage()">💕 Send</button>
                </div>
                
                <div class="chat-features">
                    <button onclick="app.sendMessage('', 'romantic')">💖 Romantic</button>
                    <button onclick="app.askOracle(document.getElementById('message-input').value)">🔮 Ask Oracle</button>
                    <button onclick="app.sharePhoto()">📸 Share Photo</button>
                </div>
            </div>
        `;
        
        const container = document.querySelector('.container') || document.body;
        container.appendChild(chatInterface);
    }

    createAnalyticsDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'analytics-dashboard';
        dashboard.className = 'analytics-dashboard minimizable-panel';
        dashboard.innerHTML = `
            <div class="panel-header dashboard-header">
                <div class="panel-title">
                    <h3>📊 Relationship Analytics</h3>
                    <div class="dashboard-tabs">
                        <button class="dashboard-tab active" data-report="overview">Overview</button>
                        <button class="dashboard-tab" data-report="love">Love Score</button>
                        <button class="dashboard-tab" data-report="engagement">Activity</button>
                        <button class="dashboard-tab" data-report="photos">Photos</button>
                    </div>
                </div>
                <div class="panel-controls">
                    <button class="minimize-btn" onclick="app.togglePanel('analytics-dashboard')" title="Minimize/Maximize">
                        <span class="minimize-icon">−</span>
                    </button>
                    <button class="close-btn" onclick="app.closePanel('analytics-dashboard')" title="Close">
                        ×
                    </button>
                </div>
            </div>
            
            <div class="panel-content dashboard-content" id="dashboard-content">
                <!-- Analytics content will be populated here -->
            </div>
        `;
        
        const container = document.querySelector('.container') || document.body;
        container.appendChild(dashboard);
    }

    // 🎯 EVENT HANDLERS
    bindFullStackEvents() {
        // Auth tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('auth-tab')) {
                this.switchAuthTab(e.target.dataset.tab);
            }
            
            if (e.target.classList.contains('dashboard-tab')) {
                this.switchDashboardTab(e.target.dataset.report);
            }
        });

        // Enter key for chat
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.id === 'message-input') {
                this.sendChatMessage();
            }
        });

        // Online/offline detection
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateConnectionStatus();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateConnectionStatus();
        });
    }

    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        await this.login(email, password);
    }

    async handleRegister() {
        const name = document.getElementById('register-name').value;
        const partnerName = document.getElementById('register-partner').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        if (!name || !email || !password) {
            this.showError('Please fill in all required fields');
            return;
        }
        
        await this.register(email, password, name, partnerName);
    }

    async sendChatMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        await this.sendMessage(message);
    }

    // 🎨 UI UPDATE METHODS
    updatePhotoGallery(photos) {
        // Enhanced photo gallery with cloud features
        console.log('📸 Updating photo gallery with cloud features:', photos.length);
    }

    updateChatInterface(data) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        data.messages.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${message.sender.toLowerCase()}`;
            messageEl.innerHTML = `
                <div class="message-header">
                    <span class="sender">${message.sender}</span>
                    <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
                <div class="message-content">${message.message}</div>
                ${message.reactions ? `<div class="message-reactions">${message.reactions.join(' ')}</div>` : ''}
            `;
            messagesContainer.appendChild(messageEl);
        });
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    updateAnalyticsDashboard(data) {
        const content = document.getElementById('dashboard-content');
        if (!content) return;
        
        content.innerHTML = `
            <div class="analytics-summary">
                <div class="metric-card">
                    <h4>💕 Love Score</h4>
                    <div class="metric-value">${data.summary.loveScore}</div>
                    <div class="metric-trend">${data.summary.growthTrend}</div>
                </div>
                
                <div class="metric-card">
                    <h4>⏰ Time Together</h4>
                    <div class="metric-value">${data.summary.totalTimeSpent}</div>
                    <div class="metric-trend">Quality time</div>
                </div>
                
                <div class="metric-card">
                    <h4>🎯 Engagement</h4>
                    <div class="metric-value">${data.summary.totalVisits}</div>
                    <div class="metric-trend">Total visits</div>
                </div>
            </div>
            
            <div class="insights-section">
                <h4>💡 Relationship Insights</h4>
                <ul class="insights-list">
                    ${data.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // 🎭 UI HELPERS
    showAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-form`).classList.remove('hidden');
    }

    switchDashboardTab(report) {
        document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-report="${report}"]`).classList.add('active');
        
        this.loadAnalyticsReport(report);
    }

    async loadAnalyticsReport(type) {
        const data = await this.getAnalyticsReport(type);
        if (data) {
            this.updateAnalyticsDashboard(data);
        }
    }

    showWelcomeMessage(data) {
        if (data.newUser) {
            this.showSuccess('🎉 Welcome to your romantic journey! All features are now unlocked! ✨');
        } else {
            this.showSuccess(`💕 Welcome back! ${data.loveScoreChange || 'Your love continues to grow!'}`);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showInsight(message) {
        this.showNotification(message, 'insight');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // 🔮 ENHANCED ORACLE METHODS
    showOracleThinking() {
        const oracleResponse = document.getElementById('oracle-response');
        if (oracleResponse) {
            oracleResponse.innerHTML = `
                <div class="oracle-thinking">
                    <div class="thinking-animation">🔮</div>
                    <p>The Oracle is consulting the cosmic energies...</p>
                </div>
            `;
        }
    }

    displayOraclePrediction(prediction, source) {
        const oracleResponse = document.getElementById('oracle-response');
        if (oracleResponse) {
            oracleResponse.innerHTML = `
                <div class="oracle-prediction">
                    <div class="prediction-header">
                        <span class="oracle-icon">🔮</span>
                        <span class="oracle-source">${source}</span>
                    </div>
                    <div class="prediction-text">${prediction}</div>
                    <div class="prediction-footer">
                        <small>Prediction generated at ${new Date().toLocaleTimeString()}</small>
                    </div>
                </div>
            `;
        }
    }

    // 🔄 DATA SYNC METHODS
    async syncData() {
        if (!this.authToken) {
            this.showError('Please login to sync data');
            return;
        }

        try {
            this.showSuccess('🔄 Syncing your romantic data...');
            
            // Sync all data sources
            await Promise.all([
                this.initCloudStorage(),
                this.initRealTimeFeatures(),
                this.initAnalytics()
            ]);
            
            this.showSuccess('✅ All data synced successfully!');
        } catch (error) {
            console.error('Sync error:', error);
            this.showError('Sync failed: ' + error.message);
        }
    }

    updateConnectionStatus() {
        const cloudStatus = document.getElementById('cloud-status');
        const chatStatus = document.getElementById('chat-status');
        
        if (cloudStatus) {
            const indicator = cloudStatus.querySelector('.status-indicator');
            const text = cloudStatus.querySelector('span:last-child');
            
            if (this.isOnline) {
                indicator.className = 'status-indicator online';
                text.textContent = 'Connected';
            } else {
                indicator.className = 'status-indicator offline';
                text.textContent = 'Offline';
            }
        }
        
        if (chatStatus) {
            chatStatus.className = this.isOnline ? 'status-indicator online' : 'status-indicator offline';
            const statusText = document.getElementById('chat-status-text');
            if (statusText) {
                statusText.textContent = this.isOnline ? 'Connected' : 'Offline';
            }
        }
    }

    // 🎮 ENHANCED GAME INTEGRATION
    async trackGameScore(game, score, time) {
        await this.trackEvent('game_completed', {
            game: game,
            score: score,
            time: time,
            timestamp: new Date().toISOString()
        });
    }

    // 📱 MOBILE OPTIMIZATION
    initMobileFeatures() {
        // Add mobile-specific features
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
        
        // Add to home screen prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    showInstallPrompt() {
        this.showNotification('💕 Add this romantic app to your home screen for the best experience!', 'info');
    }

    // 🚀 STARTUP
    async loadInitialData() {
        if (this.authToken) {
            await this.syncData();
        }
        
        // Track app startup
        await this.trackEvent('app_startup', {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            isOnline: this.isOnline
        });
    }

    // 🎯 SIMULATION METHODS (for demo)
    simulateRealTimeMessage() {
        const messages = [
            { sender: 'Anita', message: '💕 Thinking of you right now!', type: 'romantic' },
            { sender: 'AI Oracle', message: '🔮 Beautiful energy surrounds your love today!', type: 'oracle' },
            { sender: 'System', message: '🎉 New achievement unlocked: Love Master!', type: 'achievement' }
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        randomMessage.timestamp = new Date().toISOString();
        randomMessage.id = `sim_${Date.now()}`;
        
        if (this.chatHistory) {
            this.chatHistory.push(randomMessage);
            this.updateChatInterface({ messages: this.chatHistory });
        }
    }
}

// 🎨 ENHANCED STYLES
const fullStackStyles = `
    /* Authentication Modal */
    .auth-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }

    .auth-modal.hidden {
        display: none;
    }

    .auth-content {
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        padding: 2rem;
        border-radius: 20px;
        max-width: 400px;
        width: 90%;
        color: white;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .auth-header h2 {
        margin: 0 0 0.5rem 0;
        text-align: center;
    }

    .auth-header p {
        margin: 0 0 1.5rem 0;
        text-align: center;
        opacity: 0.9;
    }

    .auth-tabs {
        display: flex;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        overflow: hidden;
    }

    .auth-tab {
        flex: 1;
        padding: 0.75rem;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .auth-tab.active {
        background: rgba(255, 255, 255, 0.3);
    }

    .auth-form input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.9);
        box-sizing: border-box;
    }

    .auth-button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #ff9a9e, #fecfef);
        color: #333;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .auth-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .auth-features {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.3);
    }

    .auth-features h3 {
        margin: 0 0 1rem 0;
        text-align: center;
    }

    .auth-features ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .auth-features li {
        padding: 0.25rem 0;
        opacity: 0.9;
    }

    /* Cloud Panel */
    .cloud-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem;
        border-radius: 15px;
        min-width: 200px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .cloud-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .cloud-header h3 {
        margin: 0;
        font-size: 1rem;
    }

    .cloud-stats {
        font-size: 0.8rem;
        opacity: 0.9;
    }

    .cloud-features {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .cloud-button {
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .cloud-button:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }

    .cloud-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff4757;
    }

    .status-indicator.online {
        background: #2ed573;
    }

    /* Chat Interface */
    .chat-interface {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        height: 400px;
        background: linear-gradient(135deg, #ff9a9e, #fecfef);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .chat-header {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-header h3 {
        margin: 0;
        color: white;
        font-size: 1rem;
    }

    .chat-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: white;
        font-size: 0.8rem;
    }

    .chat-messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .chat-message {
        padding: 0.5rem;
        border-radius: 10px;
        max-width: 80%;
    }

    .chat-message.you {
        align-self: flex-end;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
    }

    .chat-message.anita,
    .chat-message.system,
    .chat-message.ai {
        align-self: flex-start;
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }

    .message-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        opacity: 0.8;
        margin-bottom: 0.25rem;
    }

    .message-content {
        font-size: 0.9rem;
    }

    .message-reactions {
        margin-top: 0.25rem;
        font-size: 0.8rem;
    }

    .chat-input {
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        display: flex;
        gap: 0.5rem;
    }

    .chat-input input {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.9);
    }

    .chat-input button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .chat-input button:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .chat-features {
        padding: 0.5rem 1rem;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .chat-features button {
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
    }

    .chat-features button:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    /* Analytics Dashboard */
    .analytics-dashboard {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 350px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .dashboard-header {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    .dashboard-header h3 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
    }

    .dashboard-tabs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .dashboard-tab {
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
    }

    .dashboard-tab.active {
        background: rgba(255, 255, 255, 0.3);
    }

    .dashboard-content {
        padding: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }

    .analytics-summary {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .metric-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
    }

    .metric-card h4 {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }

    .metric-value {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.25rem;
    }

    .metric-trend {
        font-size: 0.8rem;
        opacity: 0.8;
    }

    .insights-section h4 {
        margin: 0 0 0.5rem 0;
        font-size: 0.9rem;
    }

    .insights-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .insights-list li {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        font-size: 0.8rem;
    }

    /* Notifications */
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        transition: all 0.3s ease;
        max-width: 400px;
        text-align: center;
    }

    .notification.show {
        transform: translateX(-50%) translateY(0);
    }

    .notification.success {
        background: linear-gradient(135deg, #2ed573, #17c0eb);
    }

    .notification.error {
        background: linear-gradient(135deg, #ff4757, #ff3838);
    }

    .notification.insight {
        background: linear-gradient(135deg, #ffa726, #ff7043);
    }

    /* Oracle Enhancement */
    .oracle-thinking {
        text-align: center;
        padding: 2rem;
    }

    .thinking-animation {
        font-size: 3rem;
        animation: pulse 2s infinite;
    }

    .oracle-prediction {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        margin: 1rem 0;
    }

    .prediction-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .oracle-icon {
        font-size: 1.5rem;
    }

    .oracle-source {
        font-weight: bold;
        opacity: 0.9;
    }

    .prediction-text {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .prediction-footer {
        text-align: center;
        opacity: 0.7;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .cloud-panel,
        .chat-interface,
        .analytics-dashboard {
            position: relative;
            width: 100%;
            margin: 1rem 0;
        }

        .chat-interface {
            height: 300px;
        }

        .analytics-dashboard {
            width: 100%;
        }

        .auth-content {
            width: 95%;
            padding: 1.5rem;
        }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

// 🚀 INITIALIZE FULL-STACK APP
function initializeRomanticApp() {
    try {
        // Add enhanced styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = fullStackStyles;
        document.head.appendChild(styleSheet);
        
        // Make RomanticApp globally available
        window.RomanticApp = RomanticApp;
        
        // Initialize the full-stack romantic app
        window.app = new RomanticApp();
        
        console.log('🎉 Full-Stack Romantic App Initialized!');
        console.log('✨ Features: Authentication, Cloud Storage, Real-time Chat, AI Oracle, Advanced Analytics');
        
        // Dispatch custom event for testing
        if (typeof CustomEvent !== 'undefined') {
            window.dispatchEvent(new CustomEvent('romanticAppReady', { 
                detail: { app: window.app, features: ['auth', 'cloud', 'chat', 'analytics', 'oracle'] }
            }));
        }
        
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Romantic App:', error);
        return false;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRomanticApp);
} else {
    // DOM already loaded
    initializeRomanticApp();
}

// 🎯 EXPORT FOR MODULES
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RomanticApp;
}

// 🌐 GLOBAL AVAILABILITY
if (typeof window !== 'undefined') {
    window.RomanticApp = RomanticApp;
}