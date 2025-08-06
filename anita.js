document.addEventListener('DOMContentLoaded', () => {
    // --- Section 1: Heart Animation ---
    const heart = document.getElementById('heart');
    const heartWrapper = document.getElementById('heartWrapper');
    
    // Heart click animation
    heartWrapper.addEventListener('click', () => {
        heart.classList.add('beat');
        createConfetti();
        
        // Remove the beat class after animation completes
        setTimeout(() => {
            heart.classList.remove('beat');
        }, 600);
    });
    
    // --- Section 2: Message Generator ---
    const messageDisplay = document.getElementById('message-display');
    const newMessageBtn = document.getElementById('new-message-btn');

    // --- PERSONALIZATION: Add your personal memories here! ---
    const memories = [
        "Remember that time we tried to bake a cake and used salt instead of sugar? 😂",
        "Thinking about our first date and how nervous we both were.",
        "That trip to the beach where we watched the sunset was perfect.",
        "I love how we can just sit in silence and feel completely comfortable.",
        "The day we brought our pet home is one of my favorites.",
        "You have the most amazing laugh."
        // Add as many memories or compliments as you want here!
    ];

    function showNewMessage() {
        // Pick a random message from the array
        const randomIndex = Math.floor(Math.random() * memories.length);
        const randomMessage = memories[randomIndex];

        // Display the message
        messageDisplay.textContent = randomMessage;
    }

    // Add a click event listener to the button
    newMessageBtn.addEventListener('click', showNewMessage);

    // --- Section 3: Photo Gallery ---
    const galleryMainImage = document.getElementById('gallery-main-image');
    const galleryThumbnails = document.getElementById('gallery-thumbnails');

    // --- PERSONALIZATION: Add your photos here! ---
    // Make sure the 'src' path matches the files in your 'images' folder.
    const photos = [
        { src: 'Anita/ph1.jpg', alt: 'A beautiful sunset we watched together' },
        { src: 'Anita/ph2.jpg', alt: 'That silly face you make' },
        { src: 'Anita/ph3.jpg', alt: 'Our trip to the mountains' },
        // Add more photos like this:
        // { src: 'images/photo4.jpg', alt: 'Description of the photo' },
    ];

    function populateGallery() {
        if (photos.length === 0) return;

        // Clear any existing thumbnails
        galleryThumbnails.innerHTML = '';

        // Create a thumbnail for each photo
        photos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo.src;
            thumb.alt = photo.alt;
            thumb.classList.add('w-full', 'h-24', 'object-cover', 'rounded-lg', 'cursor-pointer', 'transition-all', 'duration-300', 'hover:opacity-75', 'hover:scale-105');
            
            // Add a border to the active thumbnail
            if (index === 0) {
                thumb.classList.add('ring-4', 'ring-babe-pink');
            }

            thumb.addEventListener('click', () => {
                // Update the main image
                galleryMainImage.src = photo.src;
                galleryMainImage.alt = photo.alt;

                // Update the active thumbnail style
                document.querySelectorAll('#gallery-thumbnails img').forEach(img => img.classList.remove('ring-4', 'ring-babe-pink'));
                thumb.classList.add('ring-4', 'ring-babe-pink');
            });

            galleryThumbnails.appendChild(thumb);
        });

        // Set the initial main image to the first photo
        galleryMainImage.src = photos[0].src;
        galleryMainImage.alt = photos[0].alt;
    }

    // Initialize the gallery when the page loads
    populateGallery();
    
    // --- Section 4: Theme Switching ---
    const themeButtons = document.querySelectorAll('.theme-button');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Remove all theme classes from body
            document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green');
            
            // Add the selected theme class
            const theme = button.getAttribute('data-theme');
            if (theme !== 'pink') { // Pink is the default theme
                document.body.classList.add(`theme-${theme}`);
            }
        });
    });
    
    // --- Section 5: Confetti Effect ---
    function createConfetti() {
        const colors = ['#ff69b4', '#e04b7b', '#ffd1dc', '#ff1493', '#db7093'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
            
            // Random shape
            if (Math.random() > 0.5) {
                confetti.classList.add('square');
            }
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 2500);
        }
    }
});