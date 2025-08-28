async function waitElement(fatherElement, selector, timeout = 10000, intervalo = 2000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const elemento = fatherElement.querySelector(selector);
        if (elemento) return elemento;
        await new Promise(resolve => setTimeout(resolve, intervalo));
    }
    return null;
}

async function extrairDadosCotacao() {
    const itens = document.querySelectorAll('#UlCotacaoItensBody > li');
    const resultados = [];
    for (const item of itens) {
        const quantidade = parseInt(item.getAttribute('data-quantidade'));
        const spanColItem = item.querySelector('.col-item span');
        const [catserv, ...nomeArray] = spanColItem.textContent.trim().split(' - ');
        const nome = nomeArray.join(' - ').trim();

        const botaoPreco = item.querySelector('.col-precos .ButtonMostrarPrecosComprasNet');
        const precoMedioTexto = parseFloat(botaoPreco.getAttribute('data-precoestimado').trim().replace('R$', '').replace(',', '.').trim()).toFixed(2);
        const precoMedio = precoMedioTexto ? precoMedioTexto.replace('.', ',') : "0,00";

        botaoPreco.click();        
        await waitElement(item,'.DivPrecosComprasNet_CotacaoItem #tablePrecos tbody');

        const fornecedores = [];
        const divPrecos = item.querySelector('.DivPrecosComprasNet_CotacaoItem');
        const tabelaPrecos = divPrecos?.querySelector('#tablePrecos tbody');

        if (tabelaPrecos) {
            const linhas = tabelaPrecos.querySelectorAll('tr');
            for (let i = 0; i < linhas.length; i += 2) {
                const linhaBasica = linhas[i];
                const botaoDetalhes = linhaBasica.querySelector('a.showmore');
                if (botaoDetalhes) {
                    botaoDetalhes.click();
                    await waitElement(linhas[i+1],'.PropostaVencedora');
                    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
                }

                const linhaDetalhada = linhas[i + 1];
                const detalheTd = linhaDetalhada?.querySelector('.PropostaVencedora');
                if (detalheTd) {
                    const cnpj = detalheTd.querySelector('.SpanFornecedorCNPJ')?.textContent.trim().split('\n')[0];
                    const razaoSocial = detalheTd.querySelector('td:nth-child(2)')?.textContent.trim().split('\n').pop().trim();
                    const precoTexto = parseFloat(detalheTd.querySelector('.valorPropostaFinal')?.textContent.replace('R$', '').replace('.','').replace(',', '.').trim()).toFixed(2);
                    const preco = precoTexto ? precoTexto.replace('.', ',') : "0,00";
                    fornecedores.push({ cnpj, razaoSocial, preco });
                }
                if (fornecedores.length === 3) break;
            }
        }

        resultados.push({ catserv, nome, quantidade, precoMedio, fornecedores });
    }
    const jsonData = JSON.stringify(resultados, null, 2);

    console.log(jsonData);
    downloadJson(jsonData, "pesquisa.json");
}

function downloadJson(dados, nomeArquivo) {
    const blob = new Blob([dados], { type: "application/json" });
    const a = document.createElement("a");
    
    a.href = URL.createObjectURL(blob);
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const prevBtnSign = document.querySelector('#div-gerar-etpr');

if (prevBtnSign) {
    const divGenerate = document.createElement("div");
    divGenerate.className = "d-inline-block me-2";

    const buttonGenerate = document.createElement("button");
    buttonGenerate.className = "btn btn-sm btn-white shadow fw-bold text-dark-warning";
    buttonGenerate.textContent = "Baixar Arquivo de Preços"
    buttonGenerate.addEventListener("click", extrairDadosCotacao);

    divGenerate.appendChild(buttonGenerate);

    prevBtnSign.parentNode.insertBefore(divGenerate, prevBtnSign);
}

// extrairDadosCotacao();