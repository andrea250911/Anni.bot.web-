document.addEventListener('DOMContentLoaded', async () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    let knowledgeBase = {}; // Almacenará nuestras preguntas y respuestas

    // Función para cargar la base de conocimientos desde el JSON
    async function loadKnowledgeBase() {
        try {
            const response = await fetch('knowledgebase.json');
            knowledgeBase = await response.json();
            console.log('Base de conocimientos cargada:', knowledgeBase);
        } catch (error) {
            console.error('Error al cargar la base de conocimientos:', error);
            addMessage('Lo siento, no pude cargar mi base de conocimientos. Inténtalo de nuevo más tarde.', 'bot');
        }
    }

    // Cargar la base de conocimientos al iniciar la página
    await loadKnowledgeBase();

    // Función para añadir un mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', ${sender}-message);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazarse al último mensaje
    }

    // Función para obtener la respuesta del chatbot
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();

        // Iterar sobre las respuestas en la base de conocimientos
        for (const entry of knowledgeBase.responses) {
            // Verificar si alguna palabra clave de la entrada está contenida en el mensaje del usuario
            for (const keyword of entry.keywords) {
                if (lowerCaseMessage.includes(keyword.toLowerCase())) {
                    // Seleccionar una respuesta aleatoria si hay varias
                    const randomIndex = Math.floor(Math.random() * entry.answers.length);
                    return entry.answers[randomIndex];
                }
            }
        }
        return "Lo siento, no tengo una respuesta para esa pregunta específica. ¿Podrías reformularla o preguntar sobre otro tema?";
    }

    // Evento para enviar mensaje al hacer clic en el botón
    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value;
        if (userMessage.trim() === '') return; // No enviar mensajes vacíos

        addMessage(userMessage, 'user');
        userInput.value = ''; // Limpiar el input

        // Simular un tiempo de respuesta del bot
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, 500); // Retraso de 0.5 segundos para que parezca que "piensa"
    });

    // Evento para enviar mensaje al presionar Enter en el input
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click(); // Simular clic en el botón de enviar
        }
    });
});