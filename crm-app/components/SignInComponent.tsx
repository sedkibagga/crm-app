import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Card } from '@rneui/themed';
import { TextInput, Text } from 'react-native-paper';
import { Button } from '@rneui/themed';

const SignInComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Card containerStyle={styles.card}>
                <TextInput
                    label="Email"
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    secureTextEntry
                    style={styles.input}
                    right={<TextInput.Icon icon="eye" />}
                />
            </Card>

            <Button buttonStyle={styles.button}>Submit</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       paddingEnd: '5%',
    },
    card: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    input: {
        marginBottom: 20,
        height: 50,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007AFF',
        width: '60%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingEnd: '15%',

    },
});

export default SignInComponent;
