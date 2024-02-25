function createList2() {
    const textInput = document.getElementById('textarea');
    const text = textInput.value;

    // Remover todos os espaços do texto
    const textSemEspacos = text.replace(/\s/g, '');

    // Split the text by comma
    const items = textSemEspacos.split(',');
    
    // Loop through each item in the list and print it using getListFromLocalStorage
    let index = 0; // Inicia o índice no primeiro item da lista
    const intervalo = setInterval(() => { // Define um intervalo de tempo para a execução das mensagens
        const item = items[index]; // Obtém o item atual

        const valores_fechamento = getListFromLocalStorage(item);
        const ema = calcularEMA(valores_fechamento);
        const ultimoValor = valores_fechamento[valores_fechamento.length - 1];
        const rsi = calcularRSI(valores_fechamento, 14);

        const mensagem = formatarMensagem(item,formatarValorBRL(ultimoValor),formatarValorBRL(ema),indicacaoCompraVendaEma(ultimoValor,ema),(rsi),indicacaoCompraVendaRsi(rsi));

        inserirMensagem(mensagem);
        enviar(mensagem).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });

        index++; // Incrementa o índice para a próxima mensagem

        // Verifica se todas as mensagens foram enviadas
        if (index === items.length) {
            clearInterval(intervalo); // Para o intervalo de execução das mensagens
        }
    }, 5000); // 10000 milissegundos = 10 segundos
}
function indicacaoCompraVendaEma(valor, ema) {
    // console.log(valor,ema);
    if (valor > ema ) {
        return "Venda 🔴";
    } else if (valor < ema ) {
        return "Compra 🟢";
    }
}
function calcularEMA(lista) {
  const periodo = 8; // Número de valores utilizados para calcular a EMA
  const alpha = 2 / (periodo + 1); // Fator de suavização
  let ema = [];

  // Inicialização da EMA com a média dos primeiros 'periodo' valores
  let somaInicial = 0;
  for (let i = 0; i < periodo; i++) {
    somaInicial += parseFloat(lista[i]);
  }
  ema.push(somaInicial / periodo);

  // Cálculo da EMA para os valores restantes
  for (let i = periodo; i < lista.length; i++) {
    let valorEMA = (parseFloat(lista[i]) - ema[ema.length - 1]) * alpha + ema[ema.length - 1];
    ema.push(valorEMA);
  }

  // Retorna o último valor da EMA
  return ema[ema.length - 1].toFixed(4);
}

function calcularRSI(lista, periodo = 14) {
    let ganhos = [];
    let perdas = [];

    // Calcular ganhos e perdas
    for (let i = 1; i < lista.length; i++) {
        let diferenca = lista[i] - lista[i - 1];
        if (diferenca > 0) {
            ganhos.push(diferenca);
            perdas.push(0);
        } else {
            ganhos.push(0);
            perdas.push(-diferenca);
        }
    }

    // Calcular média dos ganhos e das perdas
    let mediaGanhos = ganhos.slice(0, periodo).reduce((a, b) => a + b, 0) / periodo;
    let mediaPerdas = perdas.slice(0, periodo).reduce((a, b) => a + b, 0) / periodo;

    // Calcular RSI
    let rs = mediaGanhos / mediaPerdas;
    let rsi = 100 - (100 / (1 + rs));

    return rsi.toFixed(2);
}

function indicacaoCompraVendaRsi(rsi, limiarCompra = 30, limiarVenda = 70) {
    if (rsi >= limiarVenda) {
        return "Venda 🔴";
    } else if (rsi <= limiarCompra) {
        return "Compra 🟢";
    } else {
        return "Neutro 🟡";
    }
}
async function enviar(mensagem) {

    const url = localStorage.getItem('endereco');
    const accessToken = localStorage.getItem('accessToken');
    const numero = localStorage.getItem('telefone');
    const payload = JSON.stringify({
        number: numero,
        options: {
            delay: 1200,
            presence: "composing",
            linkPreview: false
        },
        textMessage: {
            text: mensagem
        }
    });
    const headers = {
        'Content-Type': 'application/json',
        'apikey': accessToken
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: payload
    });
    return response.json();
}
function formatarMensagem(nome,ultimoValor, ema, indicacaoEma, rsi, indicacaoRsi) {
    return `
    Criptomoeda: ${nome}\n
    _________________\n
    Último Valor: ${ultimoValor}\n
    EMA: ${ema}\n
    Indicação EMA: ${indicacaoEma}\n
    RSI: ${rsi}\n
    Indicação RSI: ${indicacaoRsi}\n
    `;
}

function formatarValorBRL(valor) {
    if (valor !== null) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor);
    } else {
        return 0;
    }
}

function inserirMensagem(mensagem) {
    // Cria um elemento de div para o card

    const card = document.createElement('div');
    card.classList.add('col-md-3');
    card.classList.add('card'); // Adiciona a classe 'card' ao elemento div

    // Cria um elemento de parágrafo para a mensagem
    const paragrafo = document.createElement('p');
    const linhas = mensagem.split('\n'); // Divide a mensagem em linhas com base no caractere '\n'

    // Adiciona cada linha ao parágrafo
    linhas.forEach(linha => {
        const linhaElemento = document.createElement('span');
        linhaElemento.textContent = linha; // Define o texto da linha como a linha atual
        paragrafo.appendChild(linhaElemento); // Adiciona a linha ao parágrafo
        paragrafo.appendChild(document.createElement('br')); // Adiciona uma quebra de linha após a linha
    });

    // Remove a última quebra de linha
    paragrafo.removeChild(paragrafo.lastChild);

    // Adiciona o parágrafo ao card
    card.appendChild(paragrafo);

    // Cria um elemento de linha horizontal
    const linhaHorizontal = document.createElement('hr');

    // Obtém a div com id "listOutput"
    const divOutput = document.getElementById('listOutput');

    // Adiciona o card e a linha horizontal à div "listOutput"
    divOutput.appendChild(card);
    divOutput.appendChild(linhaHorizontal);
}
