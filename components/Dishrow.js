import React, { Component, useState } from 'react'
import { Text, View,TouchableOpacity , Image} from 'react-native'
// import Currency from "react-currency-formatter"
import { urlFor } from '../sanity'
import { CurrencyRupeeIcon, MinusCircleIcon, PlusCircleIcon} from "react-native-heroicons/outline";
import { useDispatch ,useSelector} from 'react-redux'
import { addToBasket,removeFromBasket,selectBasketItems, selectBasketItemsWithId } from '../features/BasketSlice';
const Dishrow = ({id,name,discription,price,image})=> {
  const items= useSelector((state)=>selectBasketItemsWithId(state,id) )
  const [isPressed, setIsPressed]=useState(false)
  const dispatch = useDispatch()

  const addItemToBasket = () =>{
    dispatch(addToBasket({id,name,discription,price,image}))
  }
  const removeItemFromBasket = ()=>{
    if(!items.length>0) return;
    dispatch(removeFromBasket({id}))
  }
    return (
      <>
      <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 
      ${ isPressed && "border-b-0"}`}>
        <View className='flex-row'>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{discription}</Text>
            <Text className='flex-row items-center pt-4'>
            {/* <Currency quantity={price} currency="GBP"/> */}
            &#8377; {price}
            {/* <CurrencyRupeeIcon color='black'/> */}
            </Text>
            </View> 
            <View>
              <Image
              source={{uri: urlFor(image).url()}}
              className='h-20 w-20 bg-gray-300 p-4 rounded-md'
              />
            </View>
             </View>
      </TouchableOpacity>
      {isPressed && (
        <View className='bg-white px-4'>
          <View className='items-center flex-row space-x-2 pb-3'>
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
               color={items.length>0? "#00CCBB" :'gray'} 
              // color='#00CCBB'
               size={40}/>
            </TouchableOpacity>
            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon
              color='#00CCBB'
               size={40}/>
            </TouchableOpacity>
          </View>
        </View>

    )}
      </>
    );
}

export default Dishrow
