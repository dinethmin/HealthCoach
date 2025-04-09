import React from 'react'
import { Text, View } from '@/components/Themed';
import { Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const Profile = () => {
  return (
      <View style={styles.container}>
        
        <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
        <Button title="Delete Account" onPress={() => FIREBASE_AUTH.currentUser?.delete()} />
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

export default Profile