// Нейронная сеть на фоне
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    const neurons = 100;
    const connections = 200;
    
    // Создаем нейроны
    for (let i = 0; i < neurons; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        neuron.style.left = `${Math.random() * 100}%`;
        neuron.style.top = `${Math.random() * 100}%`;
        neuron.style.animationDelay = `${Math.random() * 20}s`;
        container.appendChild(neuron);
    }
    
    // Создаем соединения
    for (let i = 0; i < connections; i++) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = x1 + (Math.random() - 0.5) * 40;
        const y2 = y1 + (Math.random() - 0.5) * 40;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        connection.style.width = `${length}%`;
        connection.style.left = `${x1}%`;
        connection.style.top = `${y1}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.animationDelay = `${Math.random() * 3}s`;
        
        container.appendChild(connection);
    }
}

// Мобильное меню
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + 
                                     window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновление активной ссылки
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// FAQ аккордеон
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const item = this.parentElement;
        const isOpen = item.classList.contains('active');
        
        // Закрытие других FAQ
        document.querySelectorAll('.faq-item.active').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('active');
            }
        });
        
        // Переключение текущего FAQ
        item.classList.toggle('active', !isOpen);
    });
});

// Открытие модального окна с видео
function openVideoModal() {
    document.getElementById('videoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeVideoModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Прокрутка к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

// Скачивание файлов
function downloadFile(type) {
    let content = '';
    let filename = '';
    let mimeType = 'text/plain';
    
    switch(type) {
        case 'html':
            content = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый сайт - VS Code Pro</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #007acc;
            --secondary: #68217a;
            --accent: #4CAF50;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 20px;
            margin: 40px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: var(--primary);
            font-size: 3.5rem;
            margin-bottom: 20px;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background: var(--primary);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            margin-top: 20px;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Мой первый сайт!</h1>
            <p>Создан за 15 минут с помощью VS Code Pro</p>
            <p>Это полностью рабочий HTML файл. Сохраните его как index.html и откройте в браузере!</p>
            <a href="#" class="btn">
                <i class="fas fa-rocket"></i> Начать разработку
            </a>
        </header>
    </div>
</body>
</html>`;
            filename = 'index.html';
            mimeType = 'text/html';
            break;
            
        case 'css':
            content = `/* Основные стили для первого сайта */
:root {
    --primary: #007acc;
    --primary-light: #4fc3f7;
    --primary-dark: #005a9e;
    --secondary: #68217a;
    --accent: #4CAF50;
    --dark: #1a1a1a;
    --light: #f8f9fa;
    --lighter: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--dark);
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Шапка */
header {
    text-align: center;
    padding: 80px 20px;
    background: var(--lighter);
    border-radius: 20px;
    margin: 40px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(0, 122, 204, 0.1);
}

h1 {
    color: var(--primary);
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

h2 {
    color: var(--secondary);
    font-size: 2rem;
    margin: 40px 0 20px;
}

p {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

/* Кнопки */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 32px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 122, 204, 0.3);
}

/* Сетка */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin: 60px 0;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.card-icon {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 20px;
}

/* Адаптивность */
@media (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
    }
    
    h2 {
        font-size: 1.75rem;
    }
    
    .grid {
        grid-template-columns: 1fr;
    }
    
    header {
        padding: 40px 20px;
        margin: 20px 0;
    }
}

/* Анимации */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease forwards;
}

/* Утилиты */
.text-center {
    text-align: center;
}

.mt-4 {
    margin-top: 40px;
}

.mb-4 {
    margin-bottom: 40px;
}`;
            filename = 'style.css';
            break;
            
        case 'checklist':
            content = `ЧЕК-ЛИСТ: СОЗДАНИЕ САЙТА ЗА 15 МИНУТ
=====================================

✅ 1. УСТАНОВКА И НАСТРОЙКА VS CODE
   [ ] Скачать Visual Studio Code с официального сайта
   [ ] Запустить установщик и выбрать все опции
   [ ] Установить расширения:
       - Live Server
       - Prettier
       - Auto Rename Tag
   [ ] Настроить горячие клавиши
   [ ] Проверить работу VS Code

✅ 2. СОЗДАНИЕ ПРОЕКТА
   [ ] Создать папку для проекта
   [ ] Открыть папку в VS Code
   [ ] Создать файлы:
       - index.html
       - style.css
       - script.js (опционально)
   [ ] Проверить структуру проекта

✅ 3. НАПИСАНИЕ HTML КОДА
   [ ] Создать базовую структуру HTML
   [ ] Добавить мета-теги (viewport, charset)
   [ ] Подключить CSS и JS файлы
   [ ] Создать семантическую разметку
   [ ] Добавить контент и изображения
   [ ] Проверить валидность кода

✅ 4. СТИЛИЗАЦИЯ CSS
   [ ] Сбросить стандартные стили
   [ ] Настроить базовые стили (шрифты, цвета)
   [ ] Создать адаптивную верстку
   [ ] Добавить анимации и переходы
   [ ] Протестировать на разных устройствах
   [ ] Оптимизировать производительность

✅ 5. ТЕСТИРОВАНИЕ И ОТЛАДКА
   [ ] Открыть сайт в браузере
   [ ] Проверить адаптивность
   [ ] Протестировать на скорость загрузки
   [ ] Исправить ошибки валидации
   [ ] Проверить доступность (accessibility)
   [ ] Протестировать в разных браузерах

✅ 6. ПУБЛИКАЦИЯ НА ХОСТИНГЕ
   [ ] Зарегистрироваться на Beget.com
   [ ] Выбрать тариф и домен
   [ ] Оплатить хостинг
   [ ] Загрузить файлы через FTP/файловый менеджер
   [ ] Настроить домен и SSL
   [ ] Проверить работу сайта онлайн

✅ 7. ОПТИМИЗАЦИЯ И SEO
   [ ] Оптимизировать изображения
   [ ] Настроить мета-теги для SEO
   [ ] Добавить фавикон
   [ ] Проверить скорость загрузки
   [ ] Настроить кеширование
   [ ] Добавить аналитику

🚀 ВАЖНЫЕ СОВЕТЫ:
• Сохраняйте файлы регулярно (Ctrl+S)
• Используйте комментарии в коде
• Следите за структуре проекта
• Тестируйте после каждого изменения
• Изучайте консоль разработчика
• Не бойтесь экспериментировать

🎯 ПЛАН ДАЛЬНЕЙШЕГО РАЗВИТИЯ:
1. Изучить JavaScript основы
2. Освоить Git и GitHub
3. Изучить фреймворки (React/Vue)
4. Освоить Node.js для backend
5. Изучить базы данных
6. Создать портфолио проектов

УСПЕХОВ В ОБУЧЕНИИ! 💻✨

Этот чек-лист поможет вам систематизировать процесс
создания сайтов и не упустить важные этапы.`;
            filename = 'чек-лист.txt';
            break;
    }
    
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Показать уведомление
    showNotification(`Файл "${filename}" успешно скачан!`);
}

// Уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    createNeuralNetwork();
    
    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            animateCounter(stat, target);
        }
    });
    
    // Плавное появление элементов при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .install-step, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Скрытие хедера при скролле вниз
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            openVideoModal();
        }
    });
});

// Анимация счетчиков
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// CSS для анимаций
const style = document.createElement('style');
style.textContent = `
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
