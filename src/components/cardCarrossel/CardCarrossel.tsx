import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import IconAnt from 'react-native-vector-icons/AntDesign';

export function CarrouselCard({id, titulo, descricao, isCompleto}) {

    return(
        <View style={styles.boxCardStyle}>
            <View style={styles.boxTitulos}>
            {isCompleto ? <IconAnt name='check' size={20} color={'green'} style={{marginBottom: 8}}/> : <IconAnt name='close' size={20} color={'red'} style={{marginBottom: 8}}/>}
                <Text style={styles.tituloStyle}>{titulo}</Text>
                <Text style={styles.descStyle}>{descricao}</Text>
            </View>
            <View style={styles.boxDatas}>
                <Text>6 Outubro, 2022</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    boxCardStyle: {
        width: 180,
        height: 250,
        margin: 25,
        padding: 5,
        borderColor: '#00a2ff',
        borderWidth: 2,
        borderRadius: 40,
    },
    boxTitulos: {
        width: '100%',
        height: '80%',
        paddingTop: 10,
        alignItems: 'center'
    },
    boxDatas: {
        width: '100%',
        height: '20%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tituloStyle: {
        fontSize: 22,
        fontWeight: '700'
    },
    descStyle: {
        marginTop: 10,
        fontSize: 15,
        color: '#424242',
        textAlign: 'center'
    }
})
