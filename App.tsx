import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/pages/Login';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
}