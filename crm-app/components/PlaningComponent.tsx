import React from 'react'
import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export interface PlaningComponentProps {
    name_client: string;
    date: string;
    adresse: string;
    heure: string;
}

const PlaningComponent: React.FC<PlaningComponentProps> = ({ name_client, date, adresse, heure }) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">{name_client}</Text>
                <Text variant="bodyMedium">{date}</Text>
                <Text variant="bodyMedium">{adresse}</Text>
                <Text variant="bodyMedium">{heure}</Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        
        marginTop: '15%',
    },
});

export default PlaningComponent;
