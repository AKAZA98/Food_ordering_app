import React, { useEffect } from 'react'
import { Text, View ,SafeAreaView,Image} from 'react-native'
import SafeViewAndroid from './SafeViewAndroid';
// import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen=()=>{
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Delivery')
        },4000)
    })
    return (
      <SafeAreaView className='bg-white flex-1 justify-center items-center'>
        <Image
        source={require('../assets/OrderFood.gif')}
        // animation="slideInUp"
        // iterationCount={1}
        className='h-96 w-96'
        />
        <Text className='text-lg my-10  font-bold text-center'>Waiting For restaurants to accept your order</Text>
        <Progress.Circle size={60} indeterminate={true} color='black'/>
      </SafeAreaView>
    )
}

export default PreparingOrderScreen
