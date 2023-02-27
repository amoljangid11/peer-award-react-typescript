import React, { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}): RenderResult => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

export const renderRoute = (route: string): RenderResult => renderWithRouter(<App />, { route });
