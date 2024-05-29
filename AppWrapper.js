import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import TestView from './models/Task';
import RealmWrapper from './RealmWrapper';
function AppWrapper() {
  console.log("test AppWrapper")
  return (
    <AppProvider id="test-2-djvzdzx">
      <UserProvider fallback={RealmWrapper}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;
