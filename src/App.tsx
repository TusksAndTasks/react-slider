import React from 'react';
import { createGlobalStyle } from 'styled-components';
import slides from './data/slides.json';
import { Settings } from './components/Settings';
import Slider from './components/Slider';

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
