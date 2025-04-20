# Usar la imagen oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de backend
COPY backend/package*.json ./backend/
WORKDIR /usr/src/app/backend
RUN npm install

# Copiar el resto del código de backend
COPY backend/ .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
