const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Function to sync the button text and icon with the current mode
function updateThemeUI() {
    // If body has light-mode, show "DARK" option. Otherwise (Default Dark), show "LIGHT".
    if (body.classList.contains('light-mode')) {
        themeText.innerText = "DARK";
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeText.innerText = "LIGHT";
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    updateThemeUI();
});

// Check Storage on Load
window.addEventListener('DOMContentLoaded', () => {
 if (localStorage.getItem('theme') === 'dark') {
 body.classList.add('dark-mode');
}
 updateThemeUI();
});
const reels = document.querySelectorAll('.reel-card video');
const modal = document.getElementById('reelModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

reels.forEach(video => {
    // Desktop hover play (Uncommented and fixed)
    video.addEventListener('mouseenter', () => {
        video.play().catch(() => {
            video.muted = true; // Mute to force play if browser blocks it
            video.play();
        });
    });

    video.addEventListener('mouseleave', () => { 
        video.pause(); 
        video.currentTime = 0; 
    });
    
    // The Click logic for "Reel Feel"
    video.addEventListener('click', () => {
        modal.style.display = "flex";
        modalVideo.src = video.src;
        modalVideo.play();
        document.body.style.overflow = "hidden";
    });
});

closeModal.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the click from hitting the background
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = "auto";
});

// Close when clicking outside the video
window.onclick = (e) => {
 if (e.target == modal) {
 modal.style.display = "none";
 modalVideo.pause();
 document.body.style.overflow = "auto";
}
} 
// Mobile Auto-Play on Scroll logic
const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(() => {
                video.muted = true;
                video.play();
            });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    });
}, { threshold: 0.6 }); // Plays when 60% of the video is visible

// Apply the observer to all reels
reels.forEach(video => {
    mobileObserver.observe(video);
});