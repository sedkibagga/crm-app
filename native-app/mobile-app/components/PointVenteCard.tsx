import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
export interface PointVenteCardProps {
    id : string ; 
    Nom : string;
    Prenom : string;
    Secteur : string;
    Num_Tel : number;
    Localisation : string;
    Decision : string;
}
const PointVenteCard : React.FC<PointVenteCardProps> = ({id ,Nom, Prenom, Secteur, Num_Tel, Localisation, Decision}) => {
  return (
    <View style={styles.container}> 
      <Card style={styles.card}>
       
        <Card.Content>
        <Card.Content>
          <Text variant="titleLarge" style={styles.text}>client : {Nom} {Prenom}</Text>
          <Text variant="bodyMedium" style={styles.text}>Secteur : {Secteur}</Text>
          <Text variant="bodyMedium" style={styles.text}>Num_Tel : {Num_Tel}</Text>
          <Text variant="bodyMedium" style={styles.text}>Localisation :{Localisation}</Text>
          <Text variant="bodyMedium" style={styles.text}>Décision : {Decision}</Text>
        </Card.Content>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, 
  },
  card: {
    width: '90%',
    marginBottom: '20%', 
    marginTop: '5%',
    height: '70%',
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 10,
    color : 'black'
  },
});

export default PointVenteCard;
