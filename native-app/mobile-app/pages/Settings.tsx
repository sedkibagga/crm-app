import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SettingsComponent from '@/components/SettingsComponent';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SettingsComponent />
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
