import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from '@rneui/themed';
import { TextInput, Text } from 'react-native-paper';
import { Button } from '@rneui/themed';

const FormComponent = () => {
    return (
        <View style={styles.container}>
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
                    label="décision"
                    style={styles.input}
                />
            </Card>

            <Button buttonStyle={styles.button}>Submit</Button>

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
        marginBottom: 20,
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
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
        paddingEnd: '12%',

    }
});

export default FormComponent;
