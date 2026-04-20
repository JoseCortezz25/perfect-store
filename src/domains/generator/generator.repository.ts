import type { Sku } from './generator.types';

export const MOCK_SKUS: Sku[] = [
  // Bretaña
  {
    id: 'sk-01',
    name: 'Bretaña Limón',
    brand: 'Bretaña',
    volume: '400ml',
    accentColor: '#E8A020'
  },
  {
    id: 'sk-02',
    name: 'Bretaña Mora',
    brand: 'Bretaña',
    volume: '400ml',
    accentColor: '#E8A020'
  },
  {
    id: 'sk-03',
    name: 'Bretaña Manzana',
    brand: 'Bretaña',
    volume: '1.5L',
    accentColor: '#E8A020'
  },
  {
    id: 'sk-04',
    name: 'Bretaña Natural',
    brand: 'Bretaña',
    volume: '400ml',
    accentColor: '#E8A020'
  },
  // Manzana
  {
    id: 'sk-05',
    name: 'Manzana Original',
    brand: 'Manzana',
    volume: '400ml',
    accentColor: '#4CAF50'
  },
  {
    id: 'sk-06',
    name: 'Manzana Original',
    brand: 'Manzana',
    volume: '1.5L',
    accentColor: '#4CAF50'
  },
  {
    id: 'sk-07',
    name: 'Manzana Zero',
    brand: 'Manzana',
    volume: '400ml',
    accentColor: '#4CAF50'
  },
  // Colombiana
  {
    id: 'sk-08',
    name: 'Colombiana',
    brand: 'Colombiana',
    volume: '400ml',
    accentColor: '#E53935'
  },
  {
    id: 'sk-09',
    name: 'Colombiana',
    brand: 'Colombiana',
    volume: '1.5L',
    accentColor: '#E53935'
  },
  {
    id: 'sk-10',
    name: 'Colombiana',
    brand: 'Colombiana',
    volume: '3L',
    accentColor: '#E53935'
  },
  // Hit
  {
    id: 'sk-11',
    name: 'Hit Tropical',
    brand: 'Hit',
    volume: '400ml',
    accentColor: '#FF6F00'
  },
  {
    id: 'sk-12',
    name: 'Hit Maracuyá',
    brand: 'Hit',
    volume: '400ml',
    accentColor: '#FF6F00'
  },
  {
    id: 'sk-13',
    name: 'Hit Naranja',
    brand: 'Hit',
    volume: '400ml',
    accentColor: '#FF6F00'
  },
  {
    id: 'sk-14',
    name: 'Hit Mango',
    brand: 'Hit',
    volume: '400ml',
    accentColor: '#FF6F00'
  },
  // Mr. Tea
  {
    id: 'sk-15',
    name: 'Mr. Tea Limón',
    brand: 'Mr. Tea',
    volume: '500ml',
    accentColor: '#8BC34A'
  },
  {
    id: 'sk-16',
    name: 'Mr. Tea Durazno',
    brand: 'Mr. Tea',
    volume: '500ml',
    accentColor: '#8BC34A'
  },
  {
    id: 'sk-17',
    name: 'Mr. Tea Maracuyá',
    brand: 'Mr. Tea',
    volume: '500ml',
    accentColor: '#8BC34A'
  },
  // Hipinto
  {
    id: 'sk-18',
    name: 'Hipinto',
    brand: 'Hipinto',
    volume: '400ml',
    accentColor: '#AB47BC'
  },
  {
    id: 'sk-19',
    name: 'Hipinto',
    brand: 'Hipinto',
    volume: '1.5L',
    accentColor: '#AB47BC'
  },
  // Pepsi
  {
    id: 'sk-20',
    name: 'Pepsi',
    brand: 'Pepsi',
    volume: '400ml',
    accentColor: '#1565C0'
  },
  {
    id: 'sk-21',
    name: 'Pepsi',
    brand: 'Pepsi',
    volume: '1.5L',
    accentColor: '#1565C0'
  },
  {
    id: 'sk-22',
    name: 'Pepsi Black',
    brand: 'Pepsi',
    volume: '400ml',
    accentColor: '#1565C0'
  },
  {
    id: 'sk-23',
    name: 'Pepsi Zero',
    brand: 'Pepsi',
    volume: '400ml',
    accentColor: '#1565C0'
  },
  // Uva
  {
    id: 'sk-24',
    name: 'Uva Postobón',
    brand: 'Uva',
    volume: '400ml',
    accentColor: '#6A1B9A'
  },
  {
    id: 'sk-25',
    name: 'Uva Postobón',
    brand: 'Uva',
    volume: '1.5L',
    accentColor: '#6A1B9A'
  },
  // Naranja
  {
    id: 'sk-26',
    name: 'Naranja Postobón',
    brand: 'Naranja',
    volume: '400ml',
    accentColor: '#F57C00'
  },
  {
    id: 'sk-27',
    name: 'Naranja Postobón',
    brand: 'Naranja',
    volume: '1.5L',
    accentColor: '#F57C00'
  }
];

export const SKU_BRANDS = Array.from(new Set(MOCK_SKUS.map(s => s.brand)));
