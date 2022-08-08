import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Slider from './components/Slider';
import slides from './data/slides.json'; // FIXME под компоненты и отступ в 1 строку
import Settings from './components/Settings';

function App() {
  return (
    <>
      <GlobalStyle />
      <Slider slides={slides} />
      <Settings />
    </>
  );
}

export default React.memo(App);

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
}
`;
