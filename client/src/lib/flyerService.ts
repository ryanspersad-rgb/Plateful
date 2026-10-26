import { Deal } from './types';

export const CALGARY_DEALS: Deal[] = [
  {
    id: 'd1',
    item: 'Sweet Potatoes',
    price: '$0.88/lb',
    originalPrice: '$1.99/lb',
    retailer: 'Real Canadian Superstore',
    category: 'Produce',
    expiry: 'Mar 12'
  },
  {
    id: 'd2',
    item: 'Black Beans',
    price: '$1.25',
    originalPrice: '$1.75',
    retailer: 'Walmart Calgary',
    category: 'Pantry',
    expiry: 'Mar 10'
  },
  {
    id: 'd3',
    item: 'Chicken Breasts',
    price: '$4.99/lb',
    originalPrice: '$7.49/lb',
    retailer: 'Safeway Calgary',
    category: 'Meat',
    expiry: 'Mar 11'
  },
  {
    id: 'd4',
    item: 'Spaghetti',
    price: '$0.99',
    originalPrice: '$2.49',
    retailer: 'Sobeys Calgary',
    category: 'Pantry',
    expiry: 'Mar 15'
  },
  {
    id: 'd5',
    item: 'Avocados',
    price: '$3.99 (5-pack)',
    originalPrice: '$6.99',
    retailer: 'Real Canadian Superstore',
    category: 'Produce',
    expiry: 'Mar 12'
  },
  {
    id: 'd6',
    item: 'Ground Beef',
    price: '$3.88/lb',
    originalPrice: '$5.99/lb',
    retailer: 'No Frills Calgary',
    category: 'Meat',
    expiry: 'Mar 09'
  },
  {
    id: 'd7',
    item: 'Cherry Tomatoes',
    price: '$2.49/pint',
    originalPrice: '$4.49/pint',
    retailer: 'Safeway Calgary',
    category: 'Produce',
    expiry: 'Mar 13'
  },
  {
    id: 'd8',
    item: 'Fresh Basil',
    price: '$1.99',
    originalPrice: '$3.49',
    retailer: 'Co-op Calgary',
    category: 'Produce',
    expiry: 'Mar 10'
  },
  {
    id: 'd9',
    item: 'Olive Oil',
    price: '$5.99',
    originalPrice: '$8.99',
    retailer: 'Walmart Calgary',
    category: 'Pantry',
    expiry: 'Mar 14'
  },
  {
    id: 'd10',
    item: 'Broccoli',
    price: '$1.49/lb',
    originalPrice: '$2.99/lb',
    retailer: 'No Frills Calgary',
    category: 'Produce',
    expiry: 'Mar 11'
  }
];

export const getDealsForItem = (itemName: string): Deal | undefined => {
  return CALGARY_DEALS.find(d =>
    itemName.toLowerCase().includes(d.item.toLowerCase()) ||
    d.item.toLowerCase().includes(itemName.toLowerCase())
  );
};
