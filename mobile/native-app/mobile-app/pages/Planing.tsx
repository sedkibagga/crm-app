import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import PlaningComponent, { PlaningComponentProps } from '../components/PlaningComponent';
import Header from '../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import { getAllRendezVous } from '@/features/apis/apisSlice';
import { getRendezVous } from '@/Types/DataTypes';

const Planing = () => {
    const dispatch = useDispatch();
    const { showModalNavigation } = useSelector((state: RootState) => state.state);
    const { user } = useSelector((state: RootState) => state.auth);
    const {rendez_vous_List} = useSelector((state: RootState) => state.api);
     console.log("rendez_vous_List" , rendez_vous_List);
     useEffect(() => {
        dispatch(getAllRendezVous() as any); 
    }, [dispatch]);
     
      

    const [TextSearch, setTextSearch] = useState<string>("");

    console.log(TextSearch);

    return (
        <View style={styles.container}>
            {user && user.token ? (
                <>
                  
                    <ScrollView>
                    {rendez_vous_List && rendez_vous_List.length > 0 ? (
                        rendez_vous_List.map((rendez_vous: getRendezVous) => (
                            <PlaningComponent
                                key={rendez_vous.id}
                                id={rendez_vous.id}
                                Nom_Prenom={rendez_vous.Nom_Prenom}
                                date={new Date(rendez_vous.date)}
                                localisation={rendez_vous.localisation}
                                num_tel={rendez_vous.num_tel}
                                heure={rendez_vous.heure}
                                statut={rendez_vous.statut}
                            />
                        ))
                    ) : (
                        <View style={styles.unauthorizedContainer}>
                            <Text>No rendez-vous found</Text>
                        </View>
                    )}
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
