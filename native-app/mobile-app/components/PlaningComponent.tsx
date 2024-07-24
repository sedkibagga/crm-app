import React, { useEffect, useState } from 'react';
import { Card, Portal, Text, Modal, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UpdateRendezVous } from '@/Types/DataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRendezVous, updateRendezVous } from '@/features/apis/apisSlice';
import { RootState } from '@/Store/Store';
import { loadUserFromStorage } from '@/features/auth/authSlice';

export interface PlaningComponentProps {
    id : string,
    Nom_Prenom: string,
    date: Date,
    localisation: string,
    num_tel: number,
    heure: string,
    statut?: string
}

const PlaningComponent: React.FC<PlaningComponentProps> = ({ Nom_Prenom, date, localisation, heure , id , statut , num_tel }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updatedName, setUpdatedName] = useState <string>(Nom_Prenom);
    const [updatedDate, setUpdatedDate] = useState(date);
    const [updatedAdresse, setUpdatedAdresse] = useState <string>(localisation);
    const [updatedHeure, setUpdatedHeure] = useState <string>(heure);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const handleDateChange = (text: string) => {
        const newDate = new Date(text);
        if (!isNaN(newDate.getTime())) {
            setUpdatedDate(newDate);
        } else {
            
            console.warn('Invalid date format');
        }
    };
 
    const handleUpdate = async () => {
        const updated: UpdateRendezVous = {
            Nom_Prenom: updatedName,
            date: updatedDate,
            localisation: updatedAdresse,
            num_tel: num_tel,
            heure: updatedHeure
        };

        try {
            await dispatch(updateRendezVous({ id, updateRendezVous: updated, token: user.token }) as any);
            setShowModal(false);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleDone = async () => {
        try {
            const updated: UpdateRendezVous = {
                statut: "done"
            };
            await dispatch(updateRendezVous({ id, updateRendezVous: updated, token: user.token }) as any);
          
            dispatch(getAllRendezVous() as any);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };
    

   
    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.headerContainer}>
                    <Text variant="titleLarge" style={styles.text}>{Nom_Prenom}</Text>
                    <FontAwesome name="pencil" size={24} color="black" style={styles.pencilIcon} onPress={() => setShowModal(true)} />
                </View>
                <Text variant="bodyMedium" style={styles.text}>{date.toDateString()}</Text>
                <Text variant="bodyMedium" style={styles.text}>{localisation}</Text>
                <Text variant="bodyMedium" style={styles.text}>{heure}</Text>
                <Text variant="bodyMedium" style={styles.text}>{statut}</Text>
                <View style={styles.buttonContainer}>
                    <Button containerStyle={styles.button} title="Done" color="#1c2b4b" onPress={handleDone} />
                </View>
            </Card.Content>

            <Portal>
                <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                <TextInput
                        label="Name"
                        value={updatedName}
                        onChangeText={text => setUpdatedName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Date"
                        value={updatedDate.toISOString().substring(0, 10)} // Format date to YYYY-MM-DD for input
                        onChangeText={text => handleDateChange(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Address"
                        value={updatedAdresse}
                        onChangeText={text => setUpdatedAdresse(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Time"
                        value={updatedHeure}
                        onChangeText={text => setUpdatedHeure(text)}
                        style={styles.input}
                    />
                    <Button style={styles.updateButton} onPress={handleUpdate} color="#1c2b4b">
                        Update
                    </Button>
                </Modal>
            </Portal>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: '15%',
        borderRadius: 10,
        elevation: 3,
        width: '95%',
        marginLeft: "2%",
        backgroundColor: 'white',
        position: 'relative',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pencilIcon: {
        position: 'absolute',
        right: 0,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        width: '80%', 
        paddingVertical: 10,
        borderRadius: 25,
    },
    text: {
        color: 'black',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    
    input: {
        marginBottom: 10,
    },
    updateButton: {
        marginTop: 10,
       
    },
});

export default PlaningComponent;
