import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {useApp, createRealmContext, UserProvider} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';
import TestComponent from './TestComp';
import {Realm} from '@realm/react';
import { RealmProvider } from '@realm/react';

// Define your object model
export class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig = {
  schema: [Profile],
};

// Create a realm context
// const {RealmProvider} = createRealmContext(realmConfig);

export default function TestView() {
  const app = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        <UserProvider>
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
        </UserProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
}
