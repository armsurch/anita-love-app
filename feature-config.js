// 🎛️ FEATURE CONFIGURATION
// Toggle features on/off easily without deleting code

window.ROMANTIC_APP_CONFIG = {
    // 🎮 Core Features (Always On)
    heartAnimation: true,
    photoGallery: true,
    memoryGame: true,
    loveQuiz: true,
    wishingWell: true,
    
    // 🚀 Advanced Features (Toggle On/Off)
    realTimeChat: false,        // ← Set to false to disable chat
    cloudStorage: false,        // ← Set to false to disable cloud features
    analytics: false,           // ← Set to false to disable analytics
    userAuthentication: false,  // ← Set to false to disable login requirement
    aiOracle: true,            // ← Keep Oracle but make it work without login
    
    // 🎨 UI Features
    showChatButton: false,      // Hide chat interface
    showCloudPanel: false,      // Hide cloud storage panel
    showAnalytics: false,       // Hide analytics dashboard
    showLoginModal: false,      // Don't force login
    
    // 🤖 AI Features
    oracleRequiresLogin: false, // Oracle works without login
    enhancedPredictions: false, // Simple predictions only
    
    // 📱 Interface Options
    showFeatureToggles: true,   // Show toggle switches in UI
    debugMode: false,           // Show debug information
    
    // 🌐 Backend Integration
    useNetlifyFunctions: false, // Use local fallbacks instead
    offlineMode: true,          // Work completely offline
    
    // 📊 Fallback Data
    useMockData: true,          // Use simulated data instead of backend
    
    // 🎯 Quick Presets
    presets: {
        minimal: {
            realTimeChat: false,
            cloudStorage: false,
            analytics: false,
            userAuthentication: false,
            showLoginModal: false
        },
        full: {
            realTimeChat: true,
            cloudStorage: true,
            analytics: true,
            userAuthentication: true,
            showLoginModal: true
        },
        romantic: {
            realTimeChat: false,
            cloudStorage: false,
            analytics: false,
            userAuthentication: false,
            aiOracle: true,
            oracleRequiresLogin: false
        }
    }
};

// 🎛️ EASY PRESET FUNCTIONS
function setMinimalMode() {
    Object.assign(window.ROMANTIC_APP_CONFIG, window.ROMANTIC_APP_CONFIG.presets.minimal);
    console.log('🎯 Switched to Minimal Mode - Core features only');
    if (window.app) window.app.updateFeatures();
}

function setFullMode() {
    Object.assign(window.ROMANTIC_APP_CONFIG, window.ROMANTIC_APP_CONFIG.presets.full);
    console.log('🚀 Switched to Full Mode - All features enabled');
    if (window.app) window.app.updateFeatures();
}

function setRomanticMode() {
    Object.assign(window.ROMANTIC_APP_CONFIG, window.ROMANTIC_APP_CONFIG.presets.romantic);
    console.log('💕 Switched to Romantic Mode - Love features only');
    if (window.app) window.app.updateFeatures();
}

// 🎮 INDIVIDUAL FEATURE TOGGLES
function toggleRealTimeChat() {
    window.ROMANTIC_APP_CONFIG.realTimeChat = !window.ROMANTIC_APP_CONFIG.realTimeChat;
    window.ROMANTIC_APP_CONFIG.showChatButton = window.ROMANTIC_APP_CONFIG.realTimeChat;
    console.log(`💬 Real-Time Chat: ${window.ROMANTIC_APP_CONFIG.realTimeChat ? 'ON' : 'OFF'}`);
    if (window.app) window.app.updateFeatures();
}

function toggleCloudStorage() {
    window.ROMANTIC_APP_CONFIG.cloudStorage = !window.ROMANTIC_APP_CONFIG.cloudStorage;
    window.ROMANTIC_APP_CONFIG.showCloudPanel = window.ROMANTIC_APP_CONFIG.cloudStorage;
    console.log(`☁️ Cloud Storage: ${window.ROMANTIC_APP_CONFIG.cloudStorage ? 'ON' : 'OFF'}`);
    if (window.app) window.app.updateFeatures();
}

function toggleAnalytics() {
    window.ROMANTIC_APP_CONFIG.analytics = !window.ROMANTIC_APP_CONFIG.analytics;
    window.ROMANTIC_APP_CONFIG.showAnalytics = window.ROMANTIC_APP_CONFIG.analytics;
    console.log(`📊 Analytics: ${window.ROMANTIC_APP_CONFIG.analytics ? 'ON' : 'OFF'}`);
    if (window.app) window.app.updateFeatures();
}

function toggleAuthentication() {
    window.ROMANTIC_APP_CONFIG.userAuthentication = !window.ROMANTIC_APP_CONFIG.userAuthentication;
    window.ROMANTIC_APP_CONFIG.showLoginModal = window.ROMANTIC_APP_CONFIG.userAuthentication;
    window.ROMANTIC_APP_CONFIG.oracleRequiresLogin = window.ROMANTIC_APP_CONFIG.userAuthentication;
    console.log(`🔐 Authentication: ${window.ROMANTIC_APP_CONFIG.userAuthentication ? 'ON' : 'OFF'}`);
    if (window.app) window.app.updateFeatures();
}

// 🎯 CONSOLE HELPERS
console.log('🎛️ Feature Configuration Loaded!');
console.log('💡 Quick Commands:');
console.log('   setMinimalMode()    - Core features only');
console.log('   setRomanticMode()   - Love features only');
console.log('   setFullMode()       - All features enabled');
console.log('   toggleRealTimeChat() - Toggle chat on/off');
console.log('   toggleCloudStorage() - Toggle cloud on/off');
console.log('   toggleAnalytics()    - Toggle analytics on/off');
console.log('   toggleAuthentication() - Toggle login on/off');
console.log('');
console.log('🎛️ Panel Management:');
console.log('   app.minimizeAllPanels() - Minimize all panels');
console.log('   app.maximizeAllPanels() - Maximize all panels');
console.log('   app.resetPanelLayout()  - Reset panel positions');
console.log('   app.togglePanel("panel-id") - Toggle specific panel');