# StreamBuy - Design Document

## Overview

StreamBuy é um aplicativo de Live Commerce que permite usuários assistirem transmissões ao vivo via Jitsi Meet e comprarem produtos em tempo real durante a videoconferência.

## Design Principles

- **Mobile-first**: Otimizado para uso com uma mão em orientação portrait (9:16)
- **Intuitivo**: Fluxos de compra simples e diretos
- **Responsivo**: Funciona em diferentes tamanhos de tela
- **Acessível**: Botões grandes e legíveis, feedback visual claro

## Screen List

1. **Login Screen** - Autenticação do usuário
2. **Home Screen** - Menu principal com navegação
3. **Live Room Screen** - Videoconferência Jitsi com overlay de compra
4. **Product Detail Screen** - Detalhes do produto em destaque
5. **Products Screen** - Lista de todos os produtos
6. **Cart Screen** - Carrinho de compras
7. **Checkout Screen** - Finalização da compra (simulada)

## Primary Content and Functionality

### 1. Login Screen
- **Conteúdo**: Campo de entrada para nome de usuário
- **Funcionalidade**: 
  - Validar nome (não vazio)
  - Armazenar nome em AsyncStorage
  - Navegar para Home após login bem-sucedido
  - Feedback visual no botão de entrada

### 2. Home Screen
- **Conteúdo**: 
  - Logo/título "StreamBuy"
  - Três botões principais em cards
  - Ícones descritivos
- **Funcionalidade**:
  - "Assistir Live" → Navega para Live Room
  - "Ver Produtos" → Navega para Products
  - "Meu Carrinho" → Navega para Cart
  - Exibir nome do usuário logado

### 3. Live Room Screen
- **Conteúdo**:
  - Videoconferência Jitsi (full screen)
  - Botão flutuante "🛒 Comprar Agora" (FAB)
  - Controles de áudio/vídeo
- **Funcionalidade**:
  - Integração com Jitsi Meet SDK
  - Nome da sala dinâmico
  - Botão flutuante sempre visível
  - Ao clicar em "Comprar Agora" → Abre Product Detail Modal

### 4. Product Detail Screen
- **Conteúdo**:
  - Imagem do produto (ícone/placeholder)
  - Nome do produto
  - Preço em destaque
  - Descrição curta
  - Botão "Adicionar ao Carrinho"
  - Botão "Voltar" ou fechar modal
- **Funcionalidade**:
  - Exibir produto em destaque
  - Adicionar ao carrinho com feedback
  - Voltar à live sem perder a chamada

### 5. Products Screen
- **Conteúdo**:
  - Lista de produtos em grid/cards
  - Cada card com: imagem, nome, preço
  - Botão "Comprar" em cada item
- **Funcionalidade**:
  - Scroll vertical
  - Adicionar ao carrinho
  - Navegar para detalhe do produto

### 6. Cart Screen
- **Conteúdo**:
  - Lista de itens no carrinho
  - Cada item: nome, preço, quantidade, botão remover
  - Total da compra
  - Botão "Finalizar Compra"
  - Botão "Continuar Comprando"
- **Funcionalidade**:
  - Listar itens
  - Remover itens
  - Atualizar quantidade
  - Calcular total

### 7. Checkout Screen
- **Conteúdo**:
  - Resumo do pedido
  - Total final
  - Mensagem de sucesso (simulada)
  - Botão "Voltar para Home"
- **Funcionalidade**:
  - Exibir confirmação
  - Limpar carrinho após compra
  - Navegar para Home

## Key User Flows

### Flow 1: Assistir Live e Comprar
1. Usuário faz login
2. Clica em "Assistir Live" na Home
3. Entra na sala de videoconferência Jitsi
4. Vê botão "Comprar Agora" flutuante
5. Clica no botão
6. Modal abre com produto em destaque
7. Clica "Adicionar ao Carrinho"
8. Volta à live (modal fecha)
9. Continua assistindo

### Flow 2: Navegar Produtos
1. Usuário clica "Ver Produtos" na Home
2. Vê lista de produtos
3. Clica em um produto
4. Vê detalhes
5. Clica "Comprar"
6. Produto adicionado ao carrinho
7. Pode continuar navegando ou ir para o carrinho

### Flow 3: Finalizar Compra
1. Usuário clica "Meu Carrinho" na Home
2. Vê itens no carrinho
3. Clica "Finalizar Compra"
4. Vê tela de confirmação
5. Clica "Voltar para Home"
6. Carrinho é limpo

## Color Choices

| Elemento | Cor | Uso |
|----------|-----|-----|
| Primary | #0a7ea4 (Azul) | Botões principais, destaques |
| Background | #ffffff (Branco) | Fundo das telas |
| Surface | #f5f5f5 (Cinza claro) | Cards, superfícies elevadas |
| Foreground | #11181C (Preto) | Texto principal |
| Muted | #687076 (Cinza) | Texto secundário |
| Success | #22C55E (Verde) | Confirmações, sucesso |
| Error | #EF4444 (Vermelho) | Erros, avisos |
| Border | #E5E7EB (Cinza claro) | Bordas, divisores |

## Navigation Structure

```
Home (Tab 0)
├── Live Room
│   └── Product Detail (Modal)
├── Products
│   └── Product Detail (Screen)
├── Cart
│   └── Checkout

Login (Stack)
└── Home (Tab Navigation)
```

## Component Hierarchy

- **App Root** (Providers)
  - Theme Provider
  - Auth Context
  - Cart Context
  - Navigation Stack
    - Login Screen
    - Tab Navigation
      - Home Screen
      - Live Room Screen
      - Products Screen
      - Cart Screen

## Design Notes

- Todos os botões têm feedback visual (press state)
- Ícones do Material Design para consistência
- Espaçamento consistente (4px, 8px, 16px, 24px)
- Tipografia: 12px (small), 14px (body), 16px (subtitle), 20px (title), 28px (heading)
- Transições suaves entre telas (200-300ms)
- Modal para Product Detail durante Live (não sai da chamada)
- FAB (Floating Action Button) para "Comprar Agora" sempre visível
