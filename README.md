# Criptomoedas - Monitoramento e Análise de Preços

Este projeto tem como objetivo monitorar e analisar os preços de criptomoedas em tempo real. Ele utiliza a API da Binance para obter os dados de fechamento de preços das criptomoedas e fornece análises de médias móveis exponenciais (EMA) e Índice de Força Relativa (RSI) para auxiliar nas decisões de compra e venda.

## Configurações

Antes de utilizar o projeto, é necessário configurar os seguintes parâmetros:

- **Endereço da API**: Informe o endereço da API de mensagens que você utilizará para enviar os alertas.
- **Access Token**: Informe o token de acesso para autenticação na API de mensagens.
- **Número de Telefone**: Informe o número de telefone para o qual os alertas serão enviados.

## Como Utilizar

1. **Atualizar a Lista de Criptomoedas**: Insira os nomes das criptomoedas que deseja monitorar no campo de texto e clique em "Atualizar Lista". As criptomoedas devem ser separadas por vírgula.
2. **Processar Dados**: Após atualizar a lista, clique em "Processar" para iniciar o monitoramento e análise das criptomoedas.
3. **Análise de Dados**: Os dados de fechamento de preços, EMA e RSI serão exibidos em formato de card, para cada criptomoeda na lista.
4. **Envio de Alertas**: Após a análise, os alertas de compra ou venda serão enviados para o número de telefone configurado.

## Observações

- A lista de criptomoedas é armazenada localmente no navegador, utilizando o Local Storage.
- A análise de dados é realizada de forma assíncrona, em intervalos de 5 segundos, para evitar sobrecarga na API da Binance.
- Os alertas de compra ou venda são enviados somente se houver uma indicação clara de tendência.



[Faça o teste](https://betinribeiro.github.io/analise_grafica)
Telefone para contato: (88) 98112-6816
