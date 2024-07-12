import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { TextInput, Text, Portal, Modal, Button } from 'react-native-paper';
import Header from './HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { hideModal, hideModalProfile } from '../features/states/stateSlice';
import { loadUserFromStorage, logoutUser } from '../features/auth/authSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const FormComponent = () => {
    const dispatch = useDispatch();
    const { showModalNavigation, showModalProfile } = useSelector((state: RootState) => state.state);
    const { user } = useSelector((state: RootState) => state.auth);
    const navigation = useNavigation();
    console.log("user", user);
    console.log("showModalNavigation", showModalNavigation);
    console.log("showModalProfile", showModalProfile);

    useEffect(() => {
        dispatch(loadUserFromStorage() as any);
    }, [dispatch]);

    useEffect(() => {
        if (!user || !user.token) {
            navigation.navigate('SignIn' as never);
        }
    }, [user, dispatch, navigation]);

    return (
        <View style={styles.container}>
            <Header />
            <Portal>
                <Modal visible={showModalNavigation} onDismiss={() => dispatch(hideModal())} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change page </Text>
                        {user && (
                            <View style={styles.inlineContainer}>
                                <Text style={styles.inlineText}>Planning page </Text>
                                <AntDesign
                                    name="calendar"
                                    size={24}
                                    color="black"
                                    onPress={() => {
                                        dispatch(hideModal());
                                        navigation.navigate('Planing' as never);
                                        
                                    }}
                                />

                            </View>
                        )}
                    </View>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={showModalProfile} onDismiss={() => dispatch(hideModalProfile())} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {user && (
                            <View style={styles.profileContainer}>
                                <Text style={styles.modalTitle}>Profile: {user.nom}</Text>
                                <View style={styles.logoutContainer}>
                                    <Text style={styles.logoutText}>Logout</Text>
                                    <AntDesign name="logout" size={24} color="black" onPress={() => dispatch(logoutUser() as any)} />
                                </View>
                            </View>
                        )}

                        <Text>Click outside this area to dismiss.</Text>
                    </View>
                </Modal>
            </Portal>

            <Text style={styles.title}>Information sur le point de vente</Text>
            <Card containerStyle={styles.card}>
                <TextInput
                    label="Nom"
                    style={styles.input}
                />
                <TextInput
                    label="Prenom"
                    style={styles.input}
                />
                <TextInput
                    label="Secteur D'activité"
                    style={styles.input}
                />
                <TextInput
                    label="Num_Tel"
                    style={styles.input}
                />
                <TextInput
                    label="Localisation"
                    style={styles.input}
                />
                <TextInput
                    label="Décision"
                    style={styles.input}
                />
            </Card>
            <Button mode="contained" style={styles.button} onPress={() => console.log("Submitted")}>
                Submit
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10%',
        marginTop: '10%',
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 50,
    },
    input: {
        marginBottom: 15,
        height: 50,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007AFF',
        width: '50%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '10%',
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: "30%",
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileContainer: {
        alignItems: 'center',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    logoutText: {
        marginRight: 10,
        fontSize: 16,
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inlineText: {
        fontSize: 16,
    },
});

export default FormComponent;
