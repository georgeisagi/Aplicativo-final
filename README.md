# OverlayPilot 🚀

> **Interface completa e responsiva para Overlay VTuber e Integração com IA.**  
> Suporte nativo a dispositivos Android em **Modo Retrato (9:20 - 1080x2400)** e **Modo Paisagem (20:9 - 2400x1080)**.

---

## 📱 Visão Geral

O **OverlayPilot** é uma aplicação voltada para criadores de conteúdo e streamers VTuber no ecossistema Android, permitindo gerenciar modelos 2D/VRM/Live2D, conectar-se via depuração ADB sem fio e acionar comandos de inteligência artificial com sincronia labial em tempo real.

---

## ✨ Funcionalidades Principais

### 1. 🎭 Modelo 2D & Workspace VTuber
- **Canvas de Rigging Interativo**: Visualização técnica em tempo real com malha vetorial, pontos de ancoragem anatômicos, amortecimento de movimento e simulação de sincronia labial.
- **Card Flutuante "+ Adicionar seu modelo"**: Importação rápida de modelos personalizados nos formatos **Live2D** (`.model3.json`), **VRM 3D** (`.vrm`) e **PNG/GIF** com canal alfa.
- **Card Flutuante "Status da IA"**: Alternância instantânea de escuta/interação da IA (`● IA Desativada` / `● IA Ativada`) com botão Play/Pause e feedback visual de pulso.

### 2. 🛒 Loja de Modelos VTuber
- Catálogo de modelos com filtros: `Todos`, `Live2D`, `VRM` e `Imagens`.
- Modelos inclusos: *Modelo Sakura*, *Modelo Luna*, *Modelo Aster*, *Modelo Yuki*, *Modelo Orion* e *Modelo Nova*.
- Sistema de compra automática: ao clicar em **Comprar**, o modelo é transferido para a biblioteca do usuário e **removido da vitrine da loja**.
- Marcação de modelos favoritos.

### 3. ⚡ ADB (Configuração & Conexão Android)
- Conexão via **Wi-Fi (Wireless Debugging)** ou cabo **USB**.
- Configuração de IP, porta e código de pareamento.
- Console de logs ADB ao vivo.
- Atalhos para concessão de permissões Android essenciais:
  - `appops set com.overlaypilot SYSTEM_ALERT_WINDOW allow` (Sobreposição de tela)
  - `pm grant com.overlaypilot android.permission.RECORD_AUDIO` (Microfone para sincronia)
  - `dumpsys deviceidle whitelist +com.overlaypilot` (Otimização de bateria)

### 4. ⚙️ Configurações & Permissões
- Gestão de permissões do sistema Android (`SYSTEM_ALERT_WINDOW`, microfone, acessibilidade e notificação persistente em primeiro plano).
- Preferências de desempenho: Seletor de taxa de quadros (30 FPS, 60 FPS, 120 FPS), controle de opacidade e escala.
- Manutenção de tela ativa (*WakeLock*).

---

## 📐 Dimensões e Proporções Suportadas

| Modo | Resolução Base | Proporção | Descrição |
| :--- | :--- | :--- | :--- |
| **Retrato** | 1080 x 2400 px | **9:20** | Formato padrão de smartphones modernos (ergonomia para uma mão). |
| **Paisagem** | 2400 x 1080 px | **20:9** | Formato panorâmico ideal para jogos e transmissões ao vivo. |
| **Responsivo** | Automático | 100% | Adapta-se fluidamente a qualquer resolução ou tela cheia. |

---

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **Lucide Icons**
- **Motion**

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou pnpm

### Passos:
```bash
# 1. Clonar o repositório
git clone https://github.com/georgeisagi/OverlayPilot-App.git
cd OverlayPilot-App

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse em seu navegador: `http://localhost:3000`

---

## 📤 Como Sincronizar com o seu GitHub

Para enviar as atualizações desta aplicação para o seu repositório:

```bash
# Adicionar o repositório remoto (se ainda não adicionado)
git remote add origin https://github.com/georgeisagi/OverlayPilot-App.git

# Adicionar todos os arquivos e fazer o commit
git add .
git commit -m "feat: interface completa do OverlayPilot (Retrato, Paisagem, Loja, ADB e Configurações)"

# Enviar para a branch main
git branch -M main
git push -u origin main
```

---

## 📄 Licença
Distribuído sob a licença Apache 2.0.
