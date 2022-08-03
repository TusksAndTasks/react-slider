import React from 'react';
import Slider from './components/Slider';
import slides from './data/slides.json';

function App() {
  return <Slider slides={slides} loop navs pags auto stopMouseHover delay={3} />;
}

export default React.memo(App);
