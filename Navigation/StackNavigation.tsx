import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../src/Screen/LoginScreen';
import { PRIMARY_COLOR } from '../commons/Contances';
import { RegisterScreen } from '../src/Screen/RegisterScreen';


const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        cardStyle:{
            backgroundColor: PRIMARY_COLOR
        }
    }}>
      <Stack.Screen name="Login" options={{headerShown: false}}component={LoginScreen} />
      <Stack.Screen name="Register" options={{headerShown: false}}component={RegisterScreen} />
    </Stack.Navigator>
  );
}