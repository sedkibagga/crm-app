import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Avatar,  Card, Text , Portal , Modal, TextInput } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Button } from '@rneui/themed';
import { updatePointDeVente } from '@/Types/DataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPointDeVente, update_Point_De_Vente } from '@/features/apis/apisSlice';
import { RootState } from '@/Store/Store';


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
  const [showModal , setShowModal] = useState<boolean>(false);
  const [updatedNom , setUpdatedNom] = useState <string>(Nom);
  const [updatedPrenom , setUpdatedPrenom] = useState <string>(Prenom);
  const [updatedSecteur , setUpdatedSecteur] = useState <string>(Secteur);
  const [updatedNumTel , setUpdatedNumTel] = useState <number>(Num_Tel);
  const [updatedLocalisation , setUpdatedLocalisation] = useState <string>(Localisation);
  const [updatedDecision , setUpdatedDecision] = useState <string>(Decision); 
const dispatch = useDispatch();
const {user} = useSelector((state: RootState) => state.auth);
  const handleUpdate = async () => { 
    const pointDeVenteUpdated : updatePointDeVente = {
        nom : updatedNom,
        prenom : updatedPrenom,
        secteur_activite : updatedSecteur,
        num_tel : updatedNumTel,
        localisation : updatedLocalisation,
        decision : updatedDecision
    } 
    try {
       const token = user.token;
       await dispatch(update_Point_De_Vente({ id, updatePointDeVente: pointDeVenteUpdated, token }) as any);
       dispatch(getAllPointDeVente() as any);
       setShowModal(false);
    } catch (error) {
        console.error('Update failed:', error);
    }
  }
  return (
    <View style={styles.container}> 
      <Card style={styles.card}>
       
        <Card.Content>
        <Card.Content>
        <FontAwesome name="pencil" size={24} color="black" style={styles.pencilIcon} onPress={() => setShowModal(true)}  />

          <Text variant="titleLarge" style={styles.text}>client : {Nom} {Prenom}</Text>
          <Text variant="bodyMedium" style={styles.text}>Secteur : {Secteur}</Text>
          <Text variant="bodyMedium" style={styles.text}>Num_Tel : {Num_Tel}</Text>
          <Text variant="bodyMedium" style={styles.text}>Localisation :{Localisation}</Text>
          <Text variant="bodyMedium" style={styles.text}>Décision : {Decision}</Text>
        </Card.Content>
        </Card.Content>
      </Card>


      <Portal>
      <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                <TextInput
                        label="Name"
                        value={updatedNom}
                        onChangeText={ text => setUpdatedNom(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Prenom"
                        value={updatedPrenom} 
                        onChangeText={text => setUpdatedPrenom(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Secteur"
                        value={updatedSecteur}
                        onChangeText={text => setUpdatedSecteur(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Num_Tel"
                        value={updatedNumTel.toString()}
                        onChangeText={text => setUpdatedNumTel(parseInt(text))}
                        style={styles.input}
                    />
                    <Button style={styles.updateButton} onPress={handleUpdate} color="#1c2b4b" >
                        Update
                    </Button>
                </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
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
  pencilIcon: {
    position: 'absolute',
    right: 0,
},
});

export default PointVenteCard;
