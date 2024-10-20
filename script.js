let snowInterval;
let progressBarAnimated = false;

// ฟังก์ชันสำหรับสร้างหิมะ
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';

    const colors = ['#ffffff', '#a6e7ff', '#ff99cc'];
    snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });

    document.body.appendChild(snowflake);
}

// ฟังก์ชันสำหรับเริ่มตกหิมะ
function startSnow() {
    if (!snowInterval) {
        snowInterval = setInterval(createSnowflake, 200);
    }
}

// ฟังก์ชันสำหรับหยุดตกหิมะ
function stopSnow() {
    clearInterval(snowInterval);
    snowInterval = null;
}

// ฟังก์ชันสำหรับเล่นเพลง
function playBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        if (audio.paused) {
            audio.play().then(() => {
                console.log('Music is playing!');
            }).catch(error => {
                console.error('Failed to play the audio:', error);
            });
        } else {
            console.log('Music is already playing.');
        }
    } else {
        console.error('Audio element not found.');
    }
}

// ฟังก์ชันสำหรับอนิเมชันแถบสกิล
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        const value = progressBar.getAttribute('aria-valuenow');
        progressBar.style.width = '0'; // รีเซ็ตความกว้างเป็น 0
        setTimeout(() => {
            progressBar.style.width = value + '%';
            progressBar.style.transition = 'width 2s ease-in-out'; // เริ่มอนิเมชัน
        }, 10);
    });
}

// เริ่มทำงานเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    // เริ่มตกหิมะทันที
    startSnow();

    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('click', () => {
            playBackgroundMusic();
        });
    } else {
        console.error('Play button not found.');
    }

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars(); // เริ่มอนิเมชันทุกครั้งที่เข้า Skills section
                }
            });
        });

        observer.observe(skillsSection);

        // เริ่มอนิเมชันเมื่อโหลดหน้า
        window.addEventListener('load', () => {
            if (skillsSection.getBoundingClientRect().top >= 0 && skillsSection.getBoundingClientRect().bottom <= window.innerHeight) {
                animateProgressBars();
            }
        });
    } else {
        console.error('Skills section not found.');
    }

    // ฟังก์ชันสำหรับตรวจสอบการเลื่อนหน้า
    function checkScroll() {
        const playButtonBackground = document.querySelector('.play-button-background');
        if (window.scrollY > 0) {
            playButtonBackground.style.display = 'none';
        } else {
            playButtonBackground.style.display = 'block';
        }
    }

    window.addEventListener('scroll', checkScroll);
});

// ตรวจสอบเมื่อเปลี่ยนแท็บ
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        startSnow(); // เริ่มตกหิมะใหม่เมื่อกลับมา
    } else {
        stopSnow(); // หยุดตกหิมะเมื่อออกจากแท็บ
    }
});
