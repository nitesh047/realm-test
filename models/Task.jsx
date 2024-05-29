import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {useApp, createRealmContext, UserProvider} from '@realm/react';
import {OpenRealmBehaviorType} from 'realm';
import TestComponent from './TestComp';
import {Realm} from '@realm/react';
import {RealmProvider} from '@realm/react';

// Define your object model
export class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
      date:'string'
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
