<div align="center">
  <img src="frontend/public/MindTrackLogo.png" alt="MindTrack Logo" width="130" />

  <h1>MindTrack</h1>
  <p>Sistema de acompanhamento de estudos — organize suas matérias, gerencie tarefas e visualize seu progresso em tempo real.</p>

  <img src="https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk" />
  <img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=flat-square&logo=springboot" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite" />
</div>

---

## Funcionalidades

- Cadastro e gerenciamento de matérias
- Criação de tarefas com prioridade (Alta, Média, Baixa)
- Marcar tarefas como concluídas
- Barra de progresso por matéria
- Dashboard com visão geral: total de matérias, tarefas concluídas e percentual geral
- Gráfico de conclusão geral (doughnut chart)

---

## Tecnologias

**Backend**
- Java 17
- Spring Boot 4
- Spring Data JPA + Hibernate
- MySQL 8
- Maven

**Frontend**
- React 18
- Vite 5
- Chart.js + react-chartjs-2
- CSS puro com variáveis customizadas

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Node.js 18+](https://nodejs.org/)
- [MySQL 8](https://dev.mysql.com/downloads/)

---

## Configuração

### Banco de dados

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE mindtrack;
```

### Variáveis de ambiente

O backend lê a senha do banco via variável de ambiente. Configure antes de rodar:

```bash
# Linux / macOS
export DB_PASSWORD=sua_senha_aqui

# Windows (cmd)
set DB_PASSWORD=sua_senha_aqui
```

> As demais configurações ficam em `src/main/resources/application.properties`.  
> O Hibernate cria e atualiza as tabelas automaticamente (`ddl-auto=update`).

---

## Como rodar

### Backend (Spring Boot)

```bash
# Na raiz do projeto
./mvnw spring-boot:run
```

O servidor sobe em `http://localhost:8080`.

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

---

## Endpoints da API

### Matérias — `/subjects`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/subjects` | Lista todas as matérias |
| `POST` | `/subjects` | Cria uma nova matéria |
| `PUT` | `/subjects/{id}` | Atualiza uma matéria |
| `DELETE` | `/subjects/{id}` | Remove uma matéria |

### Tarefas — `/tasks`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/tasks` | Lista todas as tarefas |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/{id}/complete` | Marca tarefa como concluída |
| `DELETE` | `/tasks/{id}` | Remove uma tarefa |

**Exemplo — criar tarefa:**
```json
POST /tasks
{
  "title": "Resolver lista de exercícios",
  "priority": "ALTA",
  "subject": { "id": 1 }
}
```

---

## Estrutura do projeto

```
mindtrack/
├── src/                          # Backend Spring Boot
│   └── main/java/com/example/demo/
│       ├── config/               # Configuração de CORS
│       ├── controller/           # Endpoints REST
│       ├── model/                # Entidades JPA (Subject, Task)
│       ├── repository/           # Interfaces JPA
│       └── service/              # Regras de negócio
├── frontend/                     # Frontend React
│   ├── public/
│   │   └── MindTrackLogo.png
│   └── src/
│       ├── components/           # Dashboard, SubjectList, TaskList, Sidebar
│       ├── services/
│       │   └── api.js            # Comunicação com o backend
│       ├── App.jsx
│       └── index.css
└── pom.xml
```

---

<div align="center">
  <sub>Feito com dedicação para tornar os estudos mais organizados.</sub>
</div>
