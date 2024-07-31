import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { TextInput, Text, Portal, Modal, Button } from 'react-native-paper';
import Header from './HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { hideModal, hideModalProfile } from '../features/states/stateSlice';
import { loadUserFromStorage, logoutUser } from '../features/auth/authSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ajoutePointDeVente, getAllPointDeVente, reset } from '../features/apis/apisSlice';

const FormComponent = () => {
    const dispatch = useDispatch();
    const { showModalNavigation, showModalProfile } = useSelector((state: RootState) => state.state);
    const { user } = useSelector((state: RootState) => state.auth);
    const [nom, setNom] = useState<string>('');
    const [prenom, setPrenom] = useState<string>('');
    const [secteur_activite, setSecteur_activite] = useState<string>('');
    const [num_tel, setNum_tel] = useState<string>('');
    const [localisation, setLocalisation] = useState<string>('');
    const [decision, setDecision] = useState<string>('');
    const navigation = useNavigation();
    const {isSuccess , pointDeVenteAjouter , isError, message } = useSelector((state: RootState) => state.api);
    useEffect(() => {
        if (isError) {
            console.log(message);
           
        }
        // if (pointDeVenteAjouter) {
        //     alert('Point de vente ajouté avec succès');
            
        // }
    }, [ pointDeVenteAjouter]);

    useEffect(() => {
        console.log("isSuccess:",isSuccess);
            console.log("pointDeVenteAjouter:",pointDeVenteAjouter);
    } , [pointDeVenteAjouter])
    useEffect(() => {
        dispatch(loadUserFromStorage() as any);
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllPointDeVente() as any);
    }, [dispatch, ajoutePointDeVente]);

    const onSubmit = () => {
        if (nom.length === 0 || prenom.length === 0 || secteur_activite.length === 0 || num_tel.length === 0 || localisation.length === 0 || decision.length === 0) {
            alert('Veuillez remplir tous les champs');
        } else {
            const numTelAsNumber = parseInt(num_tel);
            if (isNaN(numTelAsNumber)) {
                alert('Le numéro de téléphone doit être un nombre valide');
                return;
            } else if (user.role !== 'commercial') {
                alert('Vous n\'avez pas le droit d\'ajouter un point de vente');
                return;

            }

            dispatch(ajoutePointDeVente({ nom, prenom, secteur_activite, num_tel: numTelAsNumber, localisation, decision }) as any);
            alert('Point de vente ajouté avec succès');
            setNom('');
            setPrenom('');
            setSecteur_activite('');
            setNum_tel('');
            setLocalisation('');
            setDecision('');
        }
    };

    return (
        <View style={styles.container}>
            {/* <Header /> */}
          
            <Text style={styles.title}>Information sur le point de vente</Text>
            <Card containerStyle={styles.card}>
                <TextInput label="Nom" style={styles.input} onChange={(e) => setNom(e.nativeEvent.text)} value={nom} textColor='black' />
                <TextInput label="Prenom" style={styles.input} onChange={(e) => setPrenom(e.nativeEvent.text)} value={prenom} textColor='black' />
                <TextInput label="Secteur D'activité" style={styles.input} onChange={(e) => setSecteur_activite(e.nativeEvent.text)} value={secteur_activite} textColor='black'/>
                <TextInput label="Num_Tel" style={styles.input} keyboardType="numeric" onChange={(e) => setNum_tel(e.nativeEvent.text)} value={num_tel}textColor='black' />
                <TextInput label="Localisation" style={styles.input} onChange={(e) => setLocalisation(e.nativeEvent.text)} value={localisation}textColor='black' />
                <TextInput label="Décision" style={styles.input} onChange={(e) => setDecision(e.nativeEvent.text)} value={decision}textColor='black' />
            </Card>
            <Button mode="contained" style={styles.button} onPress={onSubmit} textColor='white'>
                Submit
            </Button>
        </View>
    );
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
        marginTop: '20%',
        color: 'black',
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
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#1c2b4b',
        width: '50%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '30%',
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
        marginBottom: 10,
    },
    inlineText: {
        fontSize: 16,
        marginRight: 10,
    },
});

export default FormComponent;
