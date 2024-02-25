const key = "lista_criptomoedas";
const days = "56";

// Função para verificar se há algo no localStorage ao carregar a página
window.onload = function() {
    const itemsFromLocalStorage = getListFromLocalStorage(key);
    
    // Se houver algo no localStorage, preencher o campo de texto com esses dados
    if (itemsFromLocalStorage) {
        const textInput = document.getElementById('textarea');
        textInput.value = itemsFromLocalStorage.join(', ');
    }
};

// Função para criar a lista e imprimir os dados de fechamento de preços da criptomoeda em um card no HTML
async function createList() {
    const textInput = document.getElementById('textarea');
    const listOutput = document.getElementById('listOutput');
    const text = textInput.value;

    // Remover todos os espaços do texto
    const textSemEspacos = text.replace(/\s/g, '').toUpperCase();

    // Split the text by comma
    const items = textSemEspacos.split(',');
    saveListToLocalStorage(key, items)
    const itemsFromLocalStorage = getListFromLocalStorage(key)
    // Create an unordered list and append each item to it
    itemsFromLocalStorage.forEach(async item => {
        await printClosingPrices(item, days);
    });
    // Clear the list output and append the new list

}

// Função para salvar a lista no localStorage
function saveListToLocalStorage(key, list) {
    // Convert the list to a JSON string
    const jsonString = JSON.stringify(list);
    
    // Save the JSON string to localStorage under the specified key
    localStorage.setItem(key, jsonString);
}

// Função para recuperar a lista do localStorage
function getListFromLocalStorage(key) {
    // Retrieve the JSON string from localStorage under the specified key
    const jsonString = localStorage.getItem(key);
    
    // Convert the JSON string back to a list
    const list = JSON.parse(jsonString);
    
    // Return the list
    return list;
}

// Função para obter os dados de fechamento de preços da criptomoeda da API da Binance
async function getClosingPrices(cripto, days) {
    // console.log(cripto,days);
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${cripto}USDT&interval=1d&limit=${days}`);
    const data = await response.json();
    
    const closingPrices = data.map(entry => parseFloat(entry[4]));
    
    return closingPrices;
}// Função para imprimir os dados de fechamento de preços da criptomoeda em um card no HTML
async function printClosingPrices(cripto, days) {
    // const listOutput = document.getElementById('listOutput');
    const closingPrices = await getClosingPrices(cripto, days);

    // // Create a card to display the cripto name and prices
    // const card = document.createElement('div');
    // card.className = 'card';
    // card.style.width = '18rem';
    // card.style.margin = '1rem';

    // const cardHeader = document.createElement('div');
    // cardHeader.className = 'card-header';
    // cardHeader.textContent = cripto;
    // card.appendChild(cardHeader);

    // const cardBody = document.createElement('div');
    // cardBody.className = 'card-body';

    // // Create a paragraph to display the closing prices
    // const closingPricesParagraph = document.createElement('p');
    // // closingPricesParagraph.textContent = closingPrices.map(price => price.toFixed(2)).join(', ');
    // cardBody.appendChild(closingPricesParagraph);

    // card.appendChild(cardBody);

    // listOutput.appendChild(card);

    // Save the closing prices to localStorage
    saveListToLocalStorage(cripto, closingPrices);
}

function salvarConfiguracoes() {
    const endereco = document.getElementById('endereco').value;
    const accessToken = document.getElementById('accessToken').value;
    const telefone = document.getElementById('telefone').value;

    localStorage.setItem('endereco', endereco);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('telefone', telefone);

    alert('Configurações salvas com sucesso!');
}

function preencherFormulario() {
    
    const url = localStorage.getItem('endereco');
    const accessToken = localStorage.getItem('accessToken');
    const numero = localStorage.getItem('telefone');

    document.getElementById('endereco').value = url;
    document.getElementById('accessToken').value = accessToken;
    document.getElementById('telefone').value = numero;
}

preencherFormulario();
