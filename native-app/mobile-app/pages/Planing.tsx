import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import PlaningComponent, { PlaningComponentProps } from '../components/PlaningComponent';
import Header from '../components/HeaderComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';

const Planing = () => {
    const { showModalNavigation } = useSelector((state: RootState) => state.state);
    const { user } = useSelector((state: RootState) => state.auth);

    const data: PlaningComponentProps[] = [
        { 
            id : '1',
            name_client: 'baggasedki',
            date: '10/09/2024',
            adresse: 'sousse centre',
            heure: '16:40'
        },
        { 
            id : '2',
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        },
        {   
            id : '3',
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        },
        {  
            id : '4',
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        }
    ];

    const [TextSearch, setTextSearch] = useState<string>("");

    console.log(TextSearch);

    return (
        <View style={styles.container}>
            {user && user.token ? (
                <>
                  
                    <ScrollView>
                        {data.map((item: PlaningComponentProps, index: number) => (
                            <PlaningComponent
                            id={item.id}
                                key={index}
                                name_client={item.name_client}
                                date={item.date}
                                adresse={item.adresse}
                                heure={item.heure}
                            />
                        ))}
                    </ScrollView>
                </>
            ) : (
                <View style={styles.unauthorizedContainer}>
                    <Text>You are not authorized</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
         
    },
    headerContainer: {
        marginTop: '0%',
        padding: 0,
        height: 60,
    },
    searchBar: {
        marginVertical: 20,
        marginHorizontal: 20,
        marginTop: '10%', // Adjust margin to fit the larger header
    },
    unauthorizedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Planing;
