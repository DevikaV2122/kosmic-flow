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
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    updateThemeUI();
});

// Check Storage on Load
window.addEventListener('DOMContentLoaded', () => {
    // If the user previously saved 'light', add the light-mode class.
    // If they saved 'dark' or nothing at all, it stays in the default Dark Mode.
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
    updateThemeUI();
});
const reels = document.querySelectorAll('.reel-card video');
const modal = document.getElementById('reelModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

reels.forEach(video => {
    // Desktop hover play
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => { 
        video.pause(); 
        video.currentTime = 0; 
    });
    
    // The Click logic for "Reel Feel"
    video.addEventListener('click', () => {
        modal.style.display = "flex"; // Changed to flex for center alignment
        modalVideo.src = video.src;
        modalVideo.play();
        document.body.style.overflow = "hidden"; // Stops background scrolling
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = "auto"; // Restores scrolling
});

// Close when clicking outside the video
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        modalVideo.pause();
        document.body.style.overflow = "auto";
    }
}