import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './components/SearchScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
