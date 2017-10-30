import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from './tempPolyfills'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
