import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card } from '@rneui/themed';
import { TextInput, Text, ActivityIndicator } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { loginUserType } from '../Types/DataTypes';
import { loadUserFromStorage, loginUser } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const SignInComponent = () => {
    const { isLoading, isError, isSuccess, message, user } = useSelector((state: RootState) => state.auth);
    console.log("user,", user);
    console.log("isSuccess", isSuccess);
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();

    const onSubmit = () => {
        if (!password || !email) {
            alert('Please enter all fields');
            console.log("user,", user);
        } else {
            const loginData: loginUserType = { email, password };
            dispatch(loginUser(loginData) as any);
        }
    };

    useEffect(() => {
        dispatch(loadUserFromStorage() as any);
    }, [dispatch,isSuccess]);

    useEffect(() => {
        if (user && user.token) {
            navigation.navigate('Form' as never);
        }
    }, [user, navigation]);



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Card containerStyle={styles.card}>
                <TextInput
                    label="Email"
                    style={styles.input}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />
                <TextInput
                    label="Password"
                    //secureTextEntry
                    style={styles.input}
                    right={<TextInput.Icon icon="eye" />}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                   
                />
            </Card>

            <Button buttonStyle={styles.button} onPress={onSubmit}>Submit</Button>
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
