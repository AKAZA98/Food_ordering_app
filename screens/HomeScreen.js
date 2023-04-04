import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, Text, View , Image, TextInput, ScrollView} from 'react-native'
import SafeViewAndroid from "./SafeViewAndroid";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import sanityClient from '../Sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories]=useState([])

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown:false,
    })
  },[])
  useEffect(()=>{
    sanityClient.fetch(`
    *[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      },
    }`).then((data) =>{
      setFeaturedCategories(data);
    });
  },[]);
  // console.log(featuredCategories)
    return (
      <SafeAreaView className='bg-white pt-5' style={SafeViewAndroid.AndroidSafeArea}>
           <View className='flex-row pb-3 items-center mx-4 space-x-2'>
            <Image 
            source={{
              uri:'https://links.papareact.com/wru',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
              />

              <View className='flex-1'>
                <Text className='font-bold text-gray-400 text-xs'> Deliver Now!</Text>
                <Text  className='flex-row items-center font-bold text-xl'>
                  Currect Location
                <ChevronDownIcon size={15} color='#00CCBB'/>
                </Text>
              </View>
              <UserIcon size={32} color='#00CCBB'/>
           </View>
           
           {/* Search */}
           <View className='flex-row items-center space-x-2 pb-2 mx-4'>
            <View className='bg-gray-200 flex-row flex-1 space-x-2 p-2'>
              <UserIcon color='gray' size={20}/>
               <TextInput className='w-full'
             placeholder='Restraunts and cuisines' 
              keyboardType='default'/>
            </View>
            <ChevronDownIcon color='#00CCBB' />
           </View>
           <ScrollView className='bg-gray-100'
           contentContainerStyle={{
            paddingBottom:100,
           }}>
            {/* categories */}
            <Categories/>
          {/* Featured row */}
          {featuredCategories?.map(category=>(
          <FeaturedRow 
          key={category._id}
          id={category._id}
          title={category.name}
          discription={category.short_discription}
          />
          ))}
          {/* <Text>{featuredCategories}</Text> */}
           </ScrollView>
      </SafeAreaView>
    )
  }


export default HomeScreen
