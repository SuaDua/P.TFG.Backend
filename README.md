# Proyecto de backend - Compraventa/venta de Coches

Este proyecto trata sobre una API REST que esta desarrollada con Node.js con Express y MongoDB. Ha sido diseñada para gestionar usuarios, coches, fafturas y algunas funcionalidades avanzadas como favoritos y roles de administrador.

---


## 📁 Estructura del Proyecto

La estructura del proyecto es la siguiente:

- `src\`
    -`controllers/`: Aqui estan los controladores de la lógica del negocio.
    -`models/`: Aqui estan los modelos de datos con Moongoose.
    -`routes/`: Se definen las rutas de la API.
    -`middlewares/`: Aquí se encuentran los middlewares personalizados.
    -`swagger.yaml`: Este es el fichero donde esta la documentación de YAML para Swagger.
    -`test/`: Pruebas automatizadas con Jest.
---

## 🧪 Pruebas Automáticas

He procedido ha desarrollar unas pruebas unitarias y funcionales para validar el comportamiento de los principales controladores.

### ✅ Los tests que se ejecutan son los siguientes:
- `user.controller.test.js`
- `admin.controller.test.js`
- `car.controller.test.js`
- `test.js` (test de prueba general)

### ▶️ Manera de ejecutar los tests:

mediante el comando npm test

### Cómo visualizar la documentación Swagger:
1. Debes tener en cuenta que el proyecto está en ejecución:
  
   npm start
   

2. En el navegaodr  se pone la siguiente URL:
  
   http://localhost:3000/api-docs
   ```

3. Una ves ehco el anterior paso ya se mostrará la documentación interactiva generada por Swagger UI a partir del fichero `swagger.yaml`.

---

## 🧰 Las tecnologías utilizadas son las siguientes:

- Node.js + Express
- MongoDB + Mongoose
- Swagger UI + YAML
- Jest + Supertest


## 👨‍💻 Autor

Alvaro Suarez

---

## ✔️ Notas finales

- Todos los tests han sido verificados y pasan correctamente (`npm test`).
- El fichero `swagger.yaml` está correctamente enlazado al endpoint `/api-docs`.