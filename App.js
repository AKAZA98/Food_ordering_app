import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { TailwindProvider } from 'nativewind';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import { Provider } from "react-redux";
import { store } from './Store';
// import { TransitionPresets } from '@react-navigation/stack';
// import "react-native-gesture-handler"

import { TailwindProvider } from 'tailwindcss-react-native';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
  
      <TailwindProvider>
    <Provider store={store}>
         <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
          <Stack.Screen name="Basket" component={BasketScreen}
          options={{presentation:"modal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen}
           options={{presentation:"fullScreenModal",animation:"slide_from_bottom" , headerShown:false,
        }}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen}
           options={{presentation:"fullScreenModal" , headerShown:false,
        }}/>
         </Stack.Navigator>
    </Provider>

      </TailwindProvider>

    </NavigationContainer>
  );
}

