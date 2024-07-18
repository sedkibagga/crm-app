import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Header as HeaderRNE, Icon, Avatar } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { loadUserFromStorage } from '../features/auth/authSlice';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import {  showModal, showModalProfile } from '../features/states/stateSlice';


const Header: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    // console.log("user in headercomponent", user);

    return (
        <SafeAreaProvider>
            <PaperProvider>
                {user && user.token ? (
                    <>
                        <HeaderRNE
                            leftComponent={
                                <TouchableOpacity style={styles.leftComponent} onPress={() => dispatch(showModal())}>
                                    <Icon name="menu" color="#fff" />
                                </TouchableOpacity>
                            }
                            rightComponent={
                                <View style={styles.headerRight}>
                                    <TouchableOpacity onPress={() => dispatch(showModalProfile())}>
                                        <Avatar
                                            size={35}
                                            rounded
                                            title="Rd"
                                            containerStyle={{ backgroundColor: "#397af8" }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                            centerComponent={{ text: 'Header', style: styles.heading }}
                        />
                        
                    </>
                ) : (
                    <View style={styles.unauthorizedContainer}>
                        <Text style={styles.unauthorizedText}>You are not authorized</Text>
                    </View>
                )}
            </PaperProvider>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 10,
        width: '100%',
        paddingVertical: 15,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    leftComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8%',
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    unauthorizedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    unauthorizedText: {
        fontSize: 18,
        color: 'red',
    },
});

export default Header;
