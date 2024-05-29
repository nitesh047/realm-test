import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {useRealm, useQuery} from '@realm/react';
import {BSON} from 'realm';
import {Profile} from './Task';
import moment from 'moment';

export default function TestComponent() {
  const realm = useRealm();
  const profiles = useQuery(Profile);
  useEffect(() => {
    console.log(
      'Sync State ------------>>>>>>>>>>>>>',
      realm.syncSession?.state,
    );
  }, [realm.syncSession?.state]);
  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Profile', {
        _id: new BSON.ObjectId(),
        name: 'Nitesh',
        date: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a').toString(),
      });
    });
  }, [realm]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Profile));
    });
  }, [realm]);
  const deleteTask = useCallback((id) => {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey('Profile', id);
      if (profile) {
        realm.delete(profile);
      }
    });
  }, [realm]);

  const updateTask = useCallback((id) => {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey('Profile', id);
      if (profile) {
        profile.name = 'updated';
      }
    });
  }, [realm]);

  return (
    <View style={styles.container}>
      <Button title="Add Profile" onPress={addTask} />
      {profiles.map(profile => (
        <>
        <Text style={{color: 'white'}} key={profile._id.toString()}>
          {profile.name}
        </Text>
         <TouchableOpacity style={{backgroundColor: 'black',color:'white',width:100,height:30}} onPress={()=>deleteTask(profile._id)}>
         <Text>{'Delete Profile'}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{backgroundColor: 'black',color:'white',width:100,height:30}} onPress={()=>updateTask(profile._id)}>
         <Text>{'Update Profile'}</Text>
       </TouchableOpacity>
        </>
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
