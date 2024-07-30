import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from '@rneui/themed';
import Entypo from '@expo/vector-icons/Entypo';

const SettingsComponent = () => {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionBody}>
            <TouchableOpacity style={styles.profile}>
              <Avatar
                size={32}
                rounded
                title="Rd"
                containerStyle={styles.profileAvatar}
              />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileHandle}>john@example.com</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User informations</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>FirstName</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>bagga</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>LastName</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>sedki</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>sedkibagga4@gmail.com</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Num</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>96493288</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity style={styles.row}>
                <Entypo name="key" size={24} color="black" style={styles.icon} />
                <Text style={[styles.rowLabel, styles.rowLabelChangePassword]}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={[styles.rowLabel, styles.rowLabelLogout]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
    backgroundColor: 'blue',
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
  rowLabelChangePassword: {
    color: 'blue',
    fontWeight: '500',
    marginLeft: '20%',
    
  },
  icon: {
    color: 'blue',
  },
  logoutContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  logoutButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsComponent;
