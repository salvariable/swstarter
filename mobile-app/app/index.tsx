import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const router = useRouter();
    const [type, setType] = useState('people');
    const [name, setName] = useState('');

    const handleSearch = () => {
        if (!name.trim()) return;
        router.push({ pathname: '/results', params: { name, type } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>SWStarter</Text>
            <Text style={styles.subtitle}>What are you searching for ?</Text>

            <View style={styles.toggleGroup}>
                <Pressable
                    style={[styles.toggleButton, type === 'people' && styles.selectedToggle]}
                    onPress={() => setType('people')}
                >
                    <View style={styles.radioCircle}>
                        {type === 'people' && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.toggleLabel}>People</Text>
                </Pressable>

                <Pressable
                    style={[styles.toggleButton, type === 'movies' && styles.selectedToggle]}
                    onPress={() => setType('movies')}
                >
                    <View style={styles.radioCircle}>
                        {type === 'movies' && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.toggleLabel}>Movies</Text>
                </Pressable>
            </View>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={type === 'people' ? 'e.g. Chewbacca, Yoda' : 'e.g. A New Hope'}
                placeholderTextColor="#999"
            />

            <Pressable
                style={[styles.searchButton, !name.trim() && styles.disabledButton]}
                onPress={handleSearch}
                disabled={!name.trim()}
            >
                <Text style={styles.searchButtonText}>SEARCH</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: 'white' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#04B25D', textAlign: 'center', marginVertical: 16 },
    subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
    toggleGroup: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    toggleButton: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
    selectedToggle: {},
    toggleLabel: { fontSize: 18, fontWeight: '600', marginLeft: 8 },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#04B25D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#04B25D',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        borderRadius: 8,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    searchButton: {
        backgroundColor: '#04B25D',
        padding: 16,
        borderRadius: 32,
        alignItems: 'center',
    },
    disabledButton: { backgroundColor: '#ccc' },
    searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
