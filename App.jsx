import React from 'react';
import { AppProvider } from '@realm/react';
import TestView from './models/Task';

function App() {
  return (
    <AppProvider id="test-2-djvzdzx">
      <TestView />
    </AppProvider>
  );
}

export default App;
