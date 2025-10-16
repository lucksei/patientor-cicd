# Patientor CI-CD

> This is the submission for the CI-CD exercise 11.2 from [Part 11 - CI/CD from the Full-Stack Open course by Helsinki University](https://fullstackopen.com/en/part11).
>
> This part includes a previous repository ["Pokedex"](https://github.com/lucksei/full-stack-open-pokedex) as part the exercises. From 11.2 to 11.19.

Patientor is a full-stack healthcare application that allows managing patients, their entries, and associated diagnoses. This project is a continuation of [Part 9 - Typescript from the Full-Stack Open course by Helsinki University](https://fullstackopen.com/en/part9). The backend is built with Node.js + Express, and the frontend uses React + Vite.

### Running the Application

### Backend

Install dependencies

```bash
cd backend
npm install
```

Run in development mode

```bash
npm run dev
```

Build and run in production mode

```bash
npm run build
npm run start
```

Run tests

```bash
npm run test
```

### Frontend

Install dependencies

```bash
cd frontend
npm install
```

Run in development mode

```bash
npm run dev
```

Build the frontend

```bash
npm run build
```

> The frontend in production mode is built inside the "dist" directory. The backend serves these files when running on the production environment (by default on port 3000).

Test the frontend - Component tests

```bash
npm run test
```
