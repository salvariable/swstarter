import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function ResultsScreen() {
    const { name, type } = useLocalSearchParams<{ name: string; type: string }>();
    const router = useRouter();

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!name || !type) return;

        const fetchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/search`, {
                    params: { name, type },
                });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    const data = res.data.map((item: any) => item.properties);
                    setResults(data);
                } else {
                    setError('There are zero matches.\nUse the form to search for People or Movies.');
                }
            } catch (err) {
                setError('Failed to fetch results');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [name, type]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#04B25D" />
                <Text style={styles.info}>Searching...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.chevron}>
                    <Ionicons name="chevron-back" size={28} color="#04B25D" />
                </Pressable>
                <Text style={styles.logo}>SWStarter</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Results</Text>
                <View style={styles.divider} />
                {error || results.length === 0 ? (
                    <>
                        <Text style={styles.info}>{error}</Text>
                        <Pressable style={styles.button} onPress={() => router.back()}>
                            <Text style={styles.buttonText}>BACK TO SEARCH</Text>
                        </Pressable>
                    </>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => item.name || item.title || index.toString()}
                        renderItem={({ item }) => (
                            <>
                                <View style={styles.resultItem}>
                                    <Text style={styles.resultText}>{item.name || item.title}</Text>
                                    <Pressable
                                        style={styles.detailsButton}
                                        onPress={() =>
                                            router.push({ pathname: '/details', params: { ...item, type } })
                                        }
                                    >
                                        <Text style={styles.detailsText}>SEE DETAILS</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.divider} />
                            </>
                        )}
                        ListFooterComponent={
                            <Pressable style={styles.button} onPress={() => router.back()}>
                                <Text style={styles.buttonText}>BACK TO SEARCH</Text>
                            </Pressable>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: 'white' },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#04B25D',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevron: {
        position: 'absolute',
        left: 16,
        top: 16,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#04B25D',
    },
    container: { flex: 1, padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    divider: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 16 },
    info: { fontSize: 20, fontWeight: 'bold', color: '#bbb', textAlign: 'center', marginBottom: 24 },
    resultItem: {
        marginBottom: 16,
    },
    resultText: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    detailsButton: {
        backgroundColor: '#04B25D',
        paddingVertical: 12,
        borderRadius: 32,
        alignItems: 'center',
        marginBottom: 16,
    },
    detailsText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    button: {
        backgroundColor: '#04B25D',
        padding: 16,
        borderRadius: 32,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
