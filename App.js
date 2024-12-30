// Import Statements
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from './Component/supabase';
import SignInScreen from './Component/SingIn';
import SignUpScreen from './Component/SignupLogin';
import ProfileScreen from './Component/Profile';
import HomeScreen from './Component/HomeScreen';
import MenuScreen from './Component/Menu';
import { CartProvider, CartContext } from './Component/CartContext';
import { OrdersScreen } from './Component/OrdersScreen';
import { CategoryItemsScreen } from './Component/CategoryItemsScreen';
import ItemDescriptionScreen from './Component/ItemDescriptionScreen';

// Tab and Stack Navigator Definitions
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Tab Navigation
function TabNavigator() {
  const { getTotalItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Menu':
              iconName = 'restaurant-outline';
              break;
            case 'Orders':
              iconName = 'cart-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:

              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: 'gray',
        tabBarBadge: route.name === 'Orders' ? getTotalItems() || null : null,
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingVertical: 5,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          headerShown: true,
          title: 'My Profile'
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          {session ? (
            <>
              <Stack.Screen name="MainApp" component={TabNavigator} />
              <Stack.Screen name="CategoryItems" component={CategoryItemsScreen} />
              <Stack.Screen name="Orders" component={OrdersScreen} />
              <Stack.Screen name="ItemDescription" component={ItemDescriptionScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 24,
  },
});
