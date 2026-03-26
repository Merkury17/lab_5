document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const root = document.documentElement;

    function applyTheme(isDark) {
        if (isDark) {
            root.setAttribute('data-theme', 'dark');
            themeLabel.textContent = 'Нічний режим';
            themeToggle.checked = true;
        } else {
            root.removeAttribute('data-theme');
            themeLabel.textContent = 'Денний режим';
            themeToggle.checked = false;
        }
    }

    function autoSetThemeByTime() {
        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 7 && currentHour < 21;
        applyTheme(!isDayTime);
    }

    autoSetThemeByTime();

    themeToggle.addEventListener('change', (e) => {
        applyTheme(e.target.checked);
    });

    function getBrowserAndOS() {
        const userAgent = navigator.userAgent;
        let os = "Невідома ОС";
        let browser = "Невідомий браузер";

        if (userAgent.indexOf("Win") !== -1) os = "Windows";
        else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
        else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
        else if (userAgent.indexOf("Android") !== -1) os = "Android";
        else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

        if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Edg/") === -1 && userAgent.indexOf("OPR/") === -1) {
            browser = "Google Chrome";
        } else if (userAgent.indexOf("Firefox") !== -1) {
            browser = "Mozilla Firefox";
        } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
            browser = "Apple Safari";
        } else if (userAgent.indexOf("Edg/") !== -1) {
            browser = "Microsoft Edge";
        } else if (userAgent.indexOf("OPR/") !== -1 || userAgent.indexOf("Opera") !== -1) {
            browser = "Opera";
        }

        return { os, browser };
    }

    const sysInfo = getBrowserAndOS();
    localStorage.setItem('userOS', sysInfo.os);
    localStorage.setItem('userBrowser', sysInfo.browser);

    const savedOS = localStorage.getItem('userOS');
    const savedBrowser = localStorage.getItem('userBrowser');
    document.getElementById('os-info').textContent = `ОС: ${savedOS || 'Невідомо'}`;
    document.getElementById('browser-info').textContent = `Браузер: ${savedBrowser || 'Невідомо'}`;

    const variantNumber = 28;
    const commentsContainer = document.getElementById('comments-container');
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            commentsContainer.innerHTML = '';
            
            if (comments.length === 0) {
                commentsContainer.innerHTML = '<p class="loading">Немає коментарів для цього поста.</p>';
                return;
            }

            comments.forEach(comment => {
                const card = document.createElement('div');
                card.className = 'comment-card';
                card.innerHTML = `
                    <h3>${comment.name}</h3>
                    <a href="mailto:${comment.email}">${comment.email}</a>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            commentsContainer.innerHTML = '<p class="loading">Помилка під час завантаження коментарів.</p>';
        });

    const modal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal');

    const modalDelay = 60000; 
    setTimeout(() => {
        modal.classList.add('show');
    }, modalDelay);

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
