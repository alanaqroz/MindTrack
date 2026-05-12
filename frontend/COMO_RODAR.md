# Como rodar o MindTrack no IntelliJ

## Estrutura do projeto
```
demo/
  src/              ← backend Spring Boot (já existia)
  frontend/         ← frontend React (novo)
```

---

## 1. Instalar dependências do frontend

No IntelliJ, abra o **Terminal** (aba no rodapé ou Alt+F12) e rode:

```bash
cd frontend
npm install
```

Isso vai baixar React, Vite, Chart.js e tudo mais do package.json.

---

## 2. Rodar o frontend

Ainda no terminal, dentro da pasta `frontend`:

```bash
npm run dev
```

O Vite vai iniciar em: **http://localhost:5173**

---

## 3. Rodar o backend

No IntelliJ, rode o `DemoApplication.java` normalmente (botão ▶ verde).
O backend vai rodar em: **http://localhost:8080**

---

## Dica: dois terminais no IntelliJ

Você pode ter dois terminais abertos ao mesmo tempo:
- Um rodando `npm run dev` (frontend)
- O outro livre para qualquer coisa

Clique no `+` na aba Terminal para abrir um segundo.

---

## Variável de ambiente DB_PASSWORD

Se ainda não configurou, no IntelliJ:
Edit Configurations → Environment Variables → adicione:
```
DB_PASSWORD=sua_senha_do_mysql
```

---

## Resumo

| O que         | Onde rodar           | URL                    |
|---------------|----------------------|------------------------|
| Backend       | IntelliJ (▶ Run)    | http://localhost:8080  |
| Frontend      | terminal: npm run dev| http://localhost:5173  |
| Swagger API   | —                    | http://localhost:8080/swagger-ui.html |
