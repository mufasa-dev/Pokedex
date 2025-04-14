import React from 'react';

import PokeDex from './pages/PokeDex/PokeDex';
import PokeList from './pages/PokeList/PokeList';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import { createBrowserHistory  } from 'history';

const history = createBrowserHistory();

const MainRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<PokeList history={history} />} />
            <Route path="/list" element={<PokeList history={history} />} />
            <Route path="/pokedex" element={<PokeDex history={history} />} />
        </Routes>
    </BrowserRouter>
)

export default MainRoutes;