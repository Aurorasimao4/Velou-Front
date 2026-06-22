# Velou — Front-end

Álbum digital de memórias de casamento.

## Arrancar o projecto

```bash
# 1. Instalar dependências
npm install

# 2. Correr em desenvolvimento
npm run dev
```

Abre em http://localhost:5173

## Estrutura de pastas

```
src/
├── components/
│   ├── ui/           # Button, Input, Avatar, ...
│   ├── layout/       # MainLayout (navbar + outlet)
│   └── memory/       # (fase 3) MemoryCard, AddMemoryModal, ...
├── pages/
│   ├── LandingPage   # Página inicial pública
│   ├── LoginPage     # Login/registo
│   └── TimelinePage  # Dashboard principal (protegido)
├── hooks/            # (fase 4) useMemories, useAuth, ...
├── lib/
│   └── api.js        # Cliente axios com JWT automático
└── styles/
    └── design-system.css  # Tokens, tipografia, componentes base
```

## Ligar à API Java (fase 4)

O Vite já está configurado para fazer proxy de `/api` → `http://localhost:8080`.

Os teus amigos só precisam de correr o Spring Boot na porta 8080.
Quando a API estiver pronta, substituir os `TODO` em `LoginPage.jsx` e nas hooks.

## Tecnologias

| Pacote | Para quê |
|--------|----------|
| React 18 | UI |
| React Router 6 | Navegação |
| TanStack Query | Cache + fetch da API |
| Framer Motion | Animações (fase 5) |
| Axios | Pedidos HTTP |
| Vite | Build tool |
