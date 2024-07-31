import { View, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { loginUserType } from '../Types/DataTypes';
import { loadUserFromStorage, loginUser } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SignInComponent = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();

    const onSubmit = () => {
        if (!password || !email) {
            alert('Please enter all fields');
        } else {
            const loginData: loginUserType = { email, password };
            dispatch(loginUser(loginData) as any);
        }
    };

    useEffect(() => {
        dispatch(loadUserFromStorage() as any);
    }, [dispatch]);

    useEffect(() => {
        // if (user && user.token) {
        //     navigation.navigate('Form' as never);
        // }
    }, [user, navigation]);

    return (
        <LinearGradient
            colors={['#0000', '#000000']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Email"
                        style={styles.input}
                        onChangeText={setEmail}
                        textColor='black'
                    />
                    <TextInput
                        label="Password"
                        secureTextEntry
                        style={styles.input}
                        right={<TextInput.Icon icon="eye" />}
                        onChangeText={setPassword}
                        textColor='black'
                    />
                    <Button buttonStyle={styles.button} onPress={onSubmit}>Submit</Button>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    logo: {
        width: Dimensions.get('window').width * 0.5,
        height: undefined,
        aspectRatio: 1,
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        marginBottom: 15, 
        height: 50,
        fontSize: 18,
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#1c2b4b',
        width: '90%', 
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        paddingEnd: "25%",
    },
});

export default SignInComponent;
