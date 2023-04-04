import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View ,SafeAreaView} from 'react-native'
import { CurrencyRupeeIcon } from 'react-native-heroicons/outline'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/BasketSlice'

const BasketIcon =() => {
    const basketTotal = useSelector(selectBasketTotal)
    const items= useSelector(selectBasketItems);
    const navigation = useNavigation();

    if(items.length ===0) return null;
    return ( 
      <View className='absolute bottom-4 w-full z-50'>
        <TouchableOpacity onPress={() => navigation.navigate("Basket")} className='bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1'> 
            <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-sm'>{items.length}</Text> 
            <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text> 
            <Text className='text-lg text-white font-extrabold text-center'>
               &#8377; {basketTotal} 
                {/* <CurrencyRupeeIcon size={20} color={'black'}/> */}
                </Text> 
        </TouchableOpacity>
      </View>
    )
}

export default BasketIcon
