import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react'
import { Text, View ,SafeAreaView, TouchableOpacity, Image, ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/BasketSlice';
import { selectRestaurants } from '../features/RestaurantSlice';
import SafeViewAndroid from './SafeViewAndroid';
import {XCircleIcon} from "react-native-heroicons/outline";
import { urlFor } from '../sanity';

const BasketScreen=() => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurants)
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const basketTotal=useSelector(selectBasketTotal)

    useMemo(()=>{
        const groupedItems= items.reduce((results,item)=> {
            (results[item.id]= results[item.id] || []).push(item);
            return results;
        },{})
        setGroupedItemsInBasket(groupedItems)
    },[items])
    return (
        <SafeAreaView className='bg-white flex-1' style={SafeViewAndroid.AndroidSafeArea}>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00CCBB] shadow-xm'> 
            <View>
                <Text className='text-lg font-bold text-center'>Basket</Text>
                <Text className='text-gray-400 text-center'>{restaurant.title}</Text>
            </View>
            <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-5 right-5'>
                <XCircleIcon color='#00CCBB' size={40}/>
                
            </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-4 bg-white my-5'>
            <Image source={{
                uri:'https://links.papareact.com/wru'
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <Text className='flex-1'> Deliver in 50-75 min</Text>
            <TouchableOpacity>
                <Text className='text-[#00CCBB]'>Change</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemsInBasket).map(([key,items])=>(
                <View key={key} className='flex-row items-center space-x-3 bg-white py-2 mt-1 px-5'>
                    <Text className='text-[#00BBCC]'>{items.length} x</Text>
                    <Image
                    source={{uri: urlFor(items[0]?.image).url() }}
                    className='h-12 w-12 rounded-full'
                    />
                    <Text className='flex-1'>{items[0]?.name}</Text>
                    <Text className='text-gray-600'>
               &#8377; {items[0]?.price} 
                {/* <CurrencyRupeeIcon size={20} color={'black'}/> */}
                </Text> 
                <TouchableOpacity>
                    <Text
                    className='text-[#00CCBB] text-xm'
                    onPress={()=>dispatch(removeFromBasket({ id:key }))}>
                        Remove
                    </Text>
                </TouchableOpacity>

                </View>
            ))}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4'>
        <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Sub Total</Text>
            <Text className='text-gray-400'>
            &#8377; {basketTotal} 
            </Text>
            </View>

        <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
            &#8377; {20} 
            </Text>
        </View>

        <View className='flex-row justify-between'>
            <Text>Order Total</Text>
            <Text className='font-extrabold'>
            &#8377; {basketTotal+20} 
            </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PreparingOrder')} className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
        </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    )
}

export default BasketScreen
