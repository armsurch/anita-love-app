// ===== FUTURISTIC ANITA PA APPLICATION =====

class FuturisticAnitaApp {
    constructor() {
        this.SPECIAL_DATE = new Date('2024-01-01'); // Change this to your special date!
        this.musicEnabled = false;
        this.particlesEnabled = true;
        this.messagesShown = 0;
        this.currentPhotoIndex = 0;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.heart3DAnimating = false;
        this.weatherData = null;
        
        // Data storage
        this.milestones = this.loadData('milestones') || this.getDefaultMilestones();
        this.memories = this.loadData('memories') || [];
        this.achievements = this.loadData('achievements') || this.getDefaultAchievements();
        this.voiceNotes = this.loadData('voiceNotes') || [];
        this.dreams = this.loadData('dreams') || [];
        this.reminders = this.loadData('reminders') || this.getDefaultReminders();
        this.loveLocations = this.loadData('loveLocations') || [];
        this.aiArtworks = this.loadData('aiArtworks') || [];
        
        // AI Oracle predictions
        this.oraclePredictions = [
            "The stars align perfectly for your love story. A beautiful surprise awaits you both this week! ✨",
            "Your connection grows stronger with each passing day. Trust in the magic you create together 💫",
            "A romantic adventure calls to you both. Say yes to spontaneous moments of joy! 🌟",
            "The universe whispers of deep conversations and shared dreams in your near future 💭",
            "Your love radiates positive energy that touches everyone around you. Keep shining! ☀️",
            "A special memory will be created soon that you'll treasure forever. Be present for it! 📸",
            "The bond between you transcends the ordinary. You're writing a legendary love story! 📖",
            "Harmony and understanding flow between you like a gentle river. Peace surrounds your love 🌊",
            "Your hearts beat in perfect synchronization. This connection is truly extraordinary! 💓",
            "The oracle sees laughter, joy, and countless beautiful moments ahead for you both! 😊"
        ];
        
        // Date ideas based on weather and mood
        this.dateIdeas = {
            sunny: [
                { icon: "🌞", title: "Sunset Picnic", description: "Pack your favorite snacks and watch the sunset together in a beautiful park" },
                { icon: "🚴", title: "Bike Adventure", description: "Explore scenic routes and discover new places on a romantic bike ride" },
                { icon: "🌸", title: "Garden Stroll", description: "Visit a botanical garden and enjoy the beauty of nature hand in hand" }
            ],
            rainy: [
                { icon: "☔", title: "Cozy Movie Night", description: "Snuggle up with blankets, hot cocoa, and your favorite romantic movies" },
                { icon: "🎨", title: "Art Creation", description: "Paint or draw together while listening to soft music and sharing stories" },
                { icon: "📚", title: "Bookstore Date", description: "Browse books together and read your favorite passages to each other" }
            ],
            cloudy: [
                { icon: "☁️", title: "Museum Visit", description: "Explore art, history, or science museums and learn something new together" },
                { icon: "🍰", title: "Baking Together", description: "Create delicious treats in the kitchen and enjoy the sweet results" },
                { icon: "🎭", title: "Theater Show", description: "Attend a local play or performance and discuss it over dinner afterward" }
            ]
        };
        
        this.loveMessages = [
            "Every moment with you feels like a beautiful dream come true 💕",
            "Your smile is the sunshine that brightens my darkest days ☀️",
            "I fall in love with you more and more each passing day 💖",
            "You are my today, my tomorrow, and my forever ❤️",
            "In your eyes, I found my home and my heart found its peace 🏠",
            "Your laugh is my favorite sound in the entire world 😊",
            "With you, every day is Valentine's Day 🌹",
            "You make my heart skip beats and my soul dance with joy 💃",
            "I love how we can be silly together and still feel so connected 🤪",
            "You are the missing piece that made my life complete 🧩",
            "Every love song reminds me of you and our beautiful story 🎵",
            "Your hugs feel like coming home after a long journey 🤗",
            "I choose you, in every lifetime, in every universe 🌌",
            "You turn ordinary moments into extraordinary memories ✨",
            "My love for you grows stronger with each sunrise 🌅",
            "You are the poetry my heart has been trying to write 📝",
            "In a world full of chaos, you are my peace 🕊️",
            "Your love is the magic that makes everything possible ✨",
            "Every heartbeat whispers your name 💓",
            "You are my favorite notification, my sweetest distraction 📱",
            "With you, I've learned that home isn't a place, it's a person 🏡",
            "You make ordinary days feel like fairy tales 🧚‍♀️",
            "Your love is the soundtrack to my life's most beautiful moments 🎶",
            "In your arms, I've found my safe haven and my greatest adventure 🌊",
            "You are the reason I believe in magic and miracles 🌟"
        ];

        this.photos = [
            { 
                src: 'Anita/ph1.jpg', 
                alt: 'Our beautiful sunset moment',
                caption: 'Remember this magical evening? 🌅'
            },
            { 
                src: 'Anita/ph2.jpg', 
                alt: 'Your adorable silly face',
                caption: 'This face always makes me smile! 😄'
            },
            { 
                src: 'Anita/ph3.jpg', 
                alt: 'Our mountain adventure',
                caption: 'Adventure buddies for life! 🏔️'
            },
            { 
                src: 'Anita/ph4.jpg', 
                alt: 'Another precious memory together',
                caption: 'Every moment with you is a treasure! 💎'
            },
            { 
                src: 'Anita/ph5.jpg', 
                alt: 'Our sweet romantic moment',
                caption: 'Love captured in a perfect frame! 📸💕'
            },
            { 
                src: 'Anita/ph6.jpg', 
                alt: 'Beautiful memories we created',
                caption: 'This is what happiness looks like! ✨😊'
            }
        ];

        this.playlist = [
            { title: "Perfect", artist: "Ed Sheeran", mood: "romantic" },
            { title: "All of Me", artist: "John Legend", mood: "romantic" },
            { title: "Thinking Out Loud", artist: "Ed Sheeran", mood: "sweet" },
            { title: "A Thousand Years", artist: "Christina Perri", mood: "eternal" },
            { title: "Make You Feel My Love", artist: "Adele", mood: "deep" }
        ];

        this.init();
    }

    init() {
        this.bindElements();
        this.setupEventListeners();
        this.initializeParticleSystem();
        this.populateGallery();
        this.populateTimeline();
        this.populateScrapbook();
        this.populateAchievements();
        this.populatePlaylist();
        this.populateVoiceNotes();
        this.populateDreams();
        this.populateReminders();
        this.populateAnalytics();
        this.initializeWeather();
        this.initialize3DHeart();
        this.initializeLoveMap();
        this.populateAIArt();
        this.updateCounters();
        this.checkAchievements();
        this.startAnimations();
        
        // Show welcome message after a delay
        setTimeout(() => this.showNewMessage(), 1500);
    }

    bindElements() {
        // Heart elements
        this.heart = document.getElementById('heart');
        this.heartWrapper = document.getElementById('heartWrapper');
        this.heartPulse = document.querySelector('.heart-pulse');

        // Message elements
        this.messageDisplay = document.getElementById('message-display');
        this.messageText = document.querySelector('.message-text');
        this.newMessageBtn = document.getElementById('new-message-btn');

        // Gallery elements
        this.galleryMainImage = document.getElementById('gallery-main-image');
        this.galleryThumbnails = document.getElementById('gallery-thumbnails');
        this.prevImageBtn = document.getElementById('prevImage');
        this.nextImageBtn = document.getElementById('nextImage');

        // Counter elements
        this.daysCount = document.getElementById('daysCount');
        this.messagesCount = document.getElementById('messagesCount');
        this.photosCount = document.getElementById('photosCount');

        // Control elements
        this.musicToggle = document.getElementById('musicToggle');
        this.particlesToggle = document.getElementById('particlesToggle');
        this.shareApp = document.getElementById('shareApp');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.themeOptions = document.querySelectorAll('.theme-option');

        // Game elements
        this.gameCards = document.querySelectorAll('.game-card');
        this.gameModal = document.getElementById('gameModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');

        // Timeline elements
        this.timelineContainer = document.getElementById('timelineContainer');
        this.addMilestoneBtn = document.getElementById('addMilestone');
        this.milestoneModal = document.getElementById('milestoneModal');
        this.milestoneForm = document.getElementById('milestoneForm');

        // Scrapbook elements
        this.scrapbookGrid = document.getElementById('scrapbookGrid');
        this.addMemoryBtn = document.getElementById('addMemory');
        this.exportScrapbookBtn = document.getElementById('exportScrapbook');
        this.memoryModal = document.getElementById('memoryModal');
        this.memoryForm = document.getElementById('memoryForm');

        // Achievement elements
        this.achievementsGrid = document.getElementById('achievementsGrid');

        // Media elements
        this.mediaTabs = document.querySelectorAll('.media-tab');
        this.mediaPanels = document.querySelectorAll('.media-panel');
        this.playlistContainer = document.getElementById('playlistContainer');
        this.recordVoiceBtn = document.getElementById('recordVoice');
        this.voiceNotesContainer = document.getElementById('voiceNotes');

        // AI Oracle elements
        this.askOracleBtn = document.getElementById('askOracle');
        this.relationshipInsightsBtn = document.getElementById('relationshipInsights');
        this.oraclePrediction = document.getElementById('oraclePrediction');
        this.crystalCore = document.querySelector('.crystal-core');

        // Date Planner elements
        this.weatherWidget = document.getElementById('weatherWidget');
        this.dateSuggestions = document.getElementById('dateSuggestions');
        this.generateDateIdeaBtn = document.getElementById('generateDateIdea');

        // 3D Heart elements
        this.heart3DCanvas = document.getElementById('heart3DCanvas');
        this.heart3DAnimateBtn = document.getElementById('heart3DAnimate');
        this.heart3DColorBtn = document.getElementById('heart3DColor');

        // Love Map elements
        this.loveMap = document.getElementById('loveMap');
        this.addLocationBtn = document.getElementById('addLocation');
        this.viewJourneyBtn = document.getElementById('viewJourney');

        // Analytics elements
        this.loveScore = document.getElementById('loveScore');
        this.messageAnalytics = document.getElementById('messageAnalytics');
        this.goalsCompleted = document.getElementById('goalsCompleted');
        this.moodScore = document.getElementById('moodScore');
        this.moodChart = document.getElementById('moodChart');

        // Dream Journal elements
        this.dreamText = document.getElementById('dreamText');
        this.dreamMood = document.getElementById('dreamMood');
        this.saveDreamBtn = document.getElementById('saveDream');
        this.dreamsList = document.getElementById('dreamsList');

        // Reminders elements
        this.upcomingEvents = document.getElementById('upcomingEvents');
        this.addReminderBtn = document.getElementById('addReminder');
        this.viewCalendarBtn = document.getElementById('viewCalendar');

        // AI Art elements
        this.artPrompt = document.getElementById('artPrompt');
        this.generateArtBtn = document.getElementById('generateArt');
        this.aiArtGallery = document.getElementById('aiArtGallery');

        // Modal elements
        this.modalCloses = document.querySelectorAll('.modal-close');

        // Particle canvas
        this.particleCanvas = document.getElementById('particleCanvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
    }

    setupEventListeners() {
        // Heart interactions
        this.heartWrapper.addEventListener('click', () => this.heartClick());

        // Message button
        this.newMessageBtn.addEventListener('click', () => this.showNewMessage());

        // Gallery navigation
        this.prevImageBtn?.addEventListener('click', () => this.previousImage());
        this.nextImageBtn?.addEventListener('click', () => this.nextImage());

        // Control buttons
        this.musicToggle.addEventListener('click', () => this.toggleMusic());
        this.particlesToggle?.addEventListener('click', () => this.toggleParticles());
        this.shareApp?.addEventListener('click', () => this.shareApplication());

        // Theme switching
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => this.switchTheme(option.dataset.theme));
        });

        // Game cards
        this.gameCards.forEach(card => {
            card.addEventListener('click', () => this.openGame(card.id));
        });

        // Timeline
        this.addMilestoneBtn?.addEventListener('click', () => this.openMilestoneModal());
        this.milestoneForm?.addEventListener('submit', (e) => this.addMilestone(e));

        // Scrapbook
        this.addMemoryBtn?.addEventListener('click', () => this.openMemoryModal());
        this.exportScrapbookBtn?.addEventListener('click', () => this.exportScrapbook());
        this.memoryForm?.addEventListener('submit', (e) => this.addMemory(e));

        // Media tabs
        this.mediaTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchMediaTab(tab.dataset.tab));
        });

        // Voice recording
        this.recordVoiceBtn?.addEventListener('click', () => this.toggleVoiceRecording());

        // AI Oracle
        this.askOracleBtn?.addEventListener('click', () => this.askOracle());
        this.relationshipInsightsBtn?.addEventListener('click', () => this.showRelationshipInsights());
        this.crystalCore?.addEventListener('click', () => this.askOracle());

        // Date Planner
        this.generateDateIdeaBtn?.addEventListener('click', () => this.generateDateIdea());

        // 3D Heart
        this.heart3DAnimateBtn?.addEventListener('click', () => this.toggle3DHeartAnimation());
        this.heart3DColorBtn?.addEventListener('click', () => this.change3DHeartColor());

        // Love Map
        this.addLocationBtn?.addEventListener('click', () => this.addLoveLocation());
        this.viewJourneyBtn?.addEventListener('click', () => this.viewLoveJourney());

        // Dream Journal
        this.saveDreamBtn?.addEventListener('click', () => this.saveDream());

        // Reminders
        this.addReminderBtn?.addEventListener('click', () => this.addReminder());
        this.viewCalendarBtn?.addEventListener('click', () => this.viewCalendar());

        // AI Art
        this.generateArtBtn?.addEventListener('click', () => this.generateAIArt());
        this.artPrompt?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generateAIArt();
        });

        // Modal closes
        this.modalCloses.forEach(close => {
            close.addEventListener('click', () => this.closeModals());
        });

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Window resize for particle canvas
        window.addEventListener('resize', () => this.resizeParticleCanvas());

        // Button ripple effects
        document.querySelectorAll('.modern-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    // ===== DATA MANAGEMENT =====

    saveData(key, data) {
        localStorage.setItem(`anita-app-${key}`, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(`anita-app-${key}`);
        return data ? JSON.parse(data) : null;
    }

    getDefaultMilestones() {
        return [
            {
                id: 1,
                date: '2024-01-01',
                title: 'The Day We Met',
                description: 'The beginning of our beautiful journey together.',
                icon: '💕'
            },
            {
                id: 2,
                date: '2024-02-14',
                title: 'Our First Valentine\'s Day',
                description: 'A day filled with love, laughter, and sweet memories.',
                icon: '🌹'
            },
            {
                id: 3,
                date: '2024-06-15',
                title: 'Our First Adventure',
                description: 'Exploring the world together, hand in hand.',
                icon: '✈️'
            }
        ];
    }

    getDefaultAchievements() {
        return [
            {
                id: 'first_message',
                title: 'First Sweet Message',
                description: 'Read your first love message',
                icon: '💌',
                unlocked: false,
                progress: 0,
                target: 1
            },
            {
                id: 'message_lover',
                title: 'Message Lover',
                description: 'Read 10 sweet messages',
                icon: '💕',
                unlocked: false,
                progress: 0,
                target: 10
            },
            {
                id: 'heart_clicker',
                title: 'Heart Clicker',
                description: 'Click the heart 25 times',
                icon: '❤️',
                unlocked: false,
                progress: 0,
                target: 25
            },
            {
                id: 'memory_keeper',
                title: 'Memory Keeper',
                description: 'Add your first memory',
                icon: '📝',
                unlocked: false,
                progress: 0,
                target: 1
            },
            {
                id: 'theme_explorer',
                title: 'Theme Explorer',
                description: 'Try all color themes',
                icon: '🎨',
                unlocked: false,
                progress: 0,
                target: 4
            },
            {
                id: 'music_lover',
                title: 'Music Lover',
                description: 'Listen to background music',
                icon: '🎵',
                unlocked: false,
                progress: 0,
                target: 1
            }
        ];
    }

    getDefaultReminders() {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        return [
            {
                id: 1,
                title: 'Plan a surprise date',
                date: nextWeek.toISOString().split('T')[0],
                type: 'romantic',
                icon: '💕'
            },
            {
                id: 2,
                title: 'Monthly relationship check-in',
                date: nextMonth.toISOString().split('T')[0],
                type: 'milestone',
                icon: '📅'
            }
        ];
    }

    // ===== AI ORACLE SYSTEM =====

    askOracle() {
        const predictionElement = this.oraclePrediction.querySelector('.prediction-text');
        
        // Crystal animation
        this.crystalCore.style.transform = 'scale(1.2)';
        this.crystalCore.style.filter = 'drop-shadow(0 0 30px var(--accent-color))';
        
        // Show loading state
        predictionElement.innerHTML = 'The Oracle is consulting the stars... ✨';
        
        setTimeout(() => {
            // Reset crystal
            this.crystalCore.style.transform = 'scale(1)';
            this.crystalCore.style.filter = 'none';
            
            // Show prediction
            const randomPrediction = this.oraclePredictions[Math.floor(Math.random() * this.oraclePredictions.length)];
            this.typeWriter(predictionElement, randomPrediction, 0);
            
            // Add sparkle effect
            this.createSparkles(this.oraclePrediction);
            
        }, 2000);
    }

    showRelationshipInsights() {
        const insights = this.generateRelationshipInsights();
        const predictionElement = this.oraclePrediction.querySelector('.prediction-text');
        
        predictionElement.innerHTML = insights;
        this.createSparkles(this.oraclePrediction);
    }

    generateRelationshipInsights() {
        const daysTogether = this.calculateDaysTogether();
        const messagesRead = this.messagesShown;
        const memoriesCreated = this.memories.length;
        
        let insight = `📊 <strong>Relationship Analytics:</strong><br><br>`;
        insight += `💕 You've been together for ${daysTogether} beautiful days<br>`;
        insight += `💌 You've shared ${messagesRead} sweet messages<br>`;
        insight += `📝 You've created ${memoriesCreated} precious memories<br><br>`;
        
        if (daysTogether > 100) {
            insight += `🌟 Your love has grown stronger over ${Math.floor(daysTogether/30)} months together!`;
        } else {
            insight += `🌱 Your love story is just beginning - so many adventures await!`;
        }
        
        return insight;
    }

    // ===== SMART DATE PLANNER =====

    initializeWeather() {
        // Simulate weather data (in real app, you'd use a weather API)
        this.weatherData = {
            temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
            condition: ['sunny', 'rainy', 'cloudy'][Math.floor(Math.random() * 3)],
            description: 'Perfect for romance'
        };
        
        this.updateWeatherWidget();
        this.generateDateIdea();
    }

    updateWeatherWidget() {
        if (!this.weatherWidget) return;
        
        const weatherIcon = this.weatherWidget.querySelector('.weather-icon');
        const weatherTemp = this.weatherWidget.querySelector('.weather-temp');
        const weatherDesc = this.weatherWidget.querySelector('.weather-desc');
        
        const icons = {
            sunny: '☀️',
            rainy: '🌧️',
            cloudy: '☁️'
        };
        
        weatherIcon.textContent = icons[this.weatherData.condition];
        weatherTemp.textContent = `${this.weatherData.temperature}°C`;
        weatherDesc.textContent = this.weatherData.description;
    }

    generateDateIdea() {
        if (!this.dateSuggestions) return;
        
        const ideas = this.dateIdeas[this.weatherData.condition];
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        
        this.dateSuggestions.innerHTML = `
            <div class="date-suggestion">
                <div class="suggestion-icon">${randomIdea.icon}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${randomIdea.title}</div>
                    <div class="suggestion-description">${randomIdea.description}</div>
                </div>
            </div>
        `;
        
        // Add click animation
        const suggestion = this.dateSuggestions.querySelector('.date-suggestion');
        suggestion.addEventListener('click', () => {
            this.showNotification(`Great choice! "${randomIdea.title}" sounds perfect! 💕`);
        });
    }

    // ===== 3D HEART VISUALIZATION =====

    initialize3DHeart() {
        if (!this.heart3DCanvas) return;
        
        // Simple 3D heart simulation with CSS transforms
        this.heart3DCanvas.style.background = `
            radial-gradient(circle at 30% 30%, rgba(255, 107, 157, 0.8), transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 182, 193, 0.6), transparent 50%),
            linear-gradient(135deg, #667eea, #764ba2)
        `;
        
        // Add floating hearts
        this.create3DHeartEffect();
    }

    create3DHeartEffect() {
        const canvas = this.heart3DCanvas;
        const hearts = ['💖', '💕', '💗', '💘'];
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 20}px;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                animation: float3D ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 1;
            `;
            canvas.style.position = 'relative';
            canvas.appendChild(heart);
        }
        
        // Add CSS animation
        if (!document.getElementById('heart3d-styles')) {
            const styles = document.createElement('style');
            styles.id = 'heart3d-styles';
            styles.textContent = `
                @keyframes float3D {
                    0%, 100% { transform: translateY(0px) scale(1) rotateY(0deg); opacity: 0.7; }
                    50% { transform: translateY(-20px) scale(1.1) rotateY(180deg); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    toggle3DHeartAnimation() {
        this.heart3DAnimating = !this.heart3DAnimating;
        const btn = this.heart3DAnimateBtn;
        
        if (this.heart3DAnimating) {
            btn.classList.add('active');
            btn.querySelector('.control-label').textContent = 'Stop';
            this.start3DAnimation();
        } else {
            btn.classList.remove('active');
            btn.querySelector('.control-label').textContent = 'Animate';
            this.stop3DAnimation();
        }
    }

    start3DAnimation() {
        const hearts = this.heart3DCanvas.querySelectorAll('div');
        hearts.forEach(heart => {
            heart.style.animationPlayState = 'running';
        });
    }

    stop3DAnimation() {
        const hearts = this.heart3DCanvas.querySelectorAll('div');
        hearts.forEach(heart => {
            heart.style.animationPlayState = 'paused';
        });
    }

    change3DHeartColor() {
        const colors = [
            'linear-gradient(135deg, #ff9a9e, #fecfef)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #11998e, #38ef7d)',
            'linear-gradient(135deg, #8360c3, #2ebf91)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.heart3DCanvas.style.background = `
            radial-gradient(circle at 30% 30%, rgba(255, 107, 157, 0.8), transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 182, 193, 0.6), transparent 50%),
            ${randomColor}
        `;
        
        this.showNotification('3D Heart color changed! ✨');
    }

    // ===== LOVE MAP SYSTEM =====

    initializeLoveMap() {
        if (!this.loveMap) return;
        
        if (this.loveLocations.length > 0) {
            this.renderLoveMap();
        }
    }

    addLoveLocation() {
        const location = prompt('Enter a special location name:');
        if (!location) return;
        
        const description = prompt('What makes this place special?');
        const newLocation = {
            id: Date.now(),
            name: location,
            description: description || 'A special place in our love story',
            date: new Date().toISOString().split('T')[0],
            coordinates: {
                lat: Math.random() * 180 - 90,
                lng: Math.random() * 360 - 180
            }
        };
        
        this.loveLocations.push(newLocation);
        this.saveData('loveLocations', this.loveLocations);
        this.renderLoveMap();
        
        this.showNotification(`Added "${location}" to your love map! 📍`);
    }

    renderLoveMap() {
        if (!this.loveMap) return;
        
        this.loveMap.innerHTML = `
            <div class="love-map-content">
                <h3>Your Love Journey</h3>
                <div class="map-locations">
                    ${this.loveLocations.map(location => `
                        <div class="map-location" title="${location.description}">
                            <div class="location-marker">📍</div>
                            <div class="location-name">${location.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add CSS for map locations
        if (!document.getElementById('map-styles')) {
            const styles = document.createElement('style');
            styles.id = 'map-styles';
            styles.textContent = `
                .love-map-content {
                    text-align: center;
                    padding: 20px;
                }
                .map-locations {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 20px;
                }
                .map-location {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 10px;
                    padding: 10px 15px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .map-location:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                .location-marker {
                    font-size: 1.2rem;
                }
                .location-name {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }
            `;
            document.head.appendChild(styles);
        }
    }

    viewLoveJourney() {
        if (this.loveLocations.length === 0) {
            this.showNotification('Add some locations first to view your journey! 📍');
            return;
        }
        
        const journeyText = this.loveLocations
            .map(location => `📍 ${location.name} - ${location.description}`)
            .join('\n');
            
        alert(`Your Love Journey:\n\n${journeyText}`);
    }

    // ===== ANALYTICS SYSTEM =====

    populateAnalytics() {
        if (!this.loveScore) return;
        
        // Calculate love score based on activity
        const baseScore = 85;
        const messageBonus = Math.min(this.messagesShown * 2, 10);
        const memoryBonus = Math.min(this.memories.length * 3, 15);
        const totalScore = Math.min(baseScore + messageBonus + memoryBonus, 100);
        
        this.animateNumber(this.loveScore, 0, totalScore, '%');
        this.animateNumber(this.messageAnalytics, 0, this.messagesShown);
        
        // Update mood score
        const moods = ['Blissful', 'Joyful', 'Content', 'Excited', 'Peaceful'];
        this.moodScore.textContent = moods[Math.floor(Math.random() * moods.length)];
        
        // Draw mood chart
        this.drawMoodChart();
    }

    drawMoodChart() {
        if (!this.moodChart) return;
        
        const ctx = this.moodChart.getContext('2d');
        const width = this.moodChart.width;
        const height = this.moodChart.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Generate sample mood data
        const data = Array.from({length: 7}, () => Math.random() * 80 + 20);
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // Draw chart
        ctx.strokeStyle = '#ff6b9d';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * (width - 40) + 20;
            const y = height - (value / 100) * (height - 40) - 20;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Draw points
            ctx.fillStyle = '#ff6b9d';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        days.forEach((day, index) => {
            const x = (index / (days.length - 1)) * (width - 40) + 20;
            ctx.fillText(day, x, height - 5);
        });
    }

    // ===== DREAM JOURNAL SYSTEM =====

    populateDreams() {
        if (!this.dreamsList) return;
        
        this.dreamsList.innerHTML = '';
        
        this.dreams.forEach(dream => {
            const dreamItem = document.createElement('div');
            dreamItem.className = 'dream-item';
            dreamItem.innerHTML = `
                <div class="dream-date">${this.formatDate(dream.date)}</div>
                <div class="dream-content">${dream.content}</div>
                <div class="dream-mood-tag">${this.getMoodEmoji(dream.mood)} ${dream.mood}</div>
            `;
            this.dreamsList.appendChild(dreamItem);
        });
        
        if (this.dreams.length === 0) {
            this.dreamsList.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 2rem; margin-bottom: 10px;">💭</div>
                    <p>No dreams shared yet. Share your first dream about your future together!</p>
                </div>
            `;
        }
    }

    saveDream() {
        const content = this.dreamText.value.trim();
        const mood = this.dreamMood.value;
        
        if (!content) {
            this.showNotification('Please write your dream first! 💭');
            return;
        }
        
        const dream = {
            id: Date.now(),
            content: content,
            mood: mood,
            date: new Date().toISOString()
        };
        
        this.dreams.push(dream);
        this.saveData('dreams', this.dreams);
        this.populateDreams();
        
        // Clear form
        this.dreamText.value = '';
        
        this.showNotification('Dream saved! May it come true! ✨');
    }

    // ===== REMINDERS SYSTEM =====

    populateReminders() {
        if (!this.upcomingEvents) return;
        
        this.upcomingEvents.innerHTML = '';
        
        // Sort reminders by date
        const sortedReminders = this.reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        sortedReminders.forEach(reminder => {
            const eventItem = document.createElement('div');
            const reminderDate = new Date(reminder.date);
            const today = new Date();
            const daysUntil = Math.ceil((reminderDate - today) / (1000 * 60 * 60 * 24));
            
            let className = 'event-item';
            if (daysUntil <= 3) className += ' urgent';
            else if (daysUntil <= 7) className += ' upcoming';
            
            eventItem.className = className;
            eventItem.innerHTML = `
                <div class="event-icon">${reminder.icon}</div>
                <div class="event-content">
                    <div class="event-title">${reminder.title}</div>
                    <div class="event-date">
                        ${daysUntil > 0 ? `In ${daysUntil} days` : daysUntil === 0 ? 'Today!' : 'Past due'}
                    </div>
                </div>
            `;
            this.upcomingEvents.appendChild(eventItem);
        });
        
        if (this.reminders.length === 0) {
            this.upcomingEvents.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 2rem; margin-bottom: 10px;">⏰</div>
                    <p>No reminders set. Add some to never miss special moments!</p>
                </div>
            `;
        }
    }

    addReminder() {
        const title = prompt('What would you like to be reminded about?');
        if (!title) return;
        
        const date = prompt('Enter the date (YYYY-MM-DD):');
        if (!date) return;
        
        const reminder = {
            id: Date.now(),
            title: title,
            date: date,
            type: 'custom',
            icon: '⏰'
        };
        
        this.reminders.push(reminder);
        this.saveData('reminders', this.reminders);
        this.populateReminders();
        
        this.showNotification(`Reminder set for "${title}"! ⏰`);
    }

    viewCalendar() {
        const calendarData = this.reminders
            .map(reminder => `${reminder.date}: ${reminder.title}`)
            .join('\n');
            
        if (calendarData) {
            alert(`Your Upcoming Reminders:\n\n${calendarData}`);
        } else {
            alert('No reminders set yet!');
        }
    }

    // ===== AI ART GENERATOR =====

    populateAIArt() {
        if (!this.aiArtGallery) return;
        
        this.aiArtGallery.innerHTML = '';
        
        this.aiArtworks.forEach(artwork => {
            const artItem = document.createElement('div');
            artItem.className = 'ai-art-item';
            artItem.innerHTML = `
                <div class="ai-art-placeholder">🎨</div>
                <div class="ai-art-title">${artwork.title}</div>
            `;
            this.aiArtGallery.appendChild(artItem);
        });
        
        if (this.aiArtworks.length === 0) {
            this.aiArtGallery.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🎨</div>
                    <p>No AI art generated yet. Describe romantic art to create!</p>
                </div>
            `;
        }
    }

    generateAIArt() {
        const prompt = this.artPrompt.value.trim();
        if (!prompt) {
            this.showNotification('Please describe the art you want to create! 🎨');
            return;
        }
        
        // Simulate AI art generation
        const artwork = {
            id: Date.now(),
            title: prompt,
            prompt: prompt,
            createdAt: new Date().toISOString()
        };
        
        this.aiArtworks.push(artwork);
        this.saveData('aiArtworks', this.aiArtworks);
        this.populateAIArt();
        
        // Clear prompt
        this.artPrompt.value = '';
        
        this.showNotification(`AI art "${prompt}" created! 🎨✨`);
    }

    // ===== HEART INTERACTIONS =====

    heartClick() {
        // Heart beat animation
        this.heart.classList.add('beat');
        setTimeout(() => this.heart.classList.remove('beat'), 600);

        // Pulse effect
        this.heartPulse.classList.add('active');
        setTimeout(() => this.heartPulse.classList.remove('active'), 1000);

        // Enhanced confetti
        this.createEnhancedConfetti();

        // Sound effect
        this.playHeartSound();

        // Particle burst
        if (this.particlesEnabled) {
            this.createParticleBurst();
        }

        // Update achievement
        this.updateAchievement('heart_clicker', 1);
    }

    // ===== MESSAGE SYSTEM =====

    showNewMessage() {
        const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
        const message = this.loveMessages[randomIndex];
        
        // Update counter
        this.messagesShown++;
        this.updateMessageCounter();

        // Clear current message
        this.messageText.innerHTML = '';
        
        // Typewriter effect
        this.typeWriter(this.messageText, message, 0);
        
        // Sparkle effect
        setTimeout(() => this.createSparkles(this.messageDisplay), 500);

        // Button feedback
        this.newMessageBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.newMessageBtn.style.transform = 'scale(1)';
        }, 150);

        // Update achievements
        this.updateAchievement('first_message', 1);
        this.updateAchievement('message_lover', 1);
    }

    typeWriter(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => this.typeWriter(element, text, index + 1), 30);
        }
    }

    // ===== ENHANCED GALLERY SYSTEM =====

    populateGallery() {
        if (this.photos.length === 0) return;

        this.galleryThumbnails.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo.src;
            thumb.alt = photo.alt;
            thumb.classList.add('gallery-thumb');
            
            if (index === 0) {
                thumb.classList.add('active');
            }

            // Add hover effect for thumbnails
            thumb.addEventListener('mouseenter', () => {
                thumb.style.transform = 'scale(1.1)';
                thumb.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            });
            
            thumb.addEventListener('mouseleave', () => {
                if (!thumb.classList.contains('active')) {
                    thumb.style.transform = 'scale(1)';
                    thumb.style.boxShadow = 'none';
                }
            });

            thumb.addEventListener('click', () => this.selectImage(index));
            this.galleryThumbnails.appendChild(thumb);
        });

        // Set initial image
        this.selectImage(0);
        
        // Add gallery counter
        this.addGalleryCounter();
    }

    addGalleryCounter() {
        // Remove existing counter if any
        const existingCounter = document.querySelector('.gallery-counter');
        if (existingCounter) {
            existingCounter.remove();
        }

        // Add new counter
        const counter = document.createElement('div');
        counter.className = 'gallery-counter';
        counter.innerHTML = `
            <span class="current-photo">1</span> / <span class="total-photos">${this.photos.length}</span>
        `;
        counter.style.cssText = `
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            z-index: 10;
        `;

        const imageFrame = document.querySelector('.image-frame');
        imageFrame.style.position = 'relative';
        imageFrame.appendChild(counter);
    }

    selectImage(index) {
        this.currentPhotoIndex = index;
        const photo = this.photos[index];

        // Fade out current image
        this.galleryMainImage.style.opacity = '0';
        
        setTimeout(() => {
            this.galleryMainImage.src = photo.src;
            this.galleryMainImage.alt = photo.alt;
            this.galleryMainImage.style.opacity = '1';
        }, 200);

        // Update active thumbnail
        document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
            if (i === index) {
                thumb.style.transform = 'scale(1.1)';
                thumb.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            } else {
                thumb.style.transform = 'scale(1)';
                thumb.style.boxShadow = 'none';
            }
        });

        // Update gallery counter
        const currentPhotoSpan = document.querySelector('.current-photo');
        if (currentPhotoSpan) {
            currentPhotoSpan.textContent = index + 1;
        }

        // Show caption
        this.showPhotoCaption(photo.caption);
        
        // Add selection effect
        this.createImageSelectionEffect();
    }

    createImageSelectionEffect() {
        // Create a subtle sparkle effect when selecting images
        const imageFrame = document.querySelector('.image-frame');
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                animation: imageSparkle 1s ease-out forwards;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                z-index: 5;
            `;
            
            imageFrame.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
        
        // Add CSS animation if not exists
        if (!document.getElementById('image-sparkle-styles')) {
            const styles = document.createElement('style');
            styles.id = 'image-sparkle-styles';
            styles.textContent = `
                @keyframes imageSparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    previousImage() {
        const newIndex = this.currentPhotoIndex > 0 ? 
            this.currentPhotoIndex - 1 : 
            this.photos.length - 1;
        this.selectImage(newIndex);
    }

    nextImage() {
        const newIndex = this.currentPhotoIndex < this.photos.length - 1 ? 
            this.currentPhotoIndex + 1 : 
            0;
        this.selectImage(newIndex);
    }

    showPhotoCaption(caption) {
        // Remove existing caption
        const existingCaption = document.querySelector('.photo-caption');
        if (existingCaption) {
            existingCaption.remove();
        }

        // Create new caption
        const captionDiv = document.createElement('div');
        captionDiv.className = 'photo-caption';
        captionDiv.textContent = caption;
        captionDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        `;

        const imageFrame = document.querySelector('.image-frame');
        imageFrame.appendChild(captionDiv);

        // Animate in
        setTimeout(() => {
            captionDiv.style.opacity = '1';
            captionDiv.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 100);

        // Animate out
        setTimeout(() => {
            captionDiv.style.opacity = '0';
            captionDiv.style.transform = 'translateX(-50%) translateY(0px)';
            setTimeout(() => captionDiv.remove(), 300);
        }, 3000);
    }

    // ===== GAMES SYSTEM =====

    openGame(gameId) {
        this.gameModal.classList.add('show');
        
        switch(gameId) {
            case 'memoryGame':
                this.modalTitle.textContent = 'Memory Match Game';
                this.modalBody.innerHTML = this.createMemoryGameHTML();
                this.initMemoryGame();
                break;
            case 'loveQuiz':
                this.modalTitle.textContent = 'Love Quiz';
                this.modalBody.innerHTML = this.createLoveQuizHTML();
                this.initLoveQuiz();
                break;
            case 'wishingWell':
                this.modalTitle.textContent = 'Wishing Well';
                this.modalBody.innerHTML = this.createWishingWellHTML();
                this.initWishingWell();
                break;
        }
    }

    createMemoryGameHTML() {
        return `
            <div class="memory-game-board" id="memoryBoard">
                <div class="game-instructions">
                    <p>Match the pairs of love symbols! Click two cards to flip them.</p>
                    <div class="game-stats">
                        <span>Moves: <strong id="moveCount">0</strong></span>
                        <span>Matches: <strong id="matchCount">0</strong></span>
                    </div>
                </div>
                <div class="memory-cards" id="memoryCards">
                    <!-- Cards will be generated by JavaScript -->
                </div>
            </div>
        `;
    }

    createLoveQuizHTML() {
        return `
            <div class="love-quiz" id="loveQuiz">
                <div class="quiz-question" id="quizQuestion">
                    <h4>How well do you know our relationship?</h4>
                    <p id="questionText">Click "Start Quiz" to begin!</p>
                </div>
                <div class="quiz-options" id="quizOptions">
                    <button class="quiz-btn" onclick="app.startQuiz()">Start Quiz</button>
                </div>
                <div class="quiz-score" id="quizScore" style="display: none;">
                    Score: <span id="currentScore">0</span>/5
                </div>
            </div>
        `;
    }

    createWishingWellHTML() {
        return `
            <div class="wishing-well">
                <div class="well-animation">
                    <div class="well">🌟</div>
                    <div class="sparkles">✨✨✨</div>
                </div>
                <div class="wish-form">
                    <h4>Make a wish for our future together...</h4>
                    <textarea id="wishText" placeholder="I wish for us..." rows="4"></textarea>
                    <button class="modern-btn" onclick="app.makeWish()">
                        <span class="btn-text">Cast Your Wish</span>
                        <div class="btn-ripple"></div>
                    </button>
                </div>
                <div class="wishes-list" id="wishesList">
                    <!-- Previous wishes will appear here -->
                </div>
            </div>
        `;
    }

    initMemoryGame() {
        const symbols = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        
        const cardsContainer = document.getElementById('memoryCards');
        cardsContainer.innerHTML = '';
        
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.innerHTML = `
                <div class="card-front">❓</div>
                <div class="card-back">${symbol}</div>
            `;
            card.addEventListener('click', () => this.flipCard(card));
            cardsContainer.appendChild(card);
        });

        // Add CSS for memory game
        const gameStyles = `
            <style>
                .memory-cards {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-top: 20px;
                }
                .memory-card {
                    aspect-ratio: 1;
                    background: var(--glass-bg);
                    border-radius: 10px;
                    cursor: pointer;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.3s;
                }
                .memory-card.flipped {
                    transform: rotateY(180deg);
                }
                .card-front, .card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    border-radius: 10px;
                    backface-visibility: hidden;
                }
                .card-back {
                    transform: rotateY(180deg);
                    background: linear-gradient(135deg, var(--accent-color), var(--heart-color));
                    color: white;
                }
                .game-instructions {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .game-stats {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', gameStyles);
    }

    flipCard(card) {
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        
        const flippedCards = document.querySelectorAll('.memory-card.flipped:not(.matched)');
        
        if (flippedCards.length === 2) {
            const moveCount = document.getElementById('moveCount');
            moveCount.textContent = parseInt(moveCount.textContent) + 1;
            
            setTimeout(() => {
                if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                    flippedCards.forEach(c => c.classList.add('matched'));
                    const matchCount = document.getElementById('matchCount');
                    matchCount.textContent = parseInt(matchCount.textContent) + 1;
                    
                    if (document.querySelectorAll('.memory-card.matched').length === 16) {
                        setTimeout(() => {
                            alert('Congratulations! You matched all the love symbols! 💕');
                            this.closeModals();
                        }, 500);
                    }
                } else {
                    flippedCards.forEach(c => c.classList.remove('flipped'));
                }
            }, 1000);
        }
    }

    // ===== TIMELINE SYSTEM =====

    populateTimeline() {
        if (!this.timelineContainer) return;
        
        this.timelineContainer.innerHTML = '<div class="timeline-line"></div>';
        
        this.milestones.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        this.milestones.forEach((milestone, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${this.formatDate(milestone.date)}</div>
                    <div class="timeline-title">${milestone.title}</div>
                    <div class="timeline-description">${milestone.description}</div>
                </div>
                <div class="timeline-icon">${milestone.icon}</div>
            `;
            this.timelineContainer.appendChild(timelineItem);
        });
    }

    openMilestoneModal() {
        this.milestoneModal.classList.add('show');
    }

    addMilestone(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const milestone = {
            id: Date.now(),
            date: document.getElementById('milestoneDate').value,
            title: document.getElementById('milestoneTitle').value,
            description: document.getElementById('milestoneDescription').value,
            icon: document.getElementById('milestoneIcon').value
        };
        
        this.milestones.push(milestone);
        this.saveData('milestones', this.milestones);
        this.populateTimeline();
        this.closeModals();
        
        // Reset form
        e.target.reset();
        
        // Show success message
        this.showNotification('Milestone added successfully! 🎉');
    }

    // ===== SCRAPBOOK SYSTEM =====

    populateScrapbook() {
        if (!this.scrapbookGrid) return;
        
        this.scrapbookGrid.innerHTML = '';
        
        this.memories.forEach(memory => {
            const memoryItem = document.createElement('div');
            memoryItem.className = 'scrapbook-item';
            memoryItem.innerHTML = `
                <div class="scrapbook-date">${this.formatDate(memory.date)}</div>
                <div class="scrapbook-title">${memory.title}</div>
                <div class="scrapbook-content">${memory.description}</div>
                <div class="scrapbook-mood">${this.getMoodEmoji(memory.mood)} ${memory.mood}</div>
            `;
            this.scrapbookGrid.appendChild(memoryItem);
        });
        
        if (this.memories.length === 0) {
            this.scrapbookGrid.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📖</div>
                    <h3>Your scrapbook is waiting...</h3>
                    <p>Add your first memory to start building your digital scrapbook!</p>
                </div>
            `;
        }
    }

    openMemoryModal() {
        this.memoryModal.classList.add('show');
    }

    addMemory(e) {
        e.preventDefault();
        
        const memory = {
            id: Date.now(),
            title: document.getElementById('memoryTitle').value,
            date: document.getElementById('memoryDate').value,
            description: document.getElementById('memoryDescription').value,
            mood: document.getElementById('memoryMood').value
        };
        
        this.memories.push(memory);
        this.saveData('memories', this.memories);
        this.populateScrapbook();
        this.closeModals();
        
        // Reset form
        e.target.reset();
        
        // Update achievement
        this.updateAchievement('memory_keeper', 1);
        
        // Show success message
        this.showNotification('Memory saved to your scrapbook! 💝');
    }

    exportScrapbook() {
        const scrapbookData = {
            memories: this.memories,
            milestones: this.milestones,
            exportDate: new Date().toISOString(),
            totalDays: this.calculateDaysTogether()
        };
        
        const dataStr = JSON.stringify(scrapbookData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `anita-scrapbook-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Scrapbook exported successfully! 📤');
    }

    // ===== ACHIEVEMENTS SYSTEM =====

    populateAchievements() {
        if (!this.achievementsGrid) return;
        
        this.achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;
            
            const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100);
            
            achievementCard.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
                <div class="achievement-status">${achievement.progress}/${achievement.target}</div>
            `;
            
            this.achievementsGrid.appendChild(achievementCard);
        });
    }

    updateAchievement(achievementId, increment = 1) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement || achievement.unlocked) return;
        
        achievement.progress = Math.min(achievement.progress + increment, achievement.target);
        
        if (achievement.progress >= achievement.target && !achievement.unlocked) {
            achievement.unlocked = true;
            this.showAchievementUnlocked(achievement);
        }
        
        this.saveData('achievements', this.achievements);
        this.populateAchievements();
    }

    showAchievementUnlocked(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-popup-icon">${achievement.icon}</div>
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${achievement.title}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            background: linear-gradient(135deg, var(--accent-color), var(--heart-color));
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
        
        // Add CSS for achievement animations
        if (!document.getElementById('achievement-styles')) {
            const achievementStyles = document.createElement('style');
            achievementStyles.id = 'achievement-styles';
            achievementStyles.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .achievement-popup {
                    text-align: center;
                }
                .achievement-popup-icon {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                .achievement-popup-title {
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .achievement-popup-name {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
            `;
            document.head.appendChild(achievementStyles);
        }
    }

    // ===== MEDIA SYSTEM =====

    switchMediaTab(tabName) {
        // Update active tab
        this.mediaTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update active panel
        this.mediaPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}Panel`);
        });
    }

    populatePlaylist() {
        if (!this.playlistContainer) return;
        
        this.playlistContainer.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.innerHTML = `
                <div class="playlist-icon">
                    <i class="fas fa-music"></i>
                </div>
                <div class="playlist-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist} • ${song.mood}</p>
                </div>
            `;
            
            playlistItem.addEventListener('click', () => {
                this.showNotification(`Now playing: ${song.title} by ${song.artist} 🎵`);
            });
            
            this.playlistContainer.appendChild(playlistItem);
        });
    }

    toggleVoiceRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.recordedChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.saveVoiceNote();
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            
            this.recordVoiceBtn.classList.add('recording');
            this.recordVoiceBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Recording</span>';
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showNotification('Could not access microphone. Please check permissions.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.isRecording = false;
            
            this.recordVoiceBtn.classList.remove('recording');
            this.recordVoiceBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Record Message</span>';
        }
    }

    saveVoiceNote() {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        
        const voiceNote = {
            id: Date.now(),
            date: new Date().toISOString(),
            duration: '0:30', // Placeholder - would need actual duration calculation
            audioUrl: audioUrl
        };
        
        this.voiceNotes.push(voiceNote);
        this.saveData('voiceNotes', this.voiceNotes);
        this.populateVoiceNotes();
        
        this.showNotification('Voice note saved! 🎤');
    }

    populateVoiceNotes() {
        if (!this.voiceNotesContainer) return;
        
        this.voiceNotesContainer.innerHTML = '';
        
        this.voiceNotes.forEach(note => {
            const voiceNoteDiv = document.createElement('div');
            voiceNoteDiv.className = 'voice-note';
            voiceNoteDiv.innerHTML = `
                <button class="voice-note-play">
                    <i class="fas fa-play"></i>
                </button>
                <div class="voice-note-info">
                    <div class="voice-note-date">${this.formatDate(note.date)}</div>
                    <div class="voice-note-duration">${note.duration}</div>
                </div>
            `;
            
            const playBtn = voiceNoteDiv.querySelector('.voice-note-play');
            playBtn.addEventListener('click', () => {
                const audio = new Audio(note.audioUrl);
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                audio.onended = () => {
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                };
            });
            
            this.voiceNotesContainer.appendChild(voiceNoteDiv);
        });
        
        if (this.voiceNotes.length === 0) {
            this.voiceNotesContainer.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🎤</div>
                    <p>No voice notes yet. Record your first message!</p>
                </div>
            `;
        }
    }

    // ===== UTILITY FUNCTIONS =====

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    getMoodEmoji(mood) {
        const moodEmojis = {
            happy: '😊',
            romantic: '💕',
            excited: '🎉',
            peaceful: '😌',
            adventurous: '🌟'
        };
        return moodEmojis[mood] || '😊';
    }

    calculateDaysTogether() {
        const now = new Date();
        const diffTime = Math.abs(now - this.SPECIAL_DATE);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10001;
            animation: slideInUp 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    shareApplication() {
        if (navigator.share) {
            navigator.share({
                title: 'My Unfolding Heart - Anita PA',
                text: 'Check out this beautiful romantic web app!',
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showNotification('Link copied to clipboard! 📋');
        }
    }

    // ===== INHERITED METHODS FROM PREVIOUS VERSION =====
    // (Include all the previous methods like updateCounters, theme switching, etc.)

    updateCounters() {
        this.updateDaysCounter();
        this.updateMessageCounter();
        this.updatePhotosCounter();
    }

    updateDaysCounter() {
        const days = this.calculateDaysTogether();
        this.animateNumber(this.daysCount, parseInt(this.daysCount.textContent) || 0, days);
    }

    updateMessageCounter() {
        this.animateNumber(this.messagesCount, parseInt(this.messagesCount.textContent) || 0, this.messagesShown);
    }

    updatePhotosCounter() {
        this.animateNumber(this.photosCount, parseInt(this.photosCount.textContent) || 0, this.photos.length);
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    switchTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green', 'theme-purple');
        
        // Add new theme class (except for default pink)
        if (theme !== 'pink') {
            document.body.classList.add(`theme-${theme}`);
        }

        // Update active theme option
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Theme change effect
        this.createThemeChangeEffect();
        
        // Update achievement
        this.updateAchievement('theme_explorer', 1);
    }

    createThemeChangeEffect() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, transparent 0%, rgba(255,255,255,0.8) 100%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.style.opacity = '1', 10);
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 200);
    }

    toggleMusic() {
        const statusElement = this.musicToggle.querySelector('.control-status');
        
        if (this.musicEnabled) {
            this.backgroundMusic.pause();
            this.musicToggle.classList.remove('active');
            statusElement.textContent = 'Off';
            this.musicEnabled = false;
        } else {
            this.backgroundMusic.play().catch(e => console.log('Music play failed:', e));
            this.musicToggle.classList.add('active');
            statusElement.textContent = 'On';
            this.musicEnabled = true;
            
            // Update achievement
            this.updateAchievement('music_lover', 1);
        }
    }

    toggleParticles() {
        const statusElement = this.particlesToggle.querySelector('.control-status');
        
        this.particlesEnabled = !this.particlesEnabled;
        this.particlesToggle.classList.toggle('active', this.particlesEnabled);
        statusElement.textContent = this.particlesEnabled ? 'On' : 'Off';
    }

    // ===== PARTICLE SYSTEM =====

    initializeParticleSystem() {
        this.resizeParticleCanvas();
        this.particles = [];
        this.animateParticles();
    }

    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticleBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`
            });
        }
    }

    animateParticles() {
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vy += 0.1; // gravity
            
            if (particle.life > 0) {
                this.particleCtx.save();
                this.particleCtx.globalAlpha = particle.life;
                this.particleCtx.fillStyle = particle.color;
                this.particleCtx.beginPath();
                this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.particleCtx.fill();
                this.particleCtx.restore();
                return true;
            }
            return false;
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    // ===== EFFECTS =====

    createEnhancedConfetti() {
        const colors = ['#ff69b4', '#e04b7b', '#ffd1dc', '#ff1493', '#db7093', '#ffb6c1'];
        const shapes = ['circle', 'square', 'heart'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.classList.add('confetti', shape);
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${shape === 'circle' ? '50%' : '0'};
                pointer-events: none;
                z-index: 1000;
                animation: confetti-fall ${Math.random() * 2 + 2}s linear forwards;
            `;
            
            if (shape === 'heart') {
                confetti.innerHTML = '💖';
                confetti.style.fontSize = '12px';
                confetti.style.background = 'none';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    createSparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 16px;
                pointer-events: none;
                animation: sparkle 1.5s ease-out forwards;
                left: ${Math.random() * element.offsetWidth}px;
                top: ${Math.random() * element.offsetHeight}px;
                z-index: 100;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'scale(0)';
            
            ripple.offsetHeight; // Trigger reflow
            ripple.style.transform = 'scale(4)';
        }
    }

    playHeartSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Sound not supported');
        }
    }

    checkAchievements() {
        // Check and update achievements based on current data
        if (this.messagesShown > 0) {
            this.updateAchievement('first_message', 1);
        }
        if (this.memories.length > 0) {
            this.updateAchievement('memory_keeper', 1);
        }
    }

    startAnimations() {
        // Stagger card animations
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Update counters periodically
        setInterval(() => this.updateDaysCounter(), 3600000); // Every hour
    }
}

// ===== ADDITIONAL CSS ANIMATIONS =====

const additionalStyles = `
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideOutDown {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(50px); }
    }
    
    .confetti {
        position: fixed !important;
        z-index: 1000 !important;
        pointer-events: none !important;
    }
    
    .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-secondary);
        grid-column: 1 / -1;
    }
    
    .empty-state h3 {
        color: var(--text-primary);
        margin-bottom: 10px;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APPLICATION =====

let app; // Global reference for modal callbacks

document.addEventListener('DOMContentLoaded', () => {
    app = new FuturisticAnitaApp();
});