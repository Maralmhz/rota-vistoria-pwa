# 🚗 ROTA VISTORIA — Web PWA
### Controle de Veículos em Oficinas

> **Uso interno** — Ferramenta para vistoriadores acompanharem veículos em reparo.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Maralmhz/rota-vistoria-pwa)

---

## 📱 Sobre o App

O **Rota Vistoria** é um **Progressive Web App (PWA)** — abre no navegador do celular e pode ser instalado na tela inicial como um app nativo.

- Funciona **100% offline** após primeiro acesso
- Banco de dados local no navegador (**IndexedDB via Dexie.js**)
- **WhatsApp** usado apenas como canal de exportação/backup
- Deploy simples via **Vercel ou Cloudflare Pages**
- Atualiza automaticamente com cada push no GitHub

---

## ✅ Funcionalidades

- 📍 Cadastro de **oficinas** (nome, endereço, cidade, estado)
- 🚗 Cadastro de **veículos** por oficina
- ⚠️ Detecção **automática de atraso**
- 🗺️ **Rota direta** via Google Maps ou Waze
- 📤 **Exportação** via WhatsApp (por oficina, todas, atrasados)
- 💾 **Backup** JSON compartilhável pelo WhatsApp
- 🔄 **Restauração** de backup
- 🔍 Filtro por cidade e busca por placa/proprietário
- 📲 **Instalável** na tela inicial do celular (PWA)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React + Vite | App web moderno |
| TailwindCSS | Estilização |
| Dexie.js (IndexedDB) | Banco local offline |
| React Router | Navegação |
| vite-plugin-pwa | PWA + offline |
| Vercel / Cloudflare Pages | Deploy |

---

## 🚀 Como Rodar Localmente

```bash
git clone https://github.com/Maralmhz/rota-vistoria-pwa.git
cd rota-vistoria-pwa
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## ☁️ Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New Project**
3. Selecione o repositório `rota-vistoria-pwa`
4. Configurações:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**

Pronto! A cada `git push` o deploy atualiza automaticamente.

---

## ☁️ Deploy no Cloudflare Pages

1. Acesse [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conecte o repositório `rota-vistoria-pwa`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

---

## 📲 Instalar no Celular (PWA)

**Android (Chrome):**
1. Abra o link do app no Chrome
2. Toque no menu ⋮ → "Adicionar à tela inicial"
3. Confirme — o ícone aparece na tela inicial

**iPhone (Safari):**
1. Abra o link no Safari
2. Toque em Compartilhar → "Adicionar à Tela de Início"
3. Confirme

---

## 🔐 Observações

- App exclusivamente para **uso interno** da associação
- WhatsApp usado **só para compartilhamento** — dados ficam no celular
- Para múltiplos usuários, use o **backup/restauração** para sincronizar manualmente

---

*ROTA VISTORIA — Controle de Veículos em Oficinas*
