// Array com as 20 perguntas do quiz
const quizQuestions = [
    {
        question: "Qual o nome completo da protagonista humana?",
        options: ["Bella Marie Swan", "Isabella Swan Cullen", "Isabella 'Bella' Swan", "Mary Alice Swan"],
        answer: "Isabella 'Bella' Swan"
    },
    {
        question: "Qual é o poder especial de Edward Cullen?",
        options: ["Manipular emoções", "Ver o futuro", "Ler mentes", "Super força"],
        answer: "Ler mentes"
    },
    {
        question: "Qual o nome do patriarca da Família Cullen?",
        options: ["Carlisle", "Jasper", "Emmett", "Aro"],
        answer: "Carlisle"
    },
    {
        question: "A qual tribo Jacob Black pertence?",
        options: ["Denali", "Volturi", "Quileute", "Nomads"],
        answer: "Quileute"
    },
    {
        question: "Qual é a cor dos olhos dos vampiros 'vegetarianos' (que bebem sangue animal)?",
        options: ["Vermelho", "Preto", "Azul", "Dourado"],
        answer: "Dourado"
    },
    {
        question: "Qual é o nome da mãe de Bella Swan?",
        options: ["Renesmee", "Esme", "Rosalie", "Renée"],
        answer: "Renée"
    },
    {
        question: "Onde o primeiro filme da saga se passa majoritariamente?",
        options: ["Phoenix, Arizona", "Forks, Washington", "Denali, Alaska", "Volterra, Itália"],
        answer: "Forks, Washington"
    },
    {
        question: "Qual o dom de Alice Cullen?",
        options: ["Ver o futuro", "Super velocidade", "Manipular o fogo", "Controlar a água"],
        answer: "Ver o futuro"
    },
    {
        question: "Qual o nome da filha de Edward e Bella?",
        options: ["Isabelle", "Renesmee", "Elizabeth", "Marie"],
        answer: "Renesmee"
    },
    {
        question: "Qual dos Cullen tem mais dificuldade em controlar sua sede por sangue humano?",
        options: ["Emmett", "Jasper", "Rosalie", "Alice"],
        answer: "Jasper"
    },
    {
        question: "Qual o veículo de Edward Cullen no primeiro filme?",
        options: ["Ferrari", "Volvo", "Porsche", "Ford"],
        answer: "Volvo"
    },
    {
        question: "Quem transforma Bella Swan em vampira?",
        options: ["Carlisle", "Edward", "Jacob", "Ela mesma"],
        answer: "Edward"
    },
    {
        question: "Qual o apelido de Renesmee Cullen?",
        options: ["Nessie", "Rene", "Esmezinha", "Rose"],
        answer: "Nessie"
    },
    {
        question: "O que os lobisomens Quileute fazem quando encontram a 'parceira perfeita'?",
        options: ["Cortejam", "Imprimem", "Caçam", "Transformam"],
        answer: "Imprimem"
    },
    {
        question: "Qual o nome do primeiro vampiro que tenta caçar Bella?",
        options: ["Laurent", "Caius", "James", "Felix"],
        answer: "James"
    },
    {
        question: "Qual o nome da esposa de Carlisle Cullen?",
        options: ["Alice", "Rosalie", "Esme", "Victoria"],
        answer: "Esme"
    },
    {
        question: "Em que filme Edward e Bella se casam?",
        options: ["Crepúsculo", "Lua Nova", "Eclipse", "Amanhecer - Parte 1"],
        answer: "Amanhecer - Parte 1"
    },
    {
        question: "O que Rosalie Hale era em sua vida humana?",
        options: ["Médica", "Socialite", "Dona de casa", "Estudante"],
        answer: "Socialite"
    },
    {
        question: "Em qual estado o casamento de Edward e Bella acontece?",
        options: ["Washington", "Arizona", "Itália", "Brasil"],
        answer: "Washington"
    },
    {
        question: "Qual o dom/habilidade de Bella Cullen (como vampira)?",
        options: ["Telecinese", "Escudo Mental", "Controle do Tempo", "Ilusão"],
        answer: "Escudo Mental"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;


const startQuizButton = document.getElementById('start-quiz');
const questionsArea = document.getElementById('questions-area');
const resultsArea = document.getElementById('results-area');
const scoreText = document.getElementById('score-text');


// Função para embaralhar as opções
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Função para iniciar o Quiz
function startQuiz() {
    quizStarted = true;
    score = 0;
    currentQuestionIndex = 0;
   
    // Embaralha as perguntas (opcional, mas bom para rejogabilidade)
    shuffleArray(quizQuestions);
   
    startQuizButton.style.display = 'none';
    resultsArea.style.display = 'none';
    questionsArea.innerHTML = '';
   
    loadQuestion();
}


// Função para carregar a próxima pergunta
function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const q = quizQuestions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.className = 'question-card';
        questionElement.innerHTML = `
            <h3>Pergunta ${currentQuestionIndex + 1} de 20:</h3>
            <p>${q.question}</p>
        `;
       
        // Embaralha as opções
        const options = [...q.options];
        shuffleArray(options);
       
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.onclick = () => selectAnswer(option, q.answer, button);
            questionElement.appendChild(button);
        });


        questionsArea.innerHTML = '';
        questionsArea.appendChild(questionElement);
    } else {
        showResults();
    }
}


// Função para selecionar a resposta
function selectAnswer(selectedOption, correctAnswer, clickedButton) {
    // Desabilita todos os botões após a seleção
    const buttons = questionsArea.querySelectorAll('.option-button');
    buttons.forEach(btn => btn.disabled = true);


    if (selectedOption === correctAnswer) {
        score++;
        clickedButton.classList.add('correct');
    } else {
        clickedButton.classList.add('incorrect');
        // Opcional: Destacar a resposta correta
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }


    // Avança para a próxima pergunta após um pequeno atraso
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}


// Função para mostrar os resultados finais
function showResults() {
    questionsArea.innerHTML = '';
    resultsArea.style.display = 'block';


    const percentage = (score / quizQuestions.length) * 100;
    let message = '';


    if (percentage === 100) {
        message = `Parabéns! Você é um **membro honorário dos Cullen**! Acertou ${score} de ${quizQuestions.length} perguntas (100%).`;
    } else if (percentage >= 70) {
        message = `Ótimo resultado! Você é um fã dedicado. Acertou ${score} de ${quizQuestions.length} perguntas.`;
    } else if (percentage >= 40) {
        message = `Bom começo. Você conhece a história, mas precisa rever alguns detalhes! Acertou ${score} de ${quizQuestions.length} perguntas.`;
    } else {
        message = `Ops... Parece que você precisa de uma maratona da saga! Acertou ${score} de ${quizQuestions.length} perguntas.`;
    }


    scoreText.innerHTML = message;
    startQuizButton.textContent = "Jogar Novamente";
    startQuizButton.style.display = 'block';
}


// Event Listener para o botão de começar
startQuizButton.addEventListener('click', startQuiz);

