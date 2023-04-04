import React, { useEffect,useState } from 'react'
import { View, Text,TouchableOpacity, ScrollView} from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity';

const FeaturedRow=({id,title, discription})=> {
  const [restaurants, setRestaurants]=useState([])
  useEffect(()=>{
    sanityClient.fetch(`
    *[_type == "featured" && _id==$id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
           type->{
             name
           }
      },
    }[0]`
    ,{id}
    ).then((data) =>{
      setRestaurants(data?.restaurants);
    });
  },[id]);
  // console.log(restaurants)

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <TouchableOpacity>

        <ArrowRightIcon color='#00CCBB'/>
        </TouchableOpacity>
      </View>
      <Text className='text-xs text-gray-500 px-4'>{discription}</Text>
      <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal:15,
      }}
      showsHorizontalScrollIndicator={false}
      className='pt-4'>
        {/* restraunt card */}
        {restaurants?.map(restaurant=>(
          <RestaurantCard
          key={restaurant._id} 
          id={restaurant._id} 
          imgUrl={restaurant.image} 
          title={restaurant.name} 
          rating={restaurant.rating} 
          genre={restaurant.type?.name} 
          address={restaurant.address} 
          short_description={restaurant.short_description} 
          dishes={restaurant.dishes} 
          long={restaurant.long} 
          lat={restaurant.lat} 
          />
          ))}
        {/* <RestaurantCard 
        id={123}
        imgUrl='https://spoonacular.com/recipeImages/639057-556x370.jpg'
        title='Yo! Sushi'
        rating={4.5}
        genre='Indian'
        address='123 main'
        short_description='This is des' 
        dishes={[]} 
        long={20} 
        lat={0}
        />
        <RestaurantCard 
        id={123}
        imgUrl='https://spoonacular.com/recipeImages/639057-556x370.jpg'
        title='Yo! Sushi'
        rating={4.5}
        genre='Indian'
        address='123 main'
        short_description='This is des' 
        dishes={[]} 
        long={20} 
        lat={0}
        />
        <RestaurantCard 
        id={123}
        imgUrl='https://spoonacular.com/recipeImages/639057-556x370.jpg'
        title='Yo! Sushi'
        rating={4.5}
        genre='Indian'
        address='123 main'
        short_description='This is des' 
        dishes={[]} 
        long={20} 
        lat={0}
        /> */}
        </ScrollView>
    </View>
  )
}

export default FeaturedRow
