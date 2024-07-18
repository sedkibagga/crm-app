import React, { useState } from 'react';
import { Card, Portal, Text, Modal, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface PlaningComponentProps {
    id : string;
    name_client: string;
    date: string;
    adresse: string;
    heure: string;
}

const PlaningComponent: React.FC<PlaningComponentProps> = ({ name_client, date, adresse, heure , id }) => {
    const [showModal, setShowModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(name_client);
    const [updatedDate, setUpdatedDate] = useState(date);
    const [updatedAdresse, setUpdatedAdresse] = useState(adresse);
    const [updatedHeure, setUpdatedHeure] = useState(heure);
    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.headerContainer}>
                    <Text variant="titleLarge" style={styles.text}>{name_client}</Text>
                    <FontAwesome name="pencil" size={24} color="black" style={styles.pencilIcon} onPress={() => setShowModal(true)} />
                </View>
                <Text variant="bodyMedium" style={styles.text}>{date}</Text>
                <Text variant="bodyMedium" style={styles.text}>{adresse}</Text>
                <Text variant="bodyMedium" style={styles.text}>{heure}</Text>
                <View style={styles.buttonContainer}>
                    <Button containerStyle={styles.button} title="Done" color="#1c2b4b" />
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
                        value={updatedDate}
                        onChangeText={text => setUpdatedDate(text)}
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
                    <Button   style={styles.updateButton}>
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
