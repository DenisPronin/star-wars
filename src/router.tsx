import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Character } from './components/character/Character/Character';
import { CharactersList } from './components/characters/CharactersList/CharactersList';
import { Layout } from './components/common/Layout/Layout';
import { PageNotFound } from './components/common/PageNotFound/PageNotFound';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={<CharactersList />}
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
