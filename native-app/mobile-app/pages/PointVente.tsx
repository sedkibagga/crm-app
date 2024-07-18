import { View, StyleSheet, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/HeaderComponent';
import PointVenteCard, { PointVenteCardProps } from '../components/PointVenteCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPointDeVente } from '../features/apis/apisSlice';
import { RootState } from '@/Store/Store';
import { Portal , Modal } from 'react-native-paper';
import { hideModal } from '../features/states/stateSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const PointVente = () => {
    const dispatch = useDispatch();
  const navigation = useNavigation();
    useEffect(() => {
        dispatch(getAllPointDeVente() as any);
    }, [dispatch]);
    const {user} = useSelector((state: RootState) => state.auth);
    const { pointsDeVente } = useSelector((state: RootState) => state.api);
    console.log("pointsDeVente", pointsDeVente);
    const { showModalNavigation, showModalProfile } = useSelector((state: RootState) => state.state);
    console.log("showModalNavigation", showModalNavigation);
    return (
        <View>
            <View style={styles.headerContainer}>
                {/* <Header /> */}
            </View>
            <ScrollView>
                {pointsDeVente && pointsDeVente.map((item) => (
                    <PointVenteCard
                        key={item.id}
                        id={item.id}
                        Nom={item.nom}
                        Prenom={item.prenom}
                        Secteur={item.secteur_activite}
                        Num_Tel={item.num_tel}
                        Localisation={item.localisation}
                        Decision={item.decision}
                    />
                ))}

            </ScrollView>
            
            <Portal>
                <Modal visible={showModalNavigation} onDismiss={() => dispatch(hideModal())} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change page</Text>
                        {user && (
                            <View style={styles.modalContent}>
                                <View style={styles.inlineContainer}>
                                    <Text style={styles.inlineText}>Planning Page</Text>
                                    <AntDesign
                                        name="calendar"
                                        size={24}
                                        color="black"
                                        onPress={() => {
                                            dispatch(hideModal());
                                            navigation.navigate('Planing' as never);
                                        }}
                                    />
                                </View>
                                <View style={styles.inlineContainer}>
                                    <Text style={styles.inlineText}>Form Page</Text>
                                    <AntDesign
                                        name="form"
                                        size={24}
                                        color="black"
                                        onPress={() => {
                                            dispatch(hideModal());
                                            navigation.navigate('Form' as never);
                                        }}
                                    />
                                </View>
                                <View style={styles.inlineContainer}>
                                    <Text style={styles.inlineText}>Point Vente Page</Text>
                                    <AntDesign
                                        name="form"
                                        size={24}
                                        color="black"
                                        onPress={() => {
                                            dispatch(hideModal());
                                            navigation.navigate('PointVente' as never);
                                        }}
                                    />
                                </View>
                                        
                            </View>
                        )}
                    </View>
                </Modal>
            </Portal>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',

    },
    headerContainer: {
        marginTop: '0%',
        padding: 0,
        height: 60,
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: "30%",
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileContainer: {
        alignItems: 'center',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    logoutText: {
        marginRight: 10,
        fontSize: 16,
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
    },
    inlineText: {
        fontSize: 16,
        marginRight: 10,
    },
});

export default PointVente;
