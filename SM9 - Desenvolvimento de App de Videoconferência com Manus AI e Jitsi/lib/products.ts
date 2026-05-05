export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 14',
    price: 999.99,
    description: 'Smartphone Apple com câmera avançada e processador A16 Bionic',
    category: 'Smartphones',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 899.99,
    description: 'Smartphone Samsung com tela AMOLED e câmera de 50MP',
    category: 'Smartphones',
  },
  {
    id: '3',
    name: 'Smartwatch',
    price: 299.99,
    description: 'Relógio inteligente com monitoramento de saúde e notificações',
    category: 'Wearables',
  },
  {
    id: '4',
    name: 'Fones Bluetooth',
    price: 149.99,
    description: 'Fones sem fio com cancelamento de ruído ativo',
    category: 'Áudio',
  },
  {
    id: '5',
    name: 'Tablet iPad Air',
    price: 599.99,
    description: 'Tablet Apple com processador M1 e tela Liquid Retina',
    category: 'Tablets',
  },
  {
    id: '6',
    name: 'Câmera Digital',
    price: 799.99,
    description: 'Câmera mirrorless com sensor full-frame',
    category: 'Câmeras',
  },
];

export const FEATURED_PRODUCT = PRODUCTS[0]; // iPhone 14 como produto em destaque
