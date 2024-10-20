let snowInterval;
let progressBarAnimated = false;

// ฟังก์ชันสำหรับสร้างหิมะ
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';

    const colors = ['#ffffff', '#a6e7ff', '#ff99cc']; // สุ่มสีหิมะ
    snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px'; // ขนาดหิมะ
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's'; // ความเร็วในการตก

    snowflake.addEventListener('animationend', () => {
        snowflake.remove(); // ลบหิมะเมื่อจบการตก
    });

    document.body.appendChild(snowflake); // เพิ่มหิมะไปที่ body
}

// ฟังก์ชันสำหรับเริ่มตกหิมะ
function startSnow() {
    if (!snowInterval) {
        snowInterval = setInterval(createSnowflake, 200); // ทุก 200 มิลลิวินาที
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
                console.log('Music is playing!'); // แจ้งเมื่อเพลงเริ่มเล่น
            }).catch(error => {
                console.error('Failed to play the audio:', error); // แจ้งหากไม่สามารถเล่นเพลง
            });
        } else {
            console.log('Music is already playing.'); // แจ้งเมื่อเพลงกำลังเล่นอยู่
        }
    }
}

// เริ่มทำงานเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    startSnow(); // เริ่มตกหิมะทันที

    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('click', () => {
            playBackgroundMusic(); // เล่นเพลงเมื่อกดปุ่ม
        });
    }

    // ตรวจสอบการเปลี่ยนสถานะแท็บ
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startSnow(); // เริ่มตกหิมะเมื่อกลับมา
        } else {
            stopSnow(); // หยุดตกหิมะเมื่อออกจากแท็บ
        }
    });
});
