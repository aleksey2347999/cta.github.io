// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ ==========
let isScrolling = false;
let lastScrollTop = 0;

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен! Создатель: Новосельцев Алексей, 8А класс');
    
    // Создаем нейронную сеть на фоне
    createNeuralNetwork();
    
    // Настраиваем мобильное меню
    setupMobileMenu();
    
    // Настраиваем плавную прокрутку
    setupSmoothScroll();
    
    // Настраиваем FAQ аккордеон
    setupFAQ();
    
    // Анимируем счетчики статистики
    animateCounters();
    
    // Настраиваем анимации при скролле
    setupScrollAnimations();
    
    // Настраиваем скрывающийся хедер
    setupHideHeader();
    
    // Настраиваем горячие клавиши
    setupHotkeys();
    
    // Настраиваем модальное окно с видео
    setupVideoModal();
    
    // Показываем приветственное сообщение
    showWelcomeMessage();
});

// ========== НЕЙРОННАЯ СЕТЬ НА ФОНЕ ==========
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    const neurons = 80;
    const connections = 150;
    
    // Создаем нейроны
    for (let i = 0; i < neurons; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        
        // Случайная позиция
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        neuron.style.left = `${left}%`;
        neuron.style.top = `${top}%`;
        
        // Случайная задержка анимации
        neuron.style.animationDelay = `${Math.random() * 20}s`;
        
        // Случайный размер
        const size = 2 + Math.random() * 4;
        neuron.style.width = `${size}px`;
        neuron.style.height = `${size}px`;
        
        // Случайная прозрачность
        neuron.style.opacity = 0.1 + Math.random() * 0.3;
        
        container.appendChild(neuron);
    }
    
    // Создаем соединения
    for (let i = 0; i < connections; i++) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        
        // Случайные точки соединения
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = x1 + (Math.random() - 0.5) * 30;
        const y2 = y1 + (Math.random() - 0.5) * 30;
        
        // Вычисляем длину и угол
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        connection.style.width = `${length}%`;
        connection.style.left = `${x1}%`;
        connection.style.top = `${y1}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        // Случайная задержка анимации
        connection.style.animationDelay = `${Math.random() * 3}s`;
        
        // Случайная прозрачность
        connection.style.opacity = 0.05 + Math.random() * 0.1;
        
        container.appendChild(connection);
    }
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Открытие/закрытие меню по клику на кнопку
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Обновляем активную ссылку
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, что это якорная ссылка
            if (href === '#' || !href.startsWith('#') || href.length === 1) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Вычисляем позицию с учетом высоты хедера
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                const targetPosition = targetElement.getBoundingClientRect().top + 
                                     window.pageYOffset - headerHeight;
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, href);
            }
        });
    });
}

// ========== FAQ АККОРДЕОН ==========
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            const icon = this.querySelector('.faq-icon');
            
            // Закрываем все другие открытые FAQ
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-icon').innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
            
            // Переключаем текущий FAQ
            faqItem.classList.toggle('active');
            
            // Меняем иконку
            if (faqItem.classList.contains('active')) {
                icon.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });
}

// ========== АНИМАЦИЯ СЧЕТЧИКОВ ==========
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseInt(originalText);
        
        if (isNaN(target)) return;
        
        // Очищаем текст
        stat.textContent = '0';
        
        // Создаем наблюдатель для анимации при появлении
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(stat, target, originalText);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

function startCounter(element, target, originalText) {
    let current = 0;
    const increment = target / 50; // 50 шагов анимации
    const duration = 1500; // 1.5 секунды
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .install-step, .timeline-item, .resource-card'
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
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Назначаем задержку для последовательной анимации
    animatedElements.forEach((el, index) => {
        el.dataset.delay = index * 100; // Задержка 100мс между элементами
        observer.observe(el);
    });
}

// ========== СКРЫВАЮЩИЙСЯ ХЕДЕР ==========
function setupHideHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Отключаем анимацию на мобильных устройствах
        if (window.innerWidth < 992) return;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Прокрутка вниз - скрываем хедер
            header.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх - показываем хедер
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll;
    });
}

// ========== ГОРЯЧИЕ КЛАВИШИ ==========
function setupHotkeys() {
    document.addEventListener('keydown', function(e) {
        // ESC - закрыть модальное окно
        if (e.key === 'Escape') {
            closeVideoModal();
        }
        
        // Пробел - открыть видео (только если фокус не в поле ввода)
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            openVideoModal();
        }
        
        // Стрелки вверх/вниз для навигации
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            scrollToNextSection();
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            scrollToPrevSection();
        }
    });
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop > currentScroll + 100) {
            sections[i].scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScroll = window.pageYOffset;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop < currentScroll - 100) {
            sections[i].scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

// ========== МОДАЛЬНОЕ ОКНО С ВИДЕО ==========
function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
}

function openVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Добавляем класс для анимации
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Можно добавить автозапуск видео (опционально)
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        const src = iframe.src;
        if (!src.includes('autoplay=1')) {
            iframe.src = src.includes('?') 
                ? src + '&autoplay=1'
                : src + '?autoplay=1';
        }
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Останавливаем видео
    const iframe = modal.querySelector('iframe');
    if (iframe) {
        // Убираем autoplay из URL
        const src = iframe.src
            .replace('&autoplay=1', '')
            .replace('?autoplay=1', '')
            .replace('autoplay=1&', '')
            .replace('autoplay=1', '');
        iframe.src = src;
        
        // Альтернативный способ остановки видео
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
}

// ========== СКАЧИВАНИЕ ФАЙЛОВ ==========
function downloadFile(type) {
    let content = '';
    let filename = '';
    
    switch(type) {
        case 'html':
            content = getHTMLTemplate();
            filename = 'мой-сайт.html';
            break;
            
        case 'cheatsheet':
            content = getCheatsheet();
            filename = 'шпаргалка-html-css.txt';
            break;
            
        case 'presentation':
            content = getPresentationTemplate();
            filename = 'презентация-проекта.txt';
            break;
            
        default:
            showNotification('Тип файла не распознан', 'error');
            return;
    }
    
    // Создаем и скачиваем файл
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
    
    // Показываем уведомление
    showNotification(`Файл "${filename}" скачан!`, 'success');
}

// Шаблоны файлов для скачивания
function getHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый сайт</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            padding: 60px 20px;
            background: white;
            border-radius: 15px;
            margin: 40px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #007acc;
            margin-bottom: 20px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #007acc;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .creator {
            background: rgba(0, 122, 204, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Мой первый сайт!</h1>
            <p>Создан как учебный проект</p>
            
            <div class="creator">
                <p><strong>Автор:</strong> Новосельцев Алексей</p>
                <p><strong>Класс:</strong> 8А</p>
                <p><strong>Проект:</strong> Создание сайтов на VS Code</p>
            </div>
            
            <p>Этот сайт создан с использованием HTML и CSS</p>
            <a href="#" class="btn">Узнать больше</a>
        </header>
    </div>
    
    <script>
        // Простой JavaScript для примера
        document.querySelector('.btn').addEventListener('click', function() {
            alert('Привет! Этот сайт создан учеником 8 класса!');
        });
    </script>
</body>
</html>`;
}

function getCheatsheet() {
    return `ШПАРГАЛКА ПО HTML И CSS
=================================

ОСНОВНЫЕ HTML-ТЕГИ:

Структура документа:
<!DOCTYPE html> - объявление типа
<html> - корневой элемент
<head> - информация о странице
<body> - содержимое страницы

Заголовки (от самого важного к менее важному):
<h1>Заголовок 1</h1>
<h2>Заголовок 2</h2>
<h3>Заголовок 3</h3>

Текст:
<p>Абзац текста</p>
<strong>Жирный текст</strong>
<em>Курсив</em>
<br> - перенос строки

Ссылки и изображения:
<a href="https://site.ru">Текст ссылки</a>
<img src="image.jpg" alt="Описание">

Списки:
<ul>           # Маркированный список
  <li>Пункт 1</li>
  <li>Пункт 2</li>
</ul>

<ol>           # Нумерованный список
  <li>Первый</li>
  <li>Второй</li>
</ol>

ОСНОВНЫЕ CSS-СВОЙСТВА:

Цвета и фон:
color: #333;            # Цвет текста
background-color: #fff; # Цвет фона
background: linear-gradient(45deg, red, blue);

Текст:
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
text-align: center;
line-height: 1.5;

Отступы:
margin: 10px;     # Внешние отступы
padding: 20px;    # Внутренние отступы

Границы:
border: 1px solid black;
border-radius: 10px;  # Закругленные углы

Размеры:
width: 100px;
height: 200px;
max-width: 1200px;

ПРИМЕР ПРОСТОЙ СТРАНИЦЫ:

<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .card {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Мой сайт</h1>
  <div class="card">
    <p>Добро пожаловать!</p>
  </div>
</body>
</html>

Удачи в изучении веб-разработки! 🚀`;
}

function getPresentationTemplate() {
    return `ШАБЛОН ПРЕЗЕНТАЦИИ ПРОЕКТА
"Создание сайтов на Visual Studio Code"

Автор: Новосельцев Алексей
8А класс
[Название школы]
2024 год

СЛАЙД 1: ТИТУЛЬНЫЙ
===================
Создание сайтов на Visual Studio Code

Учебный проект
Новосельцев Алексей
8А класс

СЛАЙД 2: ЦЕЛЬ ПРОЕКТА
=====================
Цель: Научиться создавать современные сайты

Задачи:
1. Изучить HTML, CSS, JavaScript
2. Создать работающий сайт
3. Научиться публиковать сайты
4. Создать учебные материалы

СЛАЙД 3: ТЕХНОЛОГИИ
===================
Использованные технологии:
• HTML5 - структура сайта
• CSS3 - стили и анимации
• JavaScript - интерактивность
• VS Code - редактор кода
• GitHub - хостинг проекта

СЛАЙД 4: СТРУКТУРА САЙТА
========================
7 основных разделов:
1. Главная страница
2. Особенности проекта
3. Установка VS Code
4. История технологий
5. Видеоурок
6. Вопросы и ответы
7. Ресурсы для скачивания

СЛАЙД 5: РЕЗУЛЬТАТЫ
===================
Достигнутые результаты:
✅ Создан полноценный сайт
✅ Сайт работает на всех устройствах
✅ Проект размещен в интернете
✅ Созданы учебные материалы
✅ Код соответствует стандартам

СЛАЙД 6: ВЫВОДЫ
===============
1. Веб-разработка доступна школьникам
2. VS Code - отличный инструмент для начала
3. Современные сайты можно создавать быстро
4. Интернет дает возможность делиться проектами
5. Программирование - интересно и полезно

СЛАЙД 7: СПАСИБО ЗА ВНИМАНИЕ!
=============================
Вопросы?

Контакты:
Новосельцев Алексей
8А класс
[ваш.email@школа.ру]

Сайт проекта:
[ваш-логин.github.io]`;
}

// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message, type = 'success') {
    // Удаляем предыдущие уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Выбираем иконку в зависимости от типа
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #4CAF50;
        }
        
        .notification-error {
            border-left-color: #f44336;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: #4CAF50;
        }
        
        .notification-error i {
            color: #f44336;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 5px;
            margin-left: 10px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ========== ПРИВЕТСТВЕННОЕ СООБЩЕНИЕ ==========
function showWelcomeMessage() {
    // Показываем приветствие только при первом посещении
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showNotification('Добро пожаловать на сайт учебного проекта! 👋', 'success');
            sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
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
        
        // Обновляем активную ссылку в меню
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Экспортируем функции для использования в HTML
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.scrollToSection = scrollToSection;
window.downloadFile = downloadFile;
