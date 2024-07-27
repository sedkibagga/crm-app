import React, { useEffect, useState, useCallback, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MapComponent = ({ names }: { names: string[] }) => {
    const [coordinates, setCoordinates] = useState<{ name: string; latitude: number; longitude: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const cache = useRef(new Map<string, { latitude: number; longitude: number }>());

    const getCoordinates = useCallback(async (locationName: string) => {
        if (cache.current.has(locationName.toLowerCase())) {
            return cache.current.get(locationName.toLowerCase())!;
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json`;

        try {
            const response = await axios.get(url);
            // console.log(response.data);
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const newCoordinates = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
                cache.current.set(locationName.toLowerCase(), newCoordinates);
                return newCoordinates;
            } else {
                throw new Error('Location not found');
            }
        } catch (err) {
            throw new Error('Error fetching location');
        }
    }, []);

    const fetchAllCoordinates = async () => {
        setLoading(true);
        const coords: { name: string; latitude: number; longitude: number }[] = [];

        for (const name of names) {
            try {
                const coordsForName = await getCoordinates(name);
                coords.push({ name, ...coordsForName });
            } catch (error: any) {
                setError(error.message);
            }
        }

        // console.log('Fetched coordinates:', coords); // Log fetched coordinates
        setCoordinates(coords);
        setLoading(false);
    };

    useEffect(() => {
        // console.log('Names prop changed:', names); // Log when names change
        fetchAllCoordinates();
    }, [names]); // Only depend on names

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (coordinates.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No coordinates available</Text>
            </View>
        );
    }

    const initialRegion = {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={initialRegion}
            >
                {coordinates.map(({ name, latitude, longitude }, index) => (
                    <Marker
                        key={`${name}-${index}`} 
                        coordinate={{ latitude, longitude }}
                        title={name} 
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
