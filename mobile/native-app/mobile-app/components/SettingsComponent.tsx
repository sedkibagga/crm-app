import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';
import { Avatar, Button } from '@rneui/themed';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updatePassword, updateProfile } from '@/Types/DataTypes';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage, logoutUser, UpdatePassword, updateUserProfile } from '@/features/auth/authSlice';
import { RootState } from '@/Store/Store';

const getInitials = (nom?: string, prenom?: string) => {
  const firstInitial = nom ? nom.charAt(0).toUpperCase() : '';
  const secondInitial = prenom ? prenom.charAt(0).toUpperCase() : '';
  return `${firstInitial}${secondInitial}`;
};
const SettingsComponent: React.FC<updateProfile> = ({ nom, prenom, email }) => {
  const initials = getInitials(nom, prenom);
  const [FirstName, setFirstName] = useState<string | undefined>(nom);
  const [LastName, setLastName] = useState<string | undefined>(prenom);
  const [Email, setEmail] = useState<string | undefined>(email);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [currentPassword , setCurrentPassword] = useState<string>('');
  const [newPassword , setNewPassword] = useState<string>('');
  const [confirmedPassword , setConfirmedPassword] = useState<string>('');
  const dispatch = useDispatch();
  const [showLogoutModal , setShowLogoutModal] = useState<boolean>(false);
  const {user} = useSelector((state: RootState) => state.auth);
  const handleUpdateProfile = async () => {
    const updatedProfile: updateProfile = {
      nom: FirstName,
      prenom: LastName,
      email: Email
    };
  
    // console.log("Updating profile with:", updatedProfile); 
     console.log("id in handleUpdateProfile settings:", user.id);
    try {
      await dispatch(updateUserProfile({
        id: user.id,
        updatedProfile: updatedProfile,
        token: user.token
      }) as any); 

      dispatch(loadUserFromStorage() as any);
    } 
    
    catch (error) {
      console.log('Update profile error:', error); 
    }
  
    setShowModal(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser() as any);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleChangePassword = async () => {
    const updatedPassword: updatePassword = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmedPassword
    };

    if (newPassword !== confirmedPassword) {
        console.log("Passwords do not match");
        return;
    } else {
        try {
            await dispatch(UpdatePassword({
                id: user.id,
                updatedPassword: updatedPassword,
                token: user.token
            }) as any);
            
            dispatch(loadUserFromStorage() as any);
        } catch (error) {
            console.log('Update password error:', error);
        }
        setShowChangePasswordModal(false);
    }
};
  
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
                title={initials}
                containerStyle={styles.profileAvatar}
              />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>{nom} {prenom}</Text>
                <Text style={styles.profileHandle}>{email}</Text>
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
                <Text style={styles.rowValue}>{nom}</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>LastName</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{prenom}</Text>
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{email}</Text>
              </View>
            </View>


          </View>
        </View>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <TouchableOpacity style={styles.row} onPress={() => setShowModal(true)}>
            <AntDesign name="edit" size={24} color="black" style={styles.icon} />
            <Text style={[styles.rowLabel, styles.rowLabelChangePassword]}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity style={styles.row} onPress={() => setShowChangePasswordModal(true)}>
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
        <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
          <Text style={[styles.rowLabel, styles.rowLabelLogout]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
          <TextInput
            label="Name"
            value={FirstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={LastName}
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={Email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />

          <Button style={styles.updateButton}  color="#1c2b4b" onPress={handleUpdateProfile}>
            Update
          </Button>

        </Modal>
      </Portal>
      <Portal>
        <Modal visible={showChangePasswordModal} onDismiss={() => setShowChangePasswordModal(false)} contentContainerStyle={styles.modal}>
          <TextInput
            label="current password"
            value={currentPassword}
            onChangeText={text => setCurrentPassword(text)}
            style={styles.input}
          />
          <TextInput
            label="new password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            style={styles.input}
          />
          <TextInput
            label="confirm password"
            value={confirmedPassword}
            onChangeText={text => setConfirmedPassword(text)}
            style={styles.input}
          />

          <Button style={styles.updateButton}  color="#1c2b4b" onPress={handleChangePassword} >
            changePassword
          </Button>

        </Modal>
      </Portal>
      <Portal>
        <Modal visible={showLogoutModal} onDismiss={() => setShowLogoutModal(false)} contentContainerStyle={styles.modal}>
        <Text style={styles.logoutText}>Are you sure to logout?</Text>
          <View style={styles.logoutButtonsContainer}>
            <Button onPress={handleLogout} color="blue" style={styles.logoutButtonStyle}>Yes</Button>
            <Button onPress={() => setShowLogoutModal(false)} color="red" style={styles.logoutButtonStyle}>No</Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  input: {
    marginBottom: 10,
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
  updateButton: {
    marginTop: 10,
   
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
  logoutButton: {
    alignItems: 'center',
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
  logoutText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logoutButtonStyle: {
    flex: 1,
    marginHorizontal: 5,
    
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
  
});

export default SettingsComponent;
