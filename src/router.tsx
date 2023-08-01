import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Character } from './components/Character/Character';
import { CharactersList } from './components/CharactersList/CharactersList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharactersList />,
    errorElement: <div>error</div>,
  },
  {
    path: 'characters/:characterId',
    element: <Character />,
  },
]);
