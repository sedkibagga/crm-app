import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapComponent from '@/components/MapComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
const MapPage = () => {
    const localisations:string[] = [] ;
    const { pointsDeVente } = useSelector((state: RootState) => state.api);
     console.log("pointsDeVente", pointsDeVente);
     if (pointsDeVente!==null) {
        for (const item of pointsDeVente) { 
            localisations.push(item.localisation);
        }
     }
    
    return (
        <View style={styles.container}>
              <MapComponent names={[...localisations]} /> 
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    
});

export default MapPage;
