import React from 'react';
import {AppProvider} from '@realm/react';
import TestView from './models/Task';
import AppWrapper from './AppWrapper';

function App() {
  console.log("App")
  return <AppWrapper/>;
}

export default App;
