import React, { useState } from "react";
import { PokeList } from "./pages/PokeList/PokeList";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import MainRoutes from './routes';

import fire from "./styles/themes/fire";
import water from "./styles/themes/water";
import { PokeNav } from "./components/PokeNav/PokeNav";
import grass from "./styles/themes/grass";

import {store} from "./redux";

const App = (props) => {
  const [theme, setTheme] = useState("fire");

  const themes = {
    fire: fire,
    water: water,
    grass: grass
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
