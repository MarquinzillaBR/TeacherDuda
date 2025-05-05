// Gerar os QR Codes nos links
for (let i = 1; i <= 4; i++) {
    const container = document.getElementById(`qrcode${i}`); // Seleciona o elemento <a> correspondente ao QR Code
    const url = container.href; // Obtém o link do QR Code

    // Gera o QR Code e o adiciona ao elemento <a>
    QRCode.toCanvas(url, {
        width: 160, // Largura do QR Code
        margin: 2, // Margem ao redor do QR Code
        color: {
            dark: '#222', // Cor do QR Code
            light: '#fff' // Cor de fundo do QR Code
        }
    }, (err, canvas) => {
        if (!err) container.appendChild(canvas); // Adiciona o canvas do QR Code ao elemento <a> se não houver erro
    });
}

// Alternar idioma
const toggleLang = document.getElementById('toggleLang'); // Seleciona o botão de alternar idioma
let currentLang = 'en'; // Define o idioma atual como inglês

toggleLang.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'pt' : 'en'; // Alterna entre inglês e português
    toggleLang.textContent = currentLang === 'en' ? 'Português' : 'English'; // Atualiza o texto do botão

    // Atualiza o texto dos elementos com atributos data-pt e data-en
    document.querySelectorAll('[data-pt]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`); // Altera o texto para o idioma selecionado
    });
});

// Botão de imprimir
document.getElementById('printBtn').addEventListener('click', () => {
    window.print(); // Aciona a função de impressão do navegador
});

// Atualiza o ano dinâmico no rodapé
document.getElementById('year').textContent = new Date().getFullYear(); // Define o ano atual

// Alternar tema (claro/escuro)
const toggleTheme = document.getElementById('toggleTheme'); // Seleciona o botão de alternar tema
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark'); // Alterna a classe 'dark' no corpo da página
    toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; // Atualiza o texto do botão com base no tema atual
});

// Frases sobre mães que vão mudar a cada 5 segundos
const quotes = [
    "In a mother's eyes, every day is unique.",
    "A mother's love knows no bounds.",
    "To be a mother is to understand life in a way no one else can.",
    "A mother is capable of anything for her child.",
    "Motherhood is a daily miracle.",
    "The best part of being a mother is teaching to be better every day.",
    "A mother's strength is invisible but unbreakable.",
    "A mother's love is the foundation of life.",
    "A mother's heart is immense and full of love.",
    "Mother is the name of God on our lips and in our hearts."
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('quote');

// Atualiza a frase a cada 5 segundos
setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length; // Vai para a próxima frase, e volta ao início se chegar no final
    quoteElement.textContent = quotes[currentQuoteIndex]; // Atualiza o conteúdo da frase
}, 5000); // Altera a frase a cada 5 segundos
