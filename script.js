// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let currentVideo = null;
let videoSources = [
    {
        id: 'youtube',
        url: 'https://www.youtube.com/embed/8GPPJpiLqHk',
        title: 'Основы HTML и CSS для начинающих',
        type: 'youtube'
    },
    {
        id: 'vimeo',
        url: 'https://player.vimeo.com/video/377232241',
        title: 'Введение в веб-разработку',
        type: 'vimeo'
    },
    {
        id: 'rutube',
        url: 'https://rutube.ru/play/embed/10605995',
        title: 'Создание первого сайта',
        type: 'rutube'
    }
];

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен! Создатель: Новосельцев Алексей');
    
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initCounters();
    initScrollAnimations();
    initVideoPlayer();
    setupScrollProgress();
    setupEventListeners();
    
    // Показываем приветствие
    setTimeout(() => {
        showNotification('Добро пожаловать на сайт учебного проекта! 👨‍💻', 'success');
    }, 1000);
});

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ========== FAQ ==========
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Закрываем другие
            document.querySelectorAll('.faq-item.active').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });
            
            // Переключаем текущий
            item.classList.toggle('active', !isActive);
        });
    });
}

// ========== СЧЕТЧИКИ ==========
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        counter.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / 50);
}

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .install-step, .timeline-item, .resource-card');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach((el, index) => {
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

// ========== ВИДЕО ПЛЕЙЕР ==========
function initVideoPlayer() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (!videoPlayer) return;
    
    // Создаем placeholder
    videoPlayer.innerHTML = `
        <div class="video-placeholder">
            <i class="fas fa-play-circle"></i>
            <h4>Видеоурок по созданию сайта</h4>
            <p>Нажмите "Воспроизвести" чтобы начать просмотр</p>
            <button class="btn btn-primary" onclick="loadVideo()">
                <i class="fas fa-play"></i> Воспроизвести видео
            </button>
        </div>
    `;
    
    currentVideo = videoSources[0]; // YouTube по умолчанию
}

function loadVideo(sourceIndex = 0) {
    const videoPlayer = document.getElementById('videoPlayer');
    if (!videoPlayer) return;
    
    const source = videoSources[sourceIndex];
    currentVideo = source;
    
    // Показываем загрузку
    videoPlayer.innerHTML = `
        <div class="video-placeholder">
            <div class="loading-spinner"></div>
            <p>Загрузка видео...</p>
        </div>
    `;
    
    // Загружаем видео через 1 секунду (имитация загрузки)
    setTimeout(() => {
        if (source.type === 'youtube') {
            videoPlayer.innerHTML = `
                <iframe 
                    src="${source.url}?rel=0&modestbranding=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    title="${source.title}"
                    loading="lazy">
                </iframe>
            `;
        } else {
            videoPlayer.innerHTML = `
                <iframe 
                    src="${source.url}" 
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen
                    title="${source.title}"
                    loading="lazy">
                </iframe>
            `;
        }
        
        // Добавляем стили для спиннера
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #2d5be3;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
    }, 1000);
}

function playVideo() {
    const iframe = document.querySelector('#videoPlayer iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } else {
        loadVideo();
    }
}

function pauseVideo() {
    const iframe = document.querySelector('#videoPlayer iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
}

function showVideo() {
    loadVideo();
    scrollToSection('video');
}

function openFullVideo() {
    const modal = document.getElementById('videoModal');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    
    if (!modal || !fullscreenVideo) return;
    
    // Создаем iframe для полноэкранного режима
    if (currentVideo) {
        fullscreenVideo.innerHTML = `
            <iframe 
                src="${currentVideo.url}?autoplay=1&rel=0&modestbranding=1" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen
                title="${currentVideo.title}">
            </iframe>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    
    // Останавливаем видео
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========== СКАЧИВАНИЕ ФАЙЛОВ ==========
function downloadFile(type) {
    let content = '';
    let filename = '';
    
    switch(type) {
        case 'html':
            content = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый сайт</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #2d5be3;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Мой первый сайт!</h1>
    <div class="container">
        <p>Создано как учебный проект</p>
    </div>
</body>
</html>`;
            filename = 'мой-сайт.html';
            break;
            
        case 'cheatsheet':
            content = `ШПАРГАЛКА HTML/CSS

HTML:
<h1>Заголовок</h1>
<p>Текст</p>
<a href="#">Ссылка</a>
<img src="image.jpg" alt="Описание">

CSS:
color: #333;
background: #fff;
font-size: 16px;
margin: 10px;
padding: 20px;`;
            filename = 'шпаргалка.txt';
            break;
            
        case 'presentation':
            content = `ПРЕЗЕНТАЦИЯ ПРОЕКТА

Слайд 1: Создание сайтов на VS Code
Автор: Новосельцев Алексей, 8А класс

Слайд 2: Цели проекта
1. Изучить веб-разработку
2. Создать работающий сайт
3. Научиться публиковать проекты

Слайд 3: Результаты
✅ Создан полноценный сайт
✅ Проект размещен в интернете
✅ Есть учебные материалы`;
            filename = 'презентация.txt';
            break;
    }
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showNotification(`Файл "${filename}" скачан!`, 'success');
}

// ========== УТИЛИТЫ ==========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

function setupScrollProgress() {
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });
}

function setupEventListeners() {
    // Закрытие модального окна по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
    
    // Закрытие модального окна по клику вне
    document.querySelector('#videoModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeVideoModal();
        }
    });
}

function showNotification(message, type = 'info') {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        .notification-success {
            border-left: 4px solid #4CAF50;
        }
        .notification button {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            margin-left: 10px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Автоудаление через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Экспортируем функции для использования в HTML
window.scrollToSection = scrollToSection;
window.showVideo = showVideo;
window.playVideo = playVideo;
window.pauseVideo = pauseVideo;
window.openFullVideo = openFullVideo;
window.closeVideoModal = closeVideoModal;
window.downloadFile = downloadFile;
