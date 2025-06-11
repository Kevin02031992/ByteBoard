# ByteBoard 🧠

ByteBoard es un sistema de gestión empresarial construido con las siguientes tecnologías:

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Express.js + MySQL + JWT
- **Base de datos**: db_byteboard

---

## 📦 Estructura del Proyecto

```
ByteBoard/
├── backend/                  # Backend Express
│   ├── controllers/          # Lógica de negocio
│   ├── middlewares/          # Autenticación y validaciones
│   ├── queries/              # Funciones SQL por tabla
│   ├── routes/               # Endpoints Express
│   ├── utils/                # Funciones auxiliares (generateId, etc.)
│   ├── .env                  # Configuración de entorno
│   └── index.js              # Punto de entrada del servidor
│
├── frontend/                 # Frontend React
│   ├── public/               # Archivos estáticos
│   ├── src/
│   │   ├── api/              # Funciones para consumir el backend
│   │   ├── pages/            # Vistas como User, Home, etc.
│   │   ├── types/            # Interfaces TypeScript reutilizables
│   │   ├── App.tsx           # Componente raíz
│   │   └── main.tsx          # Bootstrap React
│   ├── .env                  # Variables como VITE_API_URL
│   └── index.html            # HTML base
```

---

## 🚀 Cómo iniciar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Kevin02031992/ByteBoard.git
cd ByteBoard
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

- Asegúrate de tener un archivo `.env` con:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=db_byteboard
PORT=3001
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Asegúrate de tener un archivo `.env` con:

```
VITE_API_URL=http://localhost:3001
```

---

## ✨ Flujo actual implementado

- ✅ Crear usuario (`POST /api/user`)
- 🚧 Ver usuarios (pendiente)
- 🚧 Editar usuario (pendiente)
- 🚧 Eliminar usuario (soft delete) (pendiente)

---

## 🧾 Notas importantes

- Los IDs se generan con `generateUniqueId(tabla, primaryKeyField)`
- La eliminación es lógica: se actualiza `user_condition = false`
- Todos los formularios tienen campos obligatorios definidos por backend
- La base de datos se documenta en `SQL_BIBLIA_DB_BYTEBOARD.txt`

---

## 🧠 Pendientes

- [ ] CRUD completo de usuario
- [ ] Validación de formularios
- [ ] Página de login y autenticación
- [ ] Interfaz para roles y permisos

---

> Proyecto en desarrollo por Kevin Salazar.