import { View, Text,Image, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [inputValueselect, setInputValueselect] = useState('');

  const handleInputChange = (text) => {
    setInputValueselect(text);
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Navigation Bar */}
      <View className="flex-row justify-between items-center py-0 px-4 border-b border-gray-200" style={{ height: 60, width: '100%', backgroundColor: '#ffffff' }}>
            {/* Logo */}
            <View className="flex items-center justify-center h-13 w-12 p-1 rounded-full">
                <Image
                    source={require('../assets/images/logo.png')}
                    className="rounded-full"
                    style={{ width: '90%', height: '90%', resizeMode: 'cover' }}
                />
            </View>

            {/* Menu Icons */}
            <View className="flex-row gap-x-4 items-center p-1 rounded-lg">
                <View className="p-0 hover:bg-gray-200 transition-colors" style={{height:30}}>
                    <Link href="/home" style={{height:30}}>
                        <View className="relative justify-center items-center h-full w-full">
                          <Image
                            className="rounded-full"
                            source={require('../assets/icons/iconamoon_notification-light.png')}
                            style={{ width: 20, height: 20, resizeMode: 'cover' }} // Cover the container
                          />
                        </View>
                    </Link>
                </View>
                <View className="p-0 hover:bg-gray-200 transition-colors" style={{ height: 30 }}>
                <Link href="/login" className="flex justify-center items-center bg-bgsecondary h-30 rounded-full hover:bg-gray-200 transition-colors">
                  <View className="relative justify-center items-center h-full w-full">
                    <Image
                      className="rounded-full"
                      source={require('../assets/images/profile.jpg')}
                      style={{ width: 20, height: 20, resizeMode: 'cover' }} // Cover the container
                    />
                  </View>
                </Link>
              </View>
               
                <View className="p-0   hover:bg-gray-200 transition-colors" style={{height:30}}>
                    <Link href="/menu">
                      <View className="relative justify-center items-center h-full w-full">
                        <Image
                          className="rounded-full"
                          source={require('../assets/icons/ic_baseline-menu.png')}
                          style={{ width: 20, height: 20, resizeMode: 'cover' }} // Cover the container
                        />
                    </View>
                    </Link>
                </View>
            </View>
        </View>
        <ScrollView className="flex-col" contentContainerStyle={{alignItems:'center'}}>
        <View className="flex-row gap-2 mt-2 ml-0 mr-3  py-3 px-4 justify-evenly items-center" style={{width:'100%',height:130}}>
                {/* Home Tab */}
                <Pressable className=" flex-1 items-center border-2 rounded-md border-gray-300" style={{height:'100%'}}>
                    <Text className="text-blue-500 text-4xl p-2">😊</Text>
                    <Text className="text-sm">Upload Found Object</Text>
                </Pressable>

                {/* Report Tab */}
                <Pressable className="items-center flex-1 border-2 rounded-md border-gray-300" style={{height:'100%'}}>
                    <Text className="text-blue-500 text-4xl p-2">🔍</Text>
                    <Text className="text-sm">Search Missing Object</Text>
                </Pressable>
            </View>
            <View className="w-full px-6 py-1">
                <Text className="mb-4 font-mRoboto text-2xl">Upload Found Object</Text>
                <View className="w-full gap-y-2 flex-col justify-center items-center border-bgsecondary border-2 mb-2 p-2 rounded-lg " style={{height:200}}>
                    <View className="flex-col justify-center items-center gap-y-1">
                       <Image
                        source={require('../assets/icons/camera.png')}
                        style={{width:40,height:40}}
                       />
                       <Text>Take picture</Text>
                    </View>
                    <Text>Or</Text>
                    <View className="flex-col justify-center items-center gap-y-1  mb-4">
                       <Image
                        source={require('../assets/icons/carbon_choose-item.png')}
                        style={{width:40,height:40}}
                       />
                       <Text>Choose From Gallery</Text>
                    </View>
                </View>
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="At what time did you pick the object?..."
                  onChangeText={handleInputChange}
                  value={inputValueselect}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="where did you pick the object?..."
                  onChangeText={handleInputChange}
                  value={inputValueselect}
                />
                <TextInput
                className="w-full rounded-lg border-2 p-2 border-bgsecondary"
                style={{  }}
                placeholder="describe the object..."
                onChangeText={handleInputChange}
                value={inputValueselect}
              />
              <View className="w-full p-3 flex-row justify-evenly items-center mt-3">
                 <TouchableOpacity className="flex-1 mr-2  p-3 rounded-lg border-2 border-bgsecondary"><Text className="font-mRoboto text-center text-lg">Cancel</Text></TouchableOpacity>
                 <TouchableOpacity className=" bg-primary ml-2 rounded-lg flex-1 p-3"><Text className="font-mRoboto text-[#ffffff] text-center text-lg">Upload</Text></TouchableOpacity>
              </View>
            </View>
            <View className="w-full px-6 py-1">
              <Text className="font-mRoboto text-2xl">Upload Missing Object</Text>
              <Text className="text-slate-300 mb-4">we use AI to help you Find similar Objects</Text>
              <View className="w-full flex-col justify-center items-center border-bgsecondary border-2 mb-2 p-2 rounded-lg " style={{height:150}}>
                    <View className="flex-col justify-center items-center gap-y-1  mb-4">
                       <Image
                        source={require('../assets/icons/carbon_choose-item.png')}
                        style={{width:40,height:40}}
                       />
                       <Text className="text-primary text-lg font-mRoboto">Choose From Gallery</Text>
                    </View>
                </View>
    
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="At what time did your object get missing?..."
                  onChangeText={handleInputChange}
                  value={inputValueselect}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="where did your get the missing?..."
                  onChangeText={handleInputChange}
                  value={inputValueselect}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 border-bgsecondary"
                  style={{  }}
                  placeholder="describe the object..."
                  onChangeText={handleInputChange}
                  value={inputValueselect}
                />
                <View className="flex-row gap-2 my-4 rounded-md bg-bgsecondary w-20 ml-0.5 p-0">
                      <Image
                        source={require('../assets/icons/Share.png')}
                      />
                      <Text className="font-mRoboto mb-2">Share</Text>
                    </View>
                <Text className="font-mRoboto text-lg mb-2">Max Result</Text>
                <View className="flex-row justify-evenly items-center gap-5 w-full p-2 px-0">
                  <View className="flex-1 ml-0 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">1</Text></View>
                  <View className="flex-1 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">3</Text></View>
                  <View className="flex-1 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">5</Text></View>
                  <View className="flex-1 p-2 bg-bgsecondary rounded-md"><Text className="text-center text-lg font-bold text-primary">All</Text></View>
                </View>
                <View className="w-full p-3 flex-row justify-evenly items-center mt-3">
                 <TouchableOpacity className="flex-1 mr-2  p-3 rounded-lg border-2 border-bgsecondary"><Text className="font-mRoboto text-center text-lg">Cancel</Text></TouchableOpacity>
                 <TouchableOpacity className=" bg-primary ml-2 rounded-lg flex-1 p-3"><Text className="font-mRoboto text-[#ffffff] text-center text-lg">Search</Text></TouchableOpacity>
                </View>
              <Text className="font-mRoboto text-lg mb-2">Results</Text>
              <View className="flex-col gap-y-2">
                <ScrollView className="w-full flex-col gap-y-2">
                  <View className="flex-col gap-y-2">
                    <Image
                    className="w-full rounded-lg"
                      source={require('../assets/images/id-book.jpg')}
                      style={{height:200}}
                    />
                    <Text>It looks Like An Id cart</Text>
                    <View className="flex-row gap-x-2">
                      <Image
                        style={{width:20, height:20}}
                        source={require('../assets/icons/Primary_checkbox-fill.png')}
                      />
                      <Text className="text-primary font-mRoboto">It is for me</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View className="w-full flex-col justify-center items-center border-bgsecondary mt-0  mb-2 p-2 rounded-lg " style={{height:200}}>
                <View className="flex-col justify-center items-center gap-y-1 w-full h-full  mb-4">
                  <Image
                    className="w-ful h-fulll"
                    source={require('../assets/images/map.jpg')}
                    style={{height:150}}
                  />
                </View>
                
            </View>
            <TouchableOpacity className="mt-1 mb-2 rounded-lg p-3 bg-bgsecondary"><Text className="text-primary">Track Location</Text></TouchableOpacity>
             {/* Footer */}
             <View className="py-4 bg-primary w-full items-center">
            <Text className="text-white text-center text-base font-Roboto-Regular">
                © 2024 Find-IT. All rights reserved.
            </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home