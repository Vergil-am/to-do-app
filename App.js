import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './Colors';
import TaskList from './screens/TaskList';
import Home from './screens/Home';





const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="List" component={TaskList} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text : {
    color: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
