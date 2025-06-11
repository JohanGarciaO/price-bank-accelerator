# 🧾 Gerador de Planilhas de Cotação

Este projeto tem como objetivo facilitar a extração de dados de cotações no **Banco de Preços** e gerar automaticamente uma planilha Excel com os resultados.

---

## 🚀 Como utilizar

Siga os passos abaixo para utilizar o gerador:

### 1. Acesse a cotação desejada
- Abra o **Banco de Preços** e entre na cotação que você deseja extrair os dados.

### 2. Acesse o Console do Navegador
- Clique com o **botão direito do mouse** na página e selecione **"Inspecionar"**.
- Depois, vá até a aba **"Console"**.

### 3. Execute o script JavaScript
- No console, cole o conteúdo do arquivo [`gerarPesquisa.js`](./gerarPesquisa.js).
- Aguarde enquanto o script coleta os dados e salva tudo em um arquivo chamado **`pesquisa.json`**, que será baixado automaticamente.

### 4. Mova o arquivo baixado
- Após o download, mova o arquivo **`pesquisa.json`** para a mesma pasta onde está localizado o arquivo **`SheetGenerate.py`**.

---

## 🛠️ Requisitos

Antes de executar o script pela primeira vez, você precisa garantir que o **Python 3** esteja instalado em sua máquina.

Além disso, é necessário instalar as bibliotecas Python usadas no projeto. Para isso:

1. Abra um terminal (Prompt de Comando, PowerShell ou terminal do VSCode).
2. Navegue até o diretório onde estão os arquivos do projeto.
3. Execute o seguinte comando:
  ```
  pip install -r requirements.txt
  ```
> Isso instalará as bibliotecas **`pandas`** e **`openpyxl`**, utilizadas pelo script para gerar a planilha Excel.

---

## ✅ Execução do Script

Depois de instalar os requisitos e garantir que o arquivo `pesquisa.json` está na mesma pasta do script, execute:

```
python SheetGenerate.py
```

O script fará a leitura dos dados do JSON e criará automaticamente uma planilha Excel com todos os dados da cotação.

---

## 📁 Estrutura dos Arquivos

- `gerarPesquisa.js` – Script JavaScript que coleta os dados da cotação via console do navegador.
- `pesquisa.json` – Arquivo gerado automaticamente com os dados extraídos.
- `SheetGenerate.py` – Script Python que gera a planilha Excel.
- `requirements.txt` – Lista de dependências Python necessárias para execução do script.

---

## 🧩 Possíveis Erros

### ❌ Arquivo `pesquisa.json` não encontrado

Se você tentar executar o `SheetGenerate.py` sem ter o `pesquisa.json` no diretório, verá uma mensagem de erro como esta:

❌ Arquivo 'pesquisa.json' não encontrado. Certifique-se de que o arquivo está na mesma pasta que este script.

**Solução:**
- Verifique se o script `gerarPesquisa.js` foi executado corretamente.
- Verifique se o arquivo `pesquisa.json` foi baixado e movido para o local correto.

---

## 📌 Observações

- Não altere o nome do arquivo `pesquisa.json`.
- Siga os passos na ordem para garantir o funcionamento correto do processo.

---

Feito com 💻 para facilitar seu trabalho com cotações!
