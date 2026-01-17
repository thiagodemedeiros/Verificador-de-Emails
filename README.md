# 📧 Verificador de Produtividade de E-mails

Este projeto tem como objetivo **analisar e classificar e-mails como produtivos ou improdutivos**, utilizando **LLMs (Large Language Models)** por meio de **APIs externas**. A aplicação foi pensada de forma escalável, desacoplada e resiliente, utilizando filas e workers assíncronos.

---

## 🧠 Visão Geral da Arquitetura

A arquitetura do projeto é composta pelos seguintes componentes:

- **Front-end (React + TypeScript)**\
  Interface amigável para o usuário enviar o conteúdo do e-mail para análise.

- **Back-end (Flask – Python)**\
  Responsável por receber as requisições do front-end e publicar as mensagens em uma fila do RabbitMQ.

- **Fila (RabbitMQ – Cloud)**\
  Garante o processamento assíncrono e desacoplado das requisições.

- **Worker (Python)**\
  Consome a fila do RabbitMQ e realiza a análise do e-mail utilizando LLMs via APIs externas.

- **APIs de LLM**

  - **OpenRouter (API principal)**
  - **Gemini (API secundária / fallback)**

Caso a OpenRouter esteja indisponível ou não consiga responder, o sistema automaticamente utiliza a API do Gemini como alternativa.

---

## 🔄 Fluxo da Aplicação

1. O usuário insere o conteúdo do e-mail no front-end.
2. O front-end envia a requisição para a API Flask.
3. O Flask publica a mensagem na fila do RabbitMQ.
4. O worker consome a mensagem da fila.
5. O worker chama a OpenRouter para classificar o e-mail.
6. Em caso de falha, o worker utiliza a Gemini como fallback.
7. O resultado da análise é retornado (ou armazenado, dependendo da implementação).

---

## 🛠️ Tecnologias Utilizadas

### Back-end / Worker

- Python 3.12.10
- Flask
- RabbitMQ
- Pika
- OpenRouter API
- Gemini API

### Front-end

- React
- TypeScript
- Vite&#x20;

### Infraestrutura

- RabbitMQ hospedado na nuvem
- APIs externas de LLM

---

## ▶️ Como Inicializar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/thiagodemedeiros/Verificador-de-Emails Verificador-de-Emails
cd Verificador-de-Emails
```

---

### 2️⃣ Inicializar o Back-end (Flask)

```bash
cd BackEnd/flask
python -m venv venv
source venv/bin/activate  # Linux / macOS
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python app.py
```

A API Flask ficará disponível, por padrão, em:

```
http://localhost:5000
```

---

### 3️⃣ Inicializar o Worker

Em outro terminal:

```bash
cd BackEnd/worker
python -m venv venv
source venv/bin/activate  # Linux / macOS
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python worker.py
```

O worker ficará escutando continuamente a fila do RabbitMQ.

---

### 4️⃣ Inicializar o Front-end

```bash
cd frontend
npm install
npm run dev
```

O front-end ficará disponível em algo como:

```
http://localhost:5173
```

---

## ✅ Funcionalidades Principais

- Classificação de e-mails como **produtivos** ou **improdutivos**
- Processamento assíncrono com RabbitMQ
- Fallback automático entre OpenRouter e Gemini
- Arquitetura desacoplada e escalável
- Interface amigável para o usuário

---

## 🚀 Possíveis Melhorias Futuras

- Persistência dos resultados em banco de dados
- Autenticação de usuários
- Métricas e observabilidade (logs, tracing, etc.)
- Suporte a múltiplos idiomas
- Dashboard administrativo

##

