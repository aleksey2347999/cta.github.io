// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ВИДЕО ==========
let videoPlayer = null;
let isVideoLoaded = false;
let isFullscreen = false;

// Rutube видео
const RUTUBE_VIDEO_ID = 'a099adc6184f687abceb40b1c783c844';
const RUTUBE_VIDEO_URL = `https://rutube.ru/play/embed/${RUTUBE_VIDEO_ID}/`;

// ========== ИНИЦИАЛИЗАЦИЯ САЙТА ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт учебного проекта загружен!');
    console.log('Создатель: Новосельцев Алексей, ученик 8А класса');
    
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initCounters();
    initScrollAnimations();
    setupScrollProgress();
    setupEventListeners();
    
    // Показываем приветственное уведомление
    setTimeout(() => {
        showNotification('Добро пожаловать на сайт учебного проекта! 👨‍🎓', 'success');
    }, 1500);
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
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuBtn.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
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
                
                // Обновляем активную ссылку в навигации
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === href) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========== FAQ СИСТЕМА ==========
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            const icon = this.querySelector('.faq-icon');
            
            // Закрываем все другие открытые FAQ
            document.querySelectorAll('.faq-item.active').forEach(otherItem => {
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                if (icon) icon.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                faqItem.classList.remove('active');
                if (icon) icon.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });
}

// ========== АНИМАЦИЯ СЧЕТЧИКОВ ==========
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseInt(originalText);
        
        if (isNaN(target)) return;
        
        // Сбрасываем счетчик
        counter.textContent = '0';
        
        // Создаем наблюдатель для анимации при появлении
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounterAnimation(counter, target, originalText);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function startCounterAnimation(element, target, originalText) {
    let current = 0;
    const increment = target / 60; // 60 кадров анимации
    const duration = 2000; // 2 секунды
    const stepTime = Math.floor(duration / 60);
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(timer);
            
            // Добавляем небольшую анимацию завершения
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .install-step, .timeline-item, .resource-card, .tip, .extension'
    );
    
    // Изначально скрываем элементы
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Задержка для последовательного появления
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Назначаем задержку для последовательной анимации
    animatedElements.forEach((el, index) => {
        el.dataset.delay = (index % 6) * 100; // Задержка 100мс между группами
        observer.observe(el);
    });
}

// ========== ВИДЕО ФУНКЦИОНАЛ ==========
function loadVideo() {
    const videoContainer = document.getElementById('videoPlayer');
    if (!videoContainer) return;
    
    // Показываем индикатор загрузки
    videoContainer.innerHTML = `
        <div class="video-loading">
            <div class="loading-spinner"></div>
            <p>Загрузка видео с Rutube...</p>
        </div>
    `;
    
    // Добавляем стили для спиннера
    const style = document.createElement('style');
    style.textContent = `
        .video-loading {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            z-index: 10;
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #2d5be3;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Загружаем видео через iframe
    setTimeout(() => {
        videoContainer.innerHTML = `
            <iframe 
                src="${RUTUBE_VIDEO_URL}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                title="Создание сайта за 15 минут - учебный проект"
                id="mainVideoIframe">
            </iframe>
        `;
        
        videoPlayer = document.getElementById('mainVideoIframe');
        isVideoLoaded = true;
        
        // Обновляем кнопки
        updateVideoControls();
        
        showNotification('Видео успешно загружено! Нажмите "Воспроизвести"', 'success');
    }, 1500);
}

function playVideo() {
    if (!isVideoLoaded) {
        loadVideo();
        return;
    }
    
    if (videoPlayer) {
        try {
            // Для Rutube может потребоваться другой подход
            // Пытаемся отправить команду воспроизведения
            videoPlayer.contentWindow.postMessage('play', '*');
            
            // Обновляем UI
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i> Пауза';
            document.getElementById('playBtn').setAttribute('onclick', 'pauseVideo()');
            
            showNotification('Воспроизведение видео...', 'info');
        } catch (error) {
            console.log('Не удалось воспроизвести видео:', error);
            showNotification('Нажмите на видео для воспроизведения', 'warning');
        }
    }
}

function pauseVideo() {
    if (videoPlayer && isVideoLoaded) {
        try {
            videoPlayer.contentWindow.postMessage('pause', '*');
            
            // Обновляем UI
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Воспроизвести';
            document.getElementById('playBtn').setAttribute('onclick', 'playVideo()');
        } catch (error) {
            console.log('Не удалось поставить на паузу:', error);
        }
    }
}

function toggleFullscreen() {
    if (!isVideoLoaded) {
        loadVideo();
        setTimeout(toggleFullscreen, 2000);
        return;
    }
    
    const modal = document.getElementById('videoModal');
    const fullscreenContainer = document.getElementById('fullscreenVideo');
    
    if (!modal || !fullscreenContainer) return;
    
    // Копируем iframe в модальное окно
    if (videoPlayer) {
        const iframeSrc = videoPlayer.src;
        fullscreenContainer.innerHTML = `
            <iframe 
                src="${iframeSrc}?autoplay=1" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen
                title="Создание сайта за 15 минут - полноэкранный режим">
            </iframe>
        `;
    } else {
        // Если видео еще не загружено, загружаем его
        fullscreenContainer.innerHTML = `
            <iframe 
                src="${RUTUBE_VIDEO_URL}?autoplay=1" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen
                title="Создание сайта за 15 минут">
            </iframe>
        `;
    }
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    isFullscreen = true;
}

function closeFullscreen() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    
    // Останавливаем видео в модальном окне
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('pause', '*');
    }
    
    // Закрываем модальное окно
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    isFullscreen = false;
}

function restartVideo() {
    if (!isVideoLoaded) {
        loadVideo();
        return;
    }
    
    if (videoPlayer) {
        try {
            // Перезагружаем iframe
            const currentSrc = videoPlayer.src.split('?')[0];
            videoPlayer.src = currentSrc + '?autoplay=1';
            
            showNotification('Видео перезапущено', 'info');
        } catch (error) {
            console.log('Не удалось перезапустить видео:', error);
        }
    }
}

function updateVideoControls() {
    if (isVideoLoaded) {
        // Активируем кнопки
        const buttons = ['pauseBtn', 'fullscreenBtn', 'restartBtn'];
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        });
    }
}

// Модальные контролы
function modalPlay() {
    const iframe = document.querySelector('#fullscreenVideo iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('play', '*');
    }
}

function modalPause() {
    const iframe = document.querySelector('#fullscreenVideo iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('pause', '*');
    }
}

// ========== СКАЧИВАНИЕ ФАЙЛОВ ==========
function downloadFile(type) {
    let content = '';
    let filename = '';
    let fileType = 'text/plain';
    
    switch(type) {
        case 'html':
            content = generateHTMLTemplate();
            filename = 'шаблон-сайта.html';
            fileType = 'text/html';
            break;
            
        case 'cheatsheet':
            content = generateCheatsheet();
            filename = 'шпаргалка-веб-разработчика.txt';
            break;
            
        case 'structure':
            content = generateProjectStructure();
            filename = 'структура-проекта.txt';
            break;
            
        default:
            showNotification('Неизвестный тип файла', 'error');
            return;
    }
    
    // Создаем и скачиваем файл
    const blob = new Blob([content], { type: `${fileType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showNotification(`Файл "${filename}" успешно скачан! 📁`, 'success');
}

function generateHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый сайт - Учебный проект</title>
    <style>
        /* Стили для вашего сайта */
        :root {
            --primary: #2d5be3;
            --secondary: #ff6b6b;
            --light: #f8f9fa;
            --dark: #212529;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--dark);
            background: var(--light);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: white;
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .hero {
            text-align: center;
            padding: 100px 0;
            background: linear-gradient(135deg, var(--primary), #5c85ff);
            color: white;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        /* Добавьте свои стили здесь */
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Мой первый сайт</h1>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2>Привет, мир!</h2>
            <p>Это мой первый сайт, созданный как учебный проект</p>
            <a href="#" class="btn">Узнать больше</a>
        </div>
    </section>
    
    <script>
        // JavaScript код для вашего сайта
        console.log('Мой сайт работает!');
        
        // Пример простой функции
        document.querySelector('.btn').addEventListener('click', function() {
            alert('Добро пожаловать на мой сайт!');
        });
    </script>
</body>
</html>`;
}

function generateCheatsheet() {
    return `ШПАРГАЛКА ПО ВЕБ-РАЗРАБОТКЕ
=====================================

ОСНОВНЫЕ HTML-ТЕГИ:
===================
<h1>-<h6> - заголовки
<p> - параграф текста
<a href="url"> - ссылка
<img src="image.jpg" alt="описание"> - изображение
<ul>/<ol> - списки
<li> - элемент списка
<div> - блочный контейнер
<span> - строчный контейнер
<header>, <main>, <footer> - семантические теги
<nav> - навигация
<section> - секция страницы
<article> - самостоятельный контент

ОСНОВНЫЕ CSS-СВОЙСТВА:
=====================
color: #333; - цвет текста
background: #fff; - фон
font-size: 16px; - размер шрифта
font-family: Arial, sans-serif; - семейство шрифтов
margin: 10px; - внешние отступы
padding: 20px; - внутренние отступы
border: 1px solid #000; - граница
border-radius: 10px; - скругление углов
width: 100%; - ширина
height: 200px; - высота
display: flex; - flexbox
display: grid; - CSS Grid
position: relative/absolute; - позиционирование
text-align: center; - выравнивание текста

ОСНОВНЫЕ JS-КОМАНДЫ:
===================
console.log() - вывод в консоль
document.querySelector() - выбор элемента
addEventListener() - обработчик событий
if/else - условный оператор
for/while - циклы
function - функция
let/const - объявление переменных

СОВЕТЫ ДЛЯ НАЧИНАЮЩИХ:
=====================
1. Сохраняйтесь часто (Ctrl+S)
2. Используйте комментарии
3. Проверяйте код в разных браузерах
4. Изучайте консоль разработчика (F12)
5. Не бойтесь ошибок - это часть обучения

Удачи в изучении веб-разработки! 🚀`;
}

function generateProjectStructure() {
    return `СТРУКТУРА ВЕБ-ПРОЕКТА
========================

my-website/
├── index.html          # Главная страница
├── style.css           # Основные стили
├── script.js           # JavaScript код
├── README.md           # Описание проекта
├── .gitignore          # Игнорируемые файлы
├── assets/             # Ресурсы
│   ├── images/         # Изображения
│   │   ├── logo.png
│   │   └── hero-bg.jpg
│   ├── icons/          # Иконки
│   └── fonts/          # Шрифты
├── pages/              # Дополнительные страницы
│   ├── about.html
│   └── contact.html
└── components/         # Компоненты
    ├── header.html
    ├── footer.html
    └── navigation.css

ИНСТРУКЦИЯ:
1. Создайте папку для проекта
2. Скопируйте эту структуру
3. Начните с index.html
4. Постепенно добавляйте функционал

ПОЛЕЗНЫЕ КОМАНДЫ:
================
# Создание папок и файлов:
mkdir my-website
cd my-website
touch index.html style.css script.js

# Инициализация Git:
git init
git add .
git commit -m "Initial commit"

УСПЕХОВ В РАЗРАБОТКЕ! 💻`;
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
        
        // Обновляем активную ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

function setupScrollProgress() {
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

function setupEventListeners() {
    // Закрытие модального окна по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isFullscreen) {
            closeFullscreen();
        }
    });
    
    // Закрытие модального окна по клику вне контента
    document.querySelector('#videoModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeFullscreen();
        }
    });
}

function showNotification(message, type = 'info') {
    // Удаляем предыдущие уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Выбираем иконку
    const icon = type === 'success' ? 'check-circle' :
                 type === 'error' ? 'exclamation-circle' :
                 type === 'warning' ? 'exclamation-triangle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
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
            gap: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #2d5be3;
        }
        .notification-success {
            border-left-color: #4CAF50;
        }
        .notification-error {
            border-left-color: #f44336;
        }
        .notification-warning {
            border-left-color: #ff9800;
        }
        .notification i:first-child {
            font-size: 1.2rem;
        }
        .notification-success i:first-child {
            color: #4CAF50;
        }
        .notification-error i:first-child {
            color: #f44336;
        }
        .notification-warning i:first-child {
            color: #ff9800;
        }
        .notification button {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            margin-left: auto;
            padding: 5px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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

function showVideo() {
    scrollToSection('video');
    setTimeout(() => {
        if (!isVideoLoaded) {
            loadVideo();
        } else {
            playVideo();
        }
    }, 500);
}

// Экспортируем функции для использования в HTML
window.scrollToSection = scrollToSection;
window.showVideo = showVideo;
window.loadVideo = loadVideo;
window.playVideo = playVideo;
window.pauseVideo = pauseVideo;
window.toggleFullscreen = toggleFullscreen;
window.restartVideo = restartVideo;
window.closeFullscreen = closeFullscreen;
window.modalPlay = modalPlay;
window.modalPause = modalPause;
window.downloadFile = downloadFile;
