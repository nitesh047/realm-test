import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {useApp, createRealmContext, UserProvider} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';
import TestComponent from './models/TestComp';
import {Profile} from './models/Task';
import {Realm} from '@realm/react';
import {RealmProvider} from '@realm/react';

function RealmWrapper() {
  const app = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
   console.log("test RealmWrapper")
  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
      setIsLoggedIn(true);
    };
    login();
  }, [app]);

  if (!isLoggedIn) {
    return <ActivityIndicator size="large" />;
  }
  console.log('is logged in', isLoggedIn);
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoggedIn ? (
        <RealmProvider
          schema={[Profile]}
          sync={{
            flexible: true,
            newRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <TestComponent />
        </RealmProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
}

export default RealmWrapper;
