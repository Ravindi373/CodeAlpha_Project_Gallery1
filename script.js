document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-container img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let slideshow = null;
    const slideshowDelay = 5000; // 5 seconds

    // Function to show image at specific index
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        currentIndex = index;
        
        // Handle wrapping around
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        
        images[currentIndex].classList.add('active');
        thumbnails[currentIndex].classList.add('active');
    }

    // Navigation button click handlers
    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        showImage(currentIndex + 1);
    });

    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            stopSlideshow();
            showImage(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopSlideshow();
            showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            stopSlideshow();
            showImage(currentIndex + 1);
        }
    });

    // Slideshow functions
    function startSlideshow() {
        if (!slideshow) {
            slideshow = setInterval(() => {
                showImage(currentIndex + 1);
            }, slideshowDelay);
        }
    }

    function stopSlideshow() {
        if (slideshow) {
            clearInterval(slideshow);
            slideshow = null;
        }
    }

    // Start slideshow automatically
    startSlideshow();

    // Pause slideshow when hovering over gallery
    document.querySelector('.gallery').addEventListener('mouseenter', stopSlideshow);
    document.querySelector('.gallery').addEventListener('mouseleave', startSlideshow);

    // Initialize first image
    showImage(0);
}); 