import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {BSON} from 'realm';
import {Profile} from './Task';

export default function TestComponent() {
  const realm = useRealm();
  const profiles = useQuery(Profile);

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Profile', {
        _id: new BSON.ObjectId(),
        name: 'Nitesh',
      });
    });
  }, [realm]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Profile));
    });
  }, [realm]);

  return (
    <View style={styles.container}>
      <Button title="Add Profile" onPress={addTask} />
      {profiles.map(profile => (
        <Text style={{color: 'white'}} key={profile._id.toString()}>
          {profile.name}
        </Text>
      ))}
      <TouchableOpacity style={{backgroundColor: 'yellow'}} onPress={addTask}>
        <Text>{'New Task'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
