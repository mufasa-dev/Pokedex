import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import MainRoutes from './routes';
import usePeristedState from './utils/usePersistedState'

import fire from "./styles/themes/fire";
import water from "./styles/themes/water";
import poison from "./styles/themes/poison"
import { PokeNav } from "./components/PokeNav/PokeNav";
import grass from "./styles/themes/grass";
import electric from "./styles/themes/electric";

import {store} from "./redux";

const App = (props) => {
  const [theme, setTheme] = usePeristedState("theme", "fire");

  const themes = {
    fire: fire,
    water: water,
    grass: grass,
    poison: poison,
    electric: electric
  }

  return (
      <Provider store={store}>
        <ThemeProvider theme={themes[theme]}>
          <main>
            <PokeNav setTheme={setTheme}/>
            <MainRoutes {... props} />
          </main>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
