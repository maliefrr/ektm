/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import LoginPage from "./components/LoginPage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from "react-native";
import DashboardScreen from "./components/DashboardScreen";

// Create a stack navigator
const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown : false}}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  }
})


export default App;
