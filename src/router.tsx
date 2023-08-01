import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Character } from './components/Character/Character';
import { CharactersList } from './components/CharactersList/CharactersList';
import { Layout } from './components/Layout/Layout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route
            path="/"
            element={<CharactersList />}
            errorElement={<div>error</div>}
          />
          <Route
            path="characters/:characterId"
            element={<Character />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
