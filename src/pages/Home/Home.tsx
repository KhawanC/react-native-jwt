import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export const Home = () => {
    return(
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});
