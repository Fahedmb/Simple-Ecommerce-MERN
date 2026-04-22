import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { getProducts } from '../api/products';

jest.mock('../api/products');

test('affiche la liste des produits', async () => {
  (getProducts as jest.Mock).mockResolvedValue({ data: [{ _id: '1', name: 'PC Portable', price: 999 }] });
  
  render(<ProductList />);
  
  await waitFor(() => {
    expect(screen.getByText(/PC Portable/i)).toBeInTheDocument();
  });
});