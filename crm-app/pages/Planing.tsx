import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import PlaningComponent, { PlaningComponentProps } from '../components/PlaningComponent';

const Planing = () => {
    const data: PlaningComponentProps[] = [
        {
            name_client: 'baggasedki',
            date: '10/09/2024',
            adresse: 'sousse centre',
            heure: '16:40'
        },
        {
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        },
        
        {
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        },
        {
            name_client: 'Nour',
            date: '14/05/2024',
            adresse: 'souuse cnrps',
            heure: '17h'
        }
    ]; 

    const [Text , setText] = useState<string> ("") ;
    console.log(Text)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Searchbar
                placeholder="Search"
                value={Text}
                style={styles.searchBar}
                onChange={(e) => setText(e.nativeEvent.text)}
            />
            {data.map((item: PlaningComponentProps, index: number) => (
                <PlaningComponent
                    key={index}
                    name_client={item.name_client}
                    date={item.date}
                    adresse={item.adresse}
                    heure={item.heure}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    searchBar: {
        marginTop: '20%',
        marginHorizontal: 20,
    },
});

export default Planing;
