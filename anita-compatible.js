// 🚀 ANITA PA - COMPATIBLE VERSION
// Works in older browsers with fallbacks

(function() {
    'use strict';
    
    // 🔧 POLYFILLS AND COMPATIBILITY
    
    // Simple Promise polyfill for older browsers
    if (!window.Promise) {
        window.Promise = function(executor) {
            var self = this;
            self.state = 'pending';
            self.value = undefined;
            self.handlers = [];
            
            function resolve(result) {
                if (self.state === 'pending') {
                    self.state = 'fulfilled';
                    self.value = result;
                    self.handlers.forEach(handle);
                    self.handlers = null;
                }
            }
            
            function reject(error) {
                if (self.state === 'pending') {
                    self.state = 'rejected';
                    self.value = error;
                    self.handlers.forEach(handle);
                    self.handlers = null;
                }
            }
            
            function handle(handler) {
                if (self.state === 'pending') {
                    self.handlers.push(handler);
                } else {
                    if (self.state === 'fulfilled' && handler.onFulfilled) {
                        handler.onFulfilled(self.value);
                    }
                    if (self.state === 'rejected' && handler.onRejected) {
                        handler.onRejected(self.value);
                    }
                }
            }
            
            self.then = function(onFulfilled, onRejected) {
                return new Promise(function(resolve, reject) {
                    handle({
                        onFulfilled: function(result) {
                            try {
                                resolve(onFulfilled ? onFulfilled(result) : result);
                            } catch (ex) {
                                reject(ex);
                            }
                        },
                        onRejected: function(error) {
                            try {
                                resolve(onRejected ? onRejected(error) : error);
                            } catch (ex) {
                                reject(ex);
                            }
                        }
                    });
                });
            };
            
            executor(resolve, reject);
        };
    }
    
    // Fetch polyfill for older browsers
    if (!window.fetch) {
        window.fetch = function(url, options) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                var method = (options && options.method) || 'GET';
                
                xhr.open(method, url);
                
                if (options && options.headers) {
                    for (var key in options.headers) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                }
                
                xhr.onload = function() {
                    resolve({
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        json: function() {
                            return Promise.resolve(JSON.parse(xhr.responseText));
                        },
                        text: function() {
                            return Promise.resolve(xhr.responseText);
                        }
                    });
                };
                
                xhr.onerror = function() {
                    reject(new Error('Network error'));
                };
                
                xhr.send((options && options.body) || null);
            });
        };
    }
    
    // CustomEvent polyfill
    if (!window.CustomEvent) {
        window.CustomEvent = function(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
    }
    
    // 🎨 COMPATIBLE ROMANTIC APP CLASS
    function RomanticApp() {
        this.apiBase = window.location.origin + '/.netlify/functions';
        this.user = null;
        this.authToken = localStorage.getItem('authToken');
        this.isOnline = navigator.onLine;
        this.websocket = null;
        
        console.log('🚀 Initializing Compatible Romantic App...');
        this.init();
    }
    
    // Initialize the app
    RomanticApp.prototype.init = function() {
        var self = this;
        
        // Initialize components step by step
        self.initAuth()
            .then(function() { return self.initUI(); })
            .then(function() { return self.initFeatures(); })
            .then(function() {
                console.log('✨ Compatible Romantic App Ready!');
                self.dispatchReadyEvent();
            })
            .catch(function(error) {
                console.error('❌ App initialization error:', error);
                self.showError('App failed to initialize: ' + error.message);
            });
    };
    
    // Authentication system
    RomanticApp.prototype.initAuth = function() {
        var self = this;
        return new Promise(function(resolve) {
            if (self.authToken) {
                self.validateToken()
                    .then(function() { return self.loadUserProfile(); })
                    .then(resolve)
                    .catch(function() {
                        console.log('Token expired, showing login');
                        self.showAuthModal();
                        resolve();
                    });
            } else {
                self.showAuthModal();
                resolve();
            }
        });
    };
    
    // Validate authentication token
    RomanticApp.prototype.validateToken = function() {
        var self = this;
        return fetch(self.apiBase + '/user-auth', {
            headers: {
                'Authorization': 'Bearer ' + self.authToken
            }
        }).then(function(response) {
            if (!response.ok) {
                throw new Error('Token invalid');
            }
            return response.json();
        }).then(function(data) {
            self.user = data.user;
            return data;
        });
    };
    
    // Login user
    RomanticApp.prototype.login = function(email, password) {
        var self = this;
        return fetch(self.apiBase + '/user-auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.success) {
                self.authToken = data.tokens.accessToken;
                localStorage.setItem('authToken', self.authToken);
                localStorage.setItem('refreshToken', data.tokens.refreshToken);
                self.user = data.user;
                
                self.hideAuthModal();
                self.showWelcomeMessage(data.welcomeBack);
                return self.loadUserProfile();
            } else {
                throw new Error(data.error);
            }
        }).catch(function(error) {
            console.error('Login error:', error);
            self.showError('Login failed: ' + error.message);
        });
    };
    
    // Ask AI Oracle
    RomanticApp.prototype.askOracle = function(question, context) {
        var self = this;
        context = context || {};
        
        self.showOracleThinking();
        
        return fetch(self.apiBase + '/ai-oracle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (self.authToken || '')
            },
            body: JSON.stringify({ question: question, context: context })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.prediction) {
                self.displayOraclePrediction(data.prediction, data.source);
                self.trackEvent('oracle_question', { question: question, hasContext: !!context });
            } else if (data.fallback) {
                self.displayOraclePrediction(data.fallback, 'Fallback Oracle');
            }
            return data;
        }).catch(function(error) {
            console.error('Oracle error:', error);
            self.displayOraclePrediction(
                "🌟 The cosmic energies are shifting. Try asking again in a moment, and the universe will provide guidance! ✨",
                'Mystical Oracle'
            );
        });
    };
    
    // Track events
    RomanticApp.prototype.trackEvent = function(eventType, eventData) {
        var self = this;
        eventData = eventData || {};
        
        return fetch(self.apiBase + '/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (self.authToken || '')
            },
            body: JSON.stringify({
                eventType: eventType,
                eventData: eventData,
                timestamp: new Date().toISOString()
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.success && data.insights) {
                self.showInsight(data.insights);
            }
            return data;
        }).catch(function(error) {
            console.error('Analytics tracking error:', error);
        });
    };
    
    // Initialize UI components
    RomanticApp.prototype.initUI = function() {
        var self = this;
        return new Promise(function(resolve) {
            self.createAuthModal();
            self.bindEvents();
            resolve();
        });
    };
    
    // Initialize features
    RomanticApp.prototype.initFeatures = function() {
        var self = this;
        return new Promise(function(resolve) {
            // Initialize all features here
            resolve();
        });
    };
    
    // Create authentication modal
    RomanticApp.prototype.createAuthModal = function() {
        var authModal = document.createElement('div');
        authModal.id = 'auth-modal';
        authModal.className = 'auth-modal hidden';
        authModal.innerHTML = [
            '<div class="auth-content">',
            '  <div class="auth-header">',
            '    <h2>💕 Welcome to Your Romantic Journey</h2>',
            '    <p>Sign in to unlock all features</p>',
            '  </div>',
            '  <div class="auth-form">',
            '    <input type="email" id="login-email" placeholder="Email" required>',
            '    <input type="password" id="login-password" placeholder="Password" required>',
            '    <button class="auth-button" onclick="window.app.handleLogin()">Sign In 💖</button>',
            '  </div>',
            '</div>'
        ].join('');
        document.body.appendChild(authModal);
    };
    
    // Bind events
    RomanticApp.prototype.bindEvents = function() {
        var self = this;
        
        // Handle online/offline
        if (window.addEventListener) {
            window.addEventListener('online', function() {
                self.isOnline = true;
                self.updateConnectionStatus();
            });
            
            window.addEventListener('offline', function() {
                self.isOnline = false;
                self.updateConnectionStatus();
            });
        }
    };
    
    // Handle login
    RomanticApp.prototype.handleLogin = function() {
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        this.login(email, password);
    };
    
    // UI Helper Methods
    RomanticApp.prototype.showAuthModal = function() {
        var modal = document.getElementById('auth-modal');
        if (modal) {
            modal.className = modal.className.replace('hidden', '');
        }
    };
    
    RomanticApp.prototype.hideAuthModal = function() {
        var modal = document.getElementById('auth-modal');
        if (modal) {
            modal.className += ' hidden';
        }
    };
    
    RomanticApp.prototype.showOracleThinking = function() {
        var oracleResponse = document.getElementById('oracle-response');
        if (oracleResponse) {
            oracleResponse.innerHTML = [
                '<div class="oracle-thinking">',
                '  <div class="thinking-animation">🔮</div>',
                '  <p>The Oracle is consulting the cosmic energies...</p>',
                '</div>'
            ].join('');
        }
    };
    
    RomanticApp.prototype.displayOraclePrediction = function(prediction, source) {
        var oracleResponse = document.getElementById('oracle-response');
        if (oracleResponse) {
            oracleResponse.innerHTML = [
                '<div class="oracle-prediction">',
                '  <div class="prediction-header">',
                '    <span class="oracle-icon">🔮</span>',
                '    <span class="oracle-source">' + source + '</span>',
                '  </div>',
                '  <div class="prediction-text">' + prediction + '</div>',
                '  <div class="prediction-footer">',
                '    <small>Prediction generated at ' + new Date().toLocaleTimeString() + '</small>',
                '  </div>',
                '</div>'
            ].join('');
        }
    };
    
    RomanticApp.prototype.showWelcomeMessage = function(data) {
        if (data && data.newUser) {
            this.showSuccess('🎉 Welcome to your romantic journey! All features are now unlocked! ✨');
        } else {
            this.showSuccess('💕 Welcome back! ' + (data && data.loveScoreChange || 'Your love continues to grow!'));
        }
    };
    
    RomanticApp.prototype.showSuccess = function(message) {
        this.showNotification(message, 'success');
    };
    
    RomanticApp.prototype.showError = function(message) {
        this.showNotification(message, 'error');
    };
    
    RomanticApp.prototype.showInsight = function(message) {
        this.showNotification(message, 'insight');
    };
    
    RomanticApp.prototype.showNotification = function(message, type) {
        type = type || 'info';
        var notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.className += ' show';
        }, 100);
        
        setTimeout(function() {
            notification.className = notification.className.replace('show', '');
            setTimeout(function() {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    };
    
    RomanticApp.prototype.updateConnectionStatus = function() {
        console.log('Connection status:', this.isOnline ? 'Online' : 'Offline');
    };
    
    RomanticApp.prototype.loadUserProfile = function() {
        return Promise.resolve();
    };
    
    RomanticApp.prototype.dispatchReadyEvent = function() {
        if (window.CustomEvent) {
            window.dispatchEvent(new CustomEvent('romanticAppReady', { 
                detail: { app: this, features: ['auth', 'oracle', 'analytics'] }
            }));
        }
    };
    
    // 🎨 BASIC STYLES
    var compatibleStyles = [
        '.auth-modal {',
        '  position: fixed; top: 0; left: 0; width: 100%; height: 100%;',
        '  background: rgba(0, 0, 0, 0.8); display: flex;',
        '  justify-content: center; align-items: center; z-index: 1000;',
        '}',
        '.auth-modal.hidden { display: none; }',
        '.auth-content {',
        '  background: linear-gradient(135deg, #ff6b9d, #c44569);',
        '  padding: 2rem; border-radius: 20px; max-width: 400px;',
        '  width: 90%; color: white; text-align: center;',
        '}',
        '.auth-form input {',
        '  width: 100%; padding: 0.75rem; margin-bottom: 1rem;',
        '  border: none; border-radius: 10px; box-sizing: border-box;',
        '}',
        '.auth-button {',
        '  width: 100%; padding: 0.75rem; border: none; border-radius: 10px;',
        '  background: linear-gradient(135deg, #ff9a9e, #fecfef);',
        '  color: #333; font-weight: bold; cursor: pointer;',
        '}',
        '.notification {',
        '  position: fixed; top: 20px; left: 50%; transform: translateX(-50%);',
        '  background: linear-gradient(135deg, #ff6b9d, #c44569);',
        '  color: white; padding: 1rem 2rem; border-radius: 10px;',
        '  z-index: 1001; transition: all 0.3s ease; opacity: 0;',
        '}',
        '.notification.show { opacity: 1; }',
        '.notification.success { background: linear-gradient(135deg, #2ed573, #17c0eb); }',
        '.notification.error { background: linear-gradient(135deg, #ff4757, #ff3838); }',
        '.notification.insight { background: linear-gradient(135deg, #ffa726, #ff7043); }',
        '.oracle-thinking { text-align: center; padding: 2rem; }',
        '.thinking-animation { font-size: 3rem; }',
        '.oracle-prediction {',
        '  background: linear-gradient(135deg, #667eea, #764ba2);',
        '  color: white; padding: 1.5rem; border-radius: 15px; margin: 1rem 0;',
        '}',
        '.prediction-header { margin-bottom: 1rem; }',
        '.oracle-icon { font-size: 1.5rem; margin-right: 0.5rem; }',
        '.prediction-text { font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem; }',
        '.prediction-footer { text-align: center; opacity: 0.7; }'
    ].join('\n');
    
    // 🚀 INITIALIZE COMPATIBLE APP
    function initializeCompatibleApp() {
        try {
            // Add styles
            var styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            if (styleSheet.styleSheet) {
                styleSheet.styleSheet.cssText = compatibleStyles;
            } else {
                styleSheet.appendChild(document.createTextNode(compatibleStyles));
            }
            document.head.appendChild(styleSheet);
            
            // Make classes globally available
            window.RomanticApp = RomanticApp;
            
            // Initialize the app
            window.app = new RomanticApp();
            
            console.log('🎉 Compatible Romantic App Initialized!');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Compatible App:', error);
            return false;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', initializeCompatibleApp);
        } else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState === 'complete') {
                    initializeCompatibleApp();
                }
            });
        }
    } else {
        initializeCompatibleApp();
    }
    
    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = RomanticApp;
    }
    
})();