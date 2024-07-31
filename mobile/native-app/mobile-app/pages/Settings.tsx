import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SettingsComponent from '@/components/SettingsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';

const Settings = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  console.log("user in settings:", user)
  return (
    <SafeAreaView style={styles.container}>
      <SettingsComponent nom={user.nom} prenom={user.prenom} email={user.email} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default Settings;
