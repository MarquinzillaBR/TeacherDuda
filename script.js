// Classe de feedback
const Feedback = {
    show(message, type = 'success') {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
};

// Gerar os QR Codes com loading
class QRGenerator {
    static generateQR(id, url) {
        const container = document.getElementById(id);
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Gerando QR Code...';
        container.appendChild(loading);

        QRCode.toCanvas(url, {
            width: 160,
            margin: 2,
            color: {
                dark: '#222',
                light: '#fff'
            }
        }, (err, canvas) => {
            if (err) {
                Feedback.show('Erro ao gerar QR Code', 'error');
                console.error('Erro ao gerar QR Code:', err);
                return;
            }
            
            loading.remove();
            container.appendChild(canvas);
            canvas.classList.add('lazy-load');
            canvas.classList.add('loaded');
        });
    }

    static generateAll() {
        for (let i = 1; i <= 4; i++) {
            const container = document.getElementById(`qrcode${i}`);
            const url = container.href;
            this.generateQR(`qrcode${i}`, url);
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Gerar QR Codes
    QRGenerator.generateAll();

    // Atualizar ano
    document.getElementById('year').textContent = new Date().getFullYear();

    // Idioma
    const toggleLang = document.getElementById('toggleLang');
    let currentLang = 'en';

    toggleLang.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pt' : 'en';
        toggleLang.textContent = currentLang === 'en' ? 'Português' : 'English';
        document.querySelectorAll('[data-pt]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
        Feedback.show('Idioma alterado com sucesso!');
    });

    // Impressão
    document.getElementById('printBtn').addEventListener('click', () => {
        Feedback.show('Página sendo preparada para impressão...');
        window.print();
    });

    // Tema
    const toggleTheme = document.getElementById('toggleTheme');
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        Feedback.show('Tema alterado com sucesso!');
    });

    // Dropdown
    const btn = document.getElementById('dropdownBtn');
    const menu = document.getElementById('dropdown-menu');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('show');
        } else {
            btn.setAttribute('aria-expanded', 'true');
            menu.classList.add('show');
        }
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
    });

    // Citações
    const quotes = [
        // ... mantém as citações existentes
    ];

    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById('quote');
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex];
    }, 5000);
});
