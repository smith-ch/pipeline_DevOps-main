🎉 Integrantes del Proyecto 🎉

👨‍💻 Smith Rodriguez 2023-1123

🌐 Aplicación Web Simple 🌐

Descripción
Este repositorio alberga una aplicación web sencilla diseñada para demostrar un flujo completo de desarrollo y despliegue:

🖥️ Frontend: HTML, CSS y JavaScript puro

⚙️ Backend: Node.js con Express

🗄️ Base de datos: MySQL (inicializada automáticamente por Docker Compose)

🐳 Contenedores: Docker & Docker Compose

🚀 CI/CD: GitHub Actions (compilación, pruebas y publicación de imagen en GitHub Container Registry)

📊 Monitoreo y logging: Winston + endpoint de salud

🔧 Tecnologías 🔧

Node.js ≥18

Express 4.x

MySQL 5.7+

Docker & Docker Compose

GitHub Actions

Jest & Supertest

Winston para logging

GHCR para alojamiento de imágenes Docker

📂 Estructura del Proyecto 📂

pgsql
Copiar
Editar
mi-proyecto/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── tests/
│       ├── unit/
│       │   └── example.test.js
│       └── integration/
│           └── example.integration.test.js
├── database/
│   └── schema.sql
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci-cd.yml
Clonar el repositorio
👾 git clone https://github.com/<tu_usuario>/mi-proyecto.git
🔑 cd mi-proyecto

Configuración de variables de entorno
💡 Copia backend/.env.example a backend/.env (o crea backend/.env) con:

ini
Copiar
Editar
PORT=3000
DB_HOST=db
DB_USER=root
DB_PASSWORD=mipassword
DB_NAME=mydatabase
Levantar servicios con Docker Compose
🐳 docker-compose up --build -d

Verificar
🔍 docker ps

🖥️ Ejecución Local (sin Docker) 🖥️

cd backend

npm install

npm start

🖋️ Descripción de Componentes 🖋️

Frontend
📄 index.html: página principal
🎨 styles.css: estilos básicos
📡 script.js: petición fetch al endpoint /api/saludo

Backend
🖥️ server.js:

Conexión a MySQL usando mysql2/promise

Logger con Winston

Rutas:

GET /api/saludo → { mensaje: 'Hola desde el backend!' }

GET /health → HTTP 200 "OK"

Base de Datos
💾 database/schema.sql:

sql
Copiar
Editar
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🐋 Docker & Docker Compose 🐋

Dockerfile

dockerfile
Copiar
Editar
FROM node:18
WORKDIR /usr/src/app
COPY backend/package*.json ./backend/
WORKDIR /usr/src/app/backend
RUN npm install
COPY backend/ .
EXPOSE 3000
CMD ["node", "server.js"]
docker-compose.yml

yaml
Copiar
Editar
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      PORT: 3000
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: mipassword
      DB_NAME: mydatabase

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: mipassword
      MYSQL_DATABASE: mydatabase
    volumes:
      - db_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql

volumes:
  db_data:
🚀 CI/CD con GitHub Actions 🚀

yaml
Copiar
Editar
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline
permissions:
  contents: read
  packages: write

on: [push, pull_request]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with: node-version: '18'
      - run: |
          cd backend
          npm install
          npm test

  docker-build-push:
    needs: build-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - run: |
          IMAGE=ghcr.io/${{ github.repository_owner }}/mi-app:latest
          docker build -t $IMAGE .
          docker push $IMAGE
🧪 Pruebas Automatizadas 🧪

Ejecutar en la terminal:

bash
Copiar
Editar
cd backend
npm test
Invoca Jest con:

json
Copiar
Editar
"scripts": {
  "test": "node node_modules/jest/bin/jest.js --runInBand"
}
📊 Monitoreo & Logging 📊

Winston: logs JSON en consola

Endpoint /health: útil para sondas de disponibilidad

Estrategias futuras: integración con Prometheus, Grafana o Datadog

💡 Lecciones Aprendidas 💡

Alineación de versiones Node.js (local vs CI).

Uso de permisos packages: write y token GHCR.

Invocar Jest con node ... jest.js para evitar permisos denegados.
