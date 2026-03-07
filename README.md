# ♻️ ReUse

> A "ReUse!" é uma plataforma dedicada a facilitar o reaproveitamento de objetos entre usuários, promovendo a sustentabilidade e o consumo consciente. Com o objetivo de reduzir resíduos, a plataforma permite que os usuários publiquem e troquem itens que não utilizam mais, fomentando uma economia circular.
---

## 🚀 Tecnologias Utilizadas
- **React Native** – Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo** – Ferramenta que simplifica o desenvolvimento, build e testes de apps React Native.
- **TypeScript** – Superset do JavaScript que adiciona tipagem estática, aumentando a segurança e manutenção do código.

---

## 🎨 Decisões de Interface e Organização do App

A interface do aplicativo foi projetada com foco em simplicidade, sustentabilidade e modernidade, permitindo que os usuários naveguem facilmente pela plataforma, encontrem os itens que desejam e tenham uma experiência envolvente durante esse processo.

Algumas decisões importantes de design incluem:
- **Interface minimalista**, priorizando clareza das informações e facilidade de uso;
- **Uso de componentes reutilizáveis**, como botões e cards de produto, para manter consistência visual em todo o aplicativo;
- **Suporte a tema claro e escuro**, respeitando as preferências do sistema do usuário;
- **Estrutura de navegação simples**, facilitando o acesso às principais funcionalidades do aplicativo;
- **Foco em usabilidade mobile**, considerando a experiência do usuário em dispositivos móveis.

---

## 🗂️ Estrutura do Projeto
```
app/
├── (tabs)/ # Estrutura de navegação por abas
│ ├── _layout.tsx # Configuração de layout das abas
│ └── index.tsx # Tela principal
│
├── _layout.tsx # Layout global da aplicação
│
assets/
└── images/ # Imagens e ícones
├── icon.png
└── logo.png
│
components/ # Componentes reutilizáveis
├── themed-button.tsx # Botão com suporte a tema claro e escuro
├── themed-text.tsx # Componente de texto tematizado
└── themed-view.tsx # Container com suporte a temas
│
constants/
└── theme.ts # Definição de cores e configurações de tema
│
hooks/ # Hooks personalizados
├── use-color-scheme.ts
├── use-color-scheme.web.ts
└── use-theme-color.ts
|
scripts/ # Scripts auxiliares
```
---

## ⚙️ Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/web-design-on/reuse/
   ```

2. Acesse a pasta do projeto

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npx expo start
   ```
---

## 📨 Planejamento de Entregas

### Sprint 01 - Welcome to Hybrid (03/02 - 10/03)

A primeira sprint teve como objetivo estruturar o início do projeto ReUse, definindo sua identidade visual e criando a base da aplicação mobile. Durante esse período, foram desenvolvidos os primeiros componentes e configurado o ambiente de desenvolvimento.

**Entregas da sprint:**

- Protótipo da tela inicial, contendo logo, definição de cores e tipografia do projeto;
- Criação do projeto base do ReUse utilizando React Native, TypeScript e Expo;
- Desenvolvimento de componentes reutilizáveis de botão e texto tematizados, permitindo adaptação automática aos temas claro e escuro dos dispositivos.

### Sprint 02 - *EM REFINAMENTO*


---

## 👨‍👩‍👧‍👦 Desenvolvido por:
* [Natali Schers](https://github.com/natali-schers)
* [Sarah Maranhão](https://github.com/smaranha)
* [Rebeca Soares](https://github.com/Rebeca-Soares)
* [Stephanie Cruz](https://github.com/Web-D-on)
