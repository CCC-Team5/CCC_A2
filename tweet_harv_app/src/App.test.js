// Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

// Author:

// Xinhao Chen 1230696 Melbourne
// Weimin Ouyang 340438 Melbourne
// Tianqi Yu 1221167 China
// Junjie Xia 1045673 China
// Yuling Zheng 954408 Melbourne

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
