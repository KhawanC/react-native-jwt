import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import 'react-native-gesture-handler';
import { Login } from './src/pages/Login/Login';
import Routes from './src/routes/routes';

export default function App() {
  return (
      <Routes/>
  );
}