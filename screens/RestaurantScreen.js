import { useRoute } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import { Text,TouchableOpacity, View ,SafeAreaView, ScrollView, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline'
import { MapPinIcon} from "react-native-heroicons/outline";
import Dishrow from '../components/Dishrow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/RestaurantSlice'


const RestaurantScreen =()=>{
  const dispatch = useDispatch();
  const {params:{
    id,imgUrl,title,rating,genre,address,short_description,dishes,long,lat
  },} = useRoute();
  useEffect(()=>{
    dispatch(setRestaurant({
      id,imgUrl,title,rating,genre,address,short_description,dishes,long,lat
    }))
  },[dispatch])
  const navigation = useNavigation();
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown:false,
    })
  },[])
  
    return (
      // <SafeAreaView className='bg-white pt-5' style={SafeViewAndroid.AndroidSafeArea}>
      <>
      <BasketIcon/>
      <ScrollView>
        <View className='relative'>
        <Image
        source={{
          uri:urlFor(imgUrl).url(),
        }}
        className='w-full h-56 bg-gray-300 p-4'
        />
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-10 left-5 p-2 bg-gray-100 rounded-full'>
          <ArrowLeftIcon size={20} color='#00CCBB'/>
        </TouchableOpacity>
        </View>
        <View className='bg-white'>
          <View className='px-4 pt-4'>
          <Text className='text-3xl font-bold'>{title} </Text>
          <View className='flex-row sapce-x-2 my-2'>
            <View className='flex-row items-center sapce-x-1'>
              <StarIcon color='green' opacity={0.5} size={22}/>
              <Text className='text-xm text-gray-500 px-2'>
                    <Text className='text-green-500'>{rating}</Text> . {genre}
                </Text>
            </View>
            <View className='flex-row items-center sapce-x-1'>
            <MapPinIcon color='gray' opacity={0.4} size={22}/>
              <Text className='text-xm text-gray-500 px-2'>Nearby . {address }
                </Text>
            </View>
          </View>
          <Text className='text-gray-500 mt-2 pb-4'>
            {short_description}
          </Text>
          </View>
          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-gray-300'>
            <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20}/>
            <Text className='pl-2 flex-1 text-md font-bold'>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color='#00CCBB' />
          </TouchableOpacity>
        </View>
        <View className='pb-36'>
          <Text className='px-4 pt-4 mb-2 font-bold text-xl' > Menu </Text>
        {dishes.map(dish=>(
          <Dishrow 
          key={dish._id}
          id={dish._id}
          name={dish.name}
          discription={dish.short_description}
          price={dish.price}
          image={dish.image}
          />
        ))}
          </View>
      </ScrollView>
      </>
      // </SafeAreaView>
    )
}

export default RestaurantScreen
