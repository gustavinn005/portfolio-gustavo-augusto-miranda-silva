# StreamBuy - Live Commerce Mobile App

## Overview

**StreamBuy** é um aplicativo móvel inovador de Live Commerce que revoluciona a experiência de compra online ao integrar videoconferência em tempo real com e-commerce interativo. O aplicativo permite que usuários assistam a transmissões ao vivo via Jitsi Meet e comprem produtos instantaneamente durante a transmissão, sem sair da chamada.

## Problem Statement

O comércio eletrônico tradicional carece de interação pessoal entre vendedores e compradores. Plataformas convencionais oferecem apenas catálogos estáticos, resultando em uma experiência impessoal e desengajada. Além disso, a falta de comunicação em tempo real limita a capacidade dos vendedores de demonstrar produtos e responder dúvidas instantaneamente, reduzindo a confiança do consumidor e as taxas de conversão.

## Proposed Solution

StreamBuy resolve esse problema ao combinar videoconferência ao vivo com um sistema de e-commerce totalmente integrado. Durante uma transmissão ao vivo, os vendedores podem apresentar produtos em detalhes enquanto os compradores visualizam a demonstração em tempo real. Um botão "Comprar Agora" flutuante permite que os usuários adquiram produtos instantaneamente sem interromper a transmissão, criando uma experiência de compra imersiva e interativa.

## Value Proposition

| Benefício | Descrição |
|-----------|-----------|
| **Compra Instantânea** | Adquira produtos durante a transmissão sem sair da chamada |
| **Experiência Interativa** | Vendedores demonstram produtos ao vivo, respondendo dúvidas em tempo real |
| **Engajamento Aumentado** | Transmissões ao vivo criam urgência e FOMO (Fear of Missing Out) |
| **Conversão Otimizada** | Reduz fricção no processo de compra ao eliminar redirecionamentos |
| **Comunidade** | Múltiplos compradores assistem juntos, criando senso de comunidade |

## Technologies Used

O aplicativo foi desenvolvido utilizando as seguintes tecnologias:

| Tecnologia | Propósito |
|-----------|-----------|
| **React Native** | Framework para desenvolvimento cross-platform (iOS/Android) |
| **Expo SDK 54** | Plataforma de desenvolvimento que simplifica a compilação e distribuição |
| **TypeScript** | Linguagem tipada para maior segurança e manutenibilidade do código |
| **React Router (Expo Router)** | Sistema de navegação entre telas |
| **NativeWind** | Tailwind CSS para React Native, permitindo estilo consistente |
| **AsyncStorage** | Armazenamento local para dados de usuário e carrinho |
| **Jitsi Meet SDK** | Integração de videoconferência em tempo real |
| **React Context API** | Gerenciamento de estado global (autenticação e carrinho) |
| **Manus AI** | Geração de código e estrutura do projeto |

## Features

### 1. Authentication (Tela de Login)

A tela de login oferece uma experiência simples e intuitiva para que novos usuários entrem no aplicativo. O nome de usuário é armazenado localmente no AsyncStorage, permitindo que o usuário permaneça logado entre sessões.

**Funcionalidades:**
- Campo de entrada para nome de usuário
- Validação de entrada (não permite campos vazios)
- Armazenamento persistente do usuário
- Feedback visual durante o login
- Design responsivo com gradiente de cores

### 2. Home Screen (Tela Inicial)

A tela inicial serve como hub central de navegação, oferecendo acesso rápido às três funcionalidades principais do aplicativo.

**Funcionalidades:**
- Exibição do nome do usuário logado
- Três cards de navegação principais:
  - **Assistir Live**: Acesso às transmissões ao vivo
  - **Ver Produtos**: Catálogo completo de produtos
  - **Meu Carrinho**: Gerenciamento do carrinho com contador de itens
- Feedback visual com escala de botões ao pressionar
- Informações sobre como usar o aplicativo

### 3. Live Room Screen (Tela de Transmissão)

A tela de transmissão simula uma videoconferência via Jitsi Meet com integração de compra em tempo real.

**Funcionalidades:**
- Área de videoconferência simulada (pronta para integração real com Jitsi)
- Exibição do nome da sala e participante
- Indicador "AO VIVO" em tempo real
- Controles de áudio e vídeo
- **Botão flutuante "Comprar Agora"** que abre um modal com o produto em destaque
- Modal de produto com:
  - Imagem do produto
  - Nome e preço em destaque
  - Descrição detalhada
  - Botão "Adicionar ao Carrinho"
  - Botão "Continuar Assistindo" para voltar à live
- Usuário permanece na chamada mesmo após adicionar produtos

### 4. Products Screen (Tela de Produtos)

Exibe um catálogo completo de produtos disponíveis para compra.

**Funcionalidades:**
- Grid de 2 colunas com cards de produtos
- Cada card mostra:
  - Imagem/ícone do produto
  - Nome do produto
  - Categoria
  - Preço
  - Botão "Comprar"
- Scroll vertical para navegação
- Feedback de sucesso ao adicionar ao carrinho
- Botão "Voltar" para retornar à home

### 5. Cart Screen (Tela de Carrinho)

Gerenciamento completo do carrinho de compras com visualização de itens e total.

**Funcionalidades:**
- Lista de itens adicionados ao carrinho
- Para cada item:
  - Imagem/ícone do produto
  - Nome e preço
  - Controles de quantidade (+ e -)
  - Botão para remover do carrinho
- Cálculo automático do total
- Estado vazio com mensagem amigável quando carrinho está vazio
- Botão "Finalizar Compra" que leva para checkout
- Botão "Continuar Comprando" para voltar ao catálogo
- Armazenamento persistente do carrinho

### 6. Checkout Screen (Tela de Confirmação)

Tela de sucesso que confirma o pedido e fornece detalhes da transação.

**Funcionalidades:**
- Ícone de sucesso com animação visual
- Número do pedido gerado automaticamente
- Status do pedido (Confirmado)
- Data e hora da compra
- Mensagem de confirmação por email
- Botão "Voltar para Home"
- Botão "Ver Meus Pedidos" (preparado para expansão futura)

## Project Structure

```
streambuy-app/
├── app/
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── login.tsx                # Tela de login
│   ├── live.tsx                 # Tela de transmissão ao vivo
│   ├── products.tsx             # Tela de produtos
│   ├── cart.tsx                 # Tela de carrinho
│   ├── checkout.tsx             # Tela de confirmação
│   └── (tabs)/
│       ├── _layout.tsx          # Configuração da navegação por abas
│       └── index.tsx            # Tela inicial (Home)
├── lib/
│   ├── auth-context.tsx         # Contexto de autenticação
│   ├── cart-context.tsx         # Contexto de carrinho
│   ├── products.ts              # Dados de produtos
│   ├── utils.ts                 # Funções utilitárias
│   ├── theme-provider.tsx       # Provedor de tema
│   └── trpc.ts                  # Cliente tRPC
├── components/
│   ├── screen-container.tsx     # Wrapper para SafeArea
│   ├── themed-view.tsx          # View com tema automático
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones
├── assets/
│   └── images/
│       ├── icon.png             # Ícone do app
│       ├── splash-icon.png      # Ícone da splash screen
│       └── favicon.png          # Favicon web
├── app.config.ts                # Configuração do Expo
├── tailwind.config.js           # Configuração do Tailwind CSS
├── theme.config.js              # Paleta de cores do app
├── package.json                 # Dependências do projeto
├── design.md                    # Documento de design
├── todo.md                      # Lista de tarefas
└── README.md                    # Este arquivo
```

## Installation Instructions

### Prerequisites

Antes de começar, certifique-se de ter os seguintes programas instalados:

- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm** (gerenciador de pacotes)
- **Expo CLI** (instalado globalmente: `npm install -g expo-cli`)
- **Android Studio** (para emulador Android) ou **Xcode** (para emulador iOS)

### Step 1: Clone the Repository

```bash
git clone https://github.com/seu-usuario/streambuy-app.git
cd streambuy-app
```

### Step 2: Install Dependencies

```bash
pnpm install
# ou
npm install
```

### Step 3: Start the Development Server

```bash
pnpm dev
# ou
npm run dev
```

O servidor de desenvolvimento iniciará e exibirá um QR code no terminal.

### Step 4: Run on Device or Emulator

**Opção A: Usar Expo Go (Recomendado para testes rápidos)**

1. Instale o aplicativo **Expo Go** no seu dispositivo (iOS App Store ou Google Play)
2. Escaneie o QR code exibido no terminal com a câmera do seu dispositivo
3. O aplicativo abrirá automaticamente no Expo Go

**Opção B: Emulador Android**

```bash
pnpm android
```

**Opção C: Emulador iOS (apenas macOS)**

```bash
pnpm ios
```

## Usage Instructions

### 1. Login

1. Abra o aplicativo
2. Insira seu nome de usuário (qualquer nome válido)
3. Clique em "Entrar"
4. Você será redirecionado para a tela inicial

### 2. Assistir Live

1. Na tela inicial, clique no card **"Assistir Live"**
2. Você entrará em uma sala de videoconferência simulada
3. Clique no botão flutuante **"🛒 Comprar Agora"** para ver o produto em destaque
4. Clique em **"Adicionar ao Carrinho"** para comprar
5. Clique em **"Continuar Assistindo"** para voltar à transmissão

### 3. Explorar Produtos

1. Na tela inicial, clique em **"Ver Produtos"**
2. Navegue pela grid de produtos
3. Clique em **"Comprar"** em qualquer produto para adicioná-lo ao carrinho
4. Clique em **"Voltar"** para retornar à home

### 4. Gerenciar Carrinho

1. Na tela inicial, clique em **"Meu Carrinho"**
2. Visualize todos os itens adicionados
3. Use os botões **"+"** e **"−"** para ajustar quantidades
4. Clique em **"✕"** para remover um item
5. Clique em **"Finalizar Compra"** para processar o pedido

### 5. Checkout

1. Após clicar em "Finalizar Compra", você verá a tela de confirmação
2. Seu pedido será confirmado com número único
3. Clique em **"Voltar para Home"** para continuar comprando

## Preview

### Manus Platform Link

Acesse a versão ao vivo do aplicativo através do Manus Platform:

**[Clique aqui para visualizar o StreamBuy](manus-webdev://c7304c47)**

### QR Code para Expo Go

Escaneie o QR code abaixo com o Expo Go para visualizar o aplicativo em tempo real:

```
[QR Code será gerado automaticamente pelo Manus Platform]
```

## State Management

### Authentication Context

O contexto de autenticação (`lib/auth-context.tsx`) gerencia:
- Login do usuário
- Armazenamento persistente do nome de usuário
- Logout
- Estado de carregamento

### Cart Context

O contexto de carrinho (`lib/cart-context.tsx`) gerencia:
- Adição de itens ao carrinho
- Remoção de itens
- Atualização de quantidades
- Cálculo do total
- Armazenamento persistente do carrinho
- Limpeza do carrinho após compra

### Local Storage

Ambos os contextos utilizam `AsyncStorage` para persistência de dados:
- `streamBuyUser`: Nome do usuário logado
- `streamBuyCart`: Itens do carrinho em formato JSON

## Styling

O aplicativo utiliza **NativeWind** (Tailwind CSS para React Native) para estilo consistente. As cores são definidas em `theme.config.js` e compartilhadas entre Tailwind e o runtime.

### Color Palette

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `primary` | #0a7ea4 | #0a7ea4 | Botões, destaques |
| `background` | #ffffff | #151718 | Fundo das telas |
| `surface` | #f5f5f5 | #1e2022 | Cards, superfícies |
| `foreground` | #11181C | #ECEDEE | Texto principal |
| `muted` | #687076 | #9BA1A6 | Texto secundário |
| `border` | #E5E7EB | #334155 | Bordas, divisores |
| `success` | #22C55E | #4ADE80 | Confirmações |
| `error` | #EF4444 | #F87171 | Erros, avisos |

## Future Enhancements

O aplicativo foi estruturado para facilitar futuras melhorias:

1. **Integração Real com Jitsi Meet**: Substituir a simulação por SDK real do Jitsi
2. **Backend Server**: Conectar com servidor para persistência de dados em nuvem
3. **Autenticação Avançada**: Implementar OAuth, biometria (Face ID/Fingerprint)
4. **Pagamento Real**: Integrar gateways de pagamento (Stripe, PayPal)
5. **Histórico de Pedidos**: Armazenar e exibir pedidos anteriores
6. **Notificações Push**: Alertar usuários sobre novas lives
7. **Comentários ao Vivo**: Permitir que usuários comentem durante transmissões
8. **Recomendações**: Sistema de recomendação de produtos baseado em histórico
9. **Wishlist**: Permitir que usuários salvem produtos favoritos
10. **Avaliações**: Sistema de avaliação de produtos e vendedores

## Testing

Para testar o aplicativo completo, siga este fluxo:

1. **Login**: Insira qualquer nome de usuário
2. **Live**: Clique em "Assistir Live" e teste o botão "Comprar Agora"
3. **Produtos**: Navegue pelos produtos e adicione alguns ao carrinho
4. **Carrinho**: Ajuste quantidades e remova itens
5. **Checkout**: Finalize a compra e veja a confirmação

Todos os fluxos devem funcionar sem erros, com feedback visual consistente.

## Troubleshooting

### Problema: Aplicativo não inicia

**Solução**: Limpe o cache e reinstale as dependências:
```bash
rm -rf node_modules
pnpm install
pnpm dev
```

### Problema: Carrinho não persiste

**Solução**: Verifique se AsyncStorage está funcionando. Em emuladores, às vezes é necessário limpar dados do app:
```bash
# Android
adb shell pm clear com.seu.app

# iOS
xcrun simctl erase all
```

### Problema: QR code não funciona

**Solução**: Certifique-se de que seu dispositivo está na mesma rede Wi-Fi que o computador de desenvolvimento.

## Contributing

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## License

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Support

Para suporte, dúvidas ou sugestões, entre em contato através de:

- **Email**: support@streambuy.app
- **GitHub Issues**: [Abra uma issue](https://github.com/seu-usuario/streambuy-app/issues)
- **Manus Platform**: [Envie feedback](https://help.manus.im)

## Acknowledgments

Este aplicativo foi desenvolvido com a ajuda de:

- **Manus AI**: Geração de código e estrutura do projeto
- **Expo**: Plataforma de desenvolvimento React Native
- **Jitsi Meet**: Solução de videoconferência
- **React Native Community**: Comunidade e bibliotecas

---

**Desenvolvido com ❤️ usando Manus AI**

Versão: 1.0.0  
Última atualização: Maio de 2026
