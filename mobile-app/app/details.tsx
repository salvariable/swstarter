import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const type = params.type;
    const isPerson = type === 'people';

    const formatList = (input: any) => {
        if (!input) return '';
        const items = Array.isArray(input) ? input : input.split(',');
        return items
            .map((item: string) => {
                const parts = item.trim().split('/');
                const name = parts[parts.length - 1].replace(/%20/g, ' ');
                return name.charAt(0).toUpperCase() + name.slice(1);
            })
            .join(', ');
    };

    console.log('Details params ==============:', params);

    const characterList = (params.characters || '')
        .split(',')
        .map((name: string, index: number) => (
            <Text key={index} style={styles.characterName}>
                {name.trim()}
                {index < (params.characters?.split(',').length || 0) - 1 ? ', ' : ''}
            </Text>
        ));

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.chevron}>
                    <Ionicons name="chevron-back" size={28} color="#04B25D" />
                </Pressable>
                <Text style={styles.logo}>SWStarter</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{params.name || params.title}</Text>

                {isPerson ? (
                    <>
                        <Text style={styles.section}>Details</Text>
                        <View style={styles.divider} />
                        <View style={styles.detailBlock}>
                            <Text style={styles.detail}>Birth Year: {params.birth_year}</Text>
                            <Text style={styles.detail}>Gender: {params.gender}</Text>
                            <Text style={styles.detail}>Eye Color: {params.eye_color}</Text>
                            <Text style={styles.detail}>Hair Color: {params.hair_color}</Text>
                            <Text style={styles.detail}>Height: {params.height}</Text>
                            <Text style={styles.detail}>Mass: {params.mass}</Text>
                        </View>
                        <Text style={styles.section}>Films</Text>
                        <View style={styles.divider} />
                        <View style={styles.detailBlock}>
                            <Text style={styles.characters}>{formatList(params.films)}</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.section}>Opening Crawl</Text>
                        <View style={styles.divider} />
                        <View style={styles.detailBlock}>
                            <Text style={styles.crawl}>{params.opening_crawl}</Text>
                        </View>
                        <Text style={styles.section}>Characters</Text>
                        <View style={styles.divider} />
                        <View style={styles.detailBlock}>
                            <Text style={styles.characters}>{characterList}</Text>
                        </View>
                    </>
                )}

                <Pressable style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>BACK TO SEARCH</Text>
                </Pressable>
            </ScrollView>
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
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    section: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 12,
    },
    detailBlock: { marginBottom: 16 },
    detail: { fontSize: 16, marginBottom: 4 },
    crawl: { fontSize: 16, color: '#333', lineHeight: 22 },
    characters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    characterName: {
        fontSize: 16,
        lineHeight: 22,
        color: '#0284C7',
    },
    button: {
        backgroundColor: '#04B25D',
        padding: 14,
        borderRadius: 28,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
