from datetime import datetime
import pandas as pd
import json, sys

# Carregar os dados do arquivo JSON
try:
    with open("pesquisa.json", "r", encoding="utf-8") as file:
        dados = json.load(file)
except FileNotFoundError:
    print("❌ Arquivo 'pesquisa.json' não encontrado. Certifique-se de que o arquivo está na mesma pasta que este script.")
    input("Pressione Enter para fechar...")
    sys.exit(1)

# Transformar os dados para que os fornecedores fiquem na mesma linha do produto
linhas = []
for item in dados:
    fornecedores = item["fornecedores"]
    
    # Garantindo que sempre temos 3 fornecedores (caso algum item tenha menos de 3)
    while len(fornecedores) < 3:
        fornecedores.append({"cnpj": "", "razaoSocial": "", "preco": ""})

    # Criar a linha com os fornecedores na mesma linha do produto
    linha = [
        item["catserv"], item["nome"], item["quantidade"], item["precoMedio"],
        fornecedores[0]["cnpj"], fornecedores[0]["razaoSocial"], fornecedores[0]["preco"],
        fornecedores[1]["cnpj"], fornecedores[1]["razaoSocial"], fornecedores[1]["preco"],
        fornecedores[2]["cnpj"], fornecedores[2]["razaoSocial"], fornecedores[2]["preco"]
    ]
    linhas.append(linha)

# Criar um DataFrame do Pandas
df = pd.DataFrame(linhas, columns=[
    "catserv", "nome", "quantidade", "precoMedio",
    "cnpj1", "razaoSocial1", "preco1",
    "cnpj2", "razaoSocial2", "preco2",
    "cnpj3", "razaoSocial3", "preco3"
])

df["precoMedio"] = pd.to_numeric(df["precoMedio"].str.replace(",", "."), errors="coerce")
df["preco1"] = pd.to_numeric(df["preco1"].str.replace(",", "."), errors="coerce")
df["preco2"] = pd.to_numeric(df["preco2"].str.replace(",", "."), errors="coerce")
df["preco3"] = pd.to_numeric(df["preco3"].str.replace(",", "."), errors="coerce")

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
file_name = f"cotacao-{timestamp}.xlsx"

# Salvar como arquivo Excel
df.to_excel(file_name, index=False, engine="openpyxl")

print(f"Planilha salva no arquivo: {file_name}")
input("Pressione Enter para fechar...")