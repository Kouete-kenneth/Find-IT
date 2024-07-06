import { View, Text,Image, ScrollView, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import Menu from '../components/menu';

const Home = () => {
  const [inputValueselect, setInputValueselect] = useState('');
  const [uploadSelectedImage, setuploadSelectedImage] = useState(null);
  const [searchSelectedImage, setSearchSelectedImage]=useState(null);
  const handleInputChange = (text) => {
    setInputValueselect(text);
  };

  const searchPickImage= async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0]);
    if (!result.canceled) {
      setSearchSelectedImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0]);
    if (!result.canceled) {
      setuploadSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0]);
    if (!result.canceled) {
      setuploadSelectedImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Navigation Bar */}
      <View className="flex-row bg-slate-600 justify-between items-center py-0 pl-1 pr-5 border-b border-gray-200" style={{ height: 60, width: '100%', backgroundColor: '#ffffff' }}>
            {/* Logo */}
            <TouchableOpacity className="flex items-center justify-center p-2 rounded-full">
                <Image
                    source={require('../assets/images/Logo_redesigned.png')}
                    className="rounded-full"
                    style={{resizeMode: 'contain',width:40,height:40 }}
                />
            </TouchableOpacity>

            {/* Menu Icons */}
            <View className="flex-row gap-x-4 items-center justify-center p-1 rounded-lg">
                <TouchableOpacity>
                  <Link href='/notification'><FontAwesome name='bell-o' size={20} /></Link>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Link href="/profile">
                      <FontAwesome name='envelope-o' size={20}/>
                  </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Link href="/help" >
                     <FontAwesome name="question-circle-o" size={20}/>
                  </Link>
                </TouchableOpacity>
            </View>
        </View>
        <View className="flex-row relative z-50 justify-center items-center bg-bgsecondary">
            <Menu/>
        </View>
        <ScrollView className="flex-col" contentContainerStyle={{alignItems:'center'}}>
        <View className="flex-row relative z-0 gap-2 mt-2 ml-0 mr-3 z-0 py-3 px-4 justify-evenly items-center" style={{width:'100%',height:130}}>
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
                {!uploadSelectedImage &&(
                  <View className="w-full gap-y-2 flex-col justify-center items-center border-bgsecondary border-2 mb-2 p-2 rounded-lg bg-slate-50 " style={{height:200}}>
                    <TouchableOpacity onPress={takePicture} className="flex-col justify-center items-center gap-y-1 bg-slate-100 p-2 w-full rounded-md">
                      <FontAwesome name="camera" size={20} />
                        <Text>Take picture</Text>
                    </TouchableOpacity>
                    <Text className='font-rRougeScript text-2xl text-primary'>Or</Text>
                    <TouchableOpacity onPress={pickImage} className="flex-col justify-center items-center gap-y-1 bg-slate-100 p-2 w-full rounded-md  mb-4">
                      <FontAwesome name="image" size={20}/>
                      <Text>Choose From Gallery</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {uploadSelectedImage &&(
                  <View className="w-full gap-y-2 flex-col justify-center items-center border-bgsecondary border-2 mb-2 p-2 rounded-lg bg-slate-50 " style={{height:200}}>
                    <Image 
                    source={{ uri: uploadSelectedImage,width:'100%',height:'100%' }}
                    className='object-cover rounded-lg' 
                    
                    />
                  </View>
                )}
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
              {!searchSelectedImage &&(
                <TouchableOpacity onPress={searchPickImage} className="w-full flex-col justify-center items-center bg-slate-100 border-bgsecondary border-2 mb-2 p-2 rounded-lg " style={{height:150}}>
                  <View className="flex-col justify-center items-center gap-y-1  mb-4">
                    <FontAwesome name="image" size={20} />
                    <Text className="text-sm font-mRoboto">Choose From Gallery</Text>
                  </View>
                </TouchableOpacity>
              )}
              {searchSelectedImage &&(
                <TouchableOpacity onPress={searchPickImage} className="w-full flex-col justify-center items-center bg-slate-100 border-bgsecondary border-2 mb-2 p-2 rounded-lg " style={{height:200}}>
                  <Image
                    source={{uri:searchSelectedImage,width:'100%',height:'100%'}}
                    className='rounded-lg object-cover'
                  />
                </TouchableOpacity>
              )}
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
                <View className="flex-row w-100 rounded-md justify-center items-center">
                  <TouchableOpacity className="flex-row gap-2 my-4 rounded-md bg-bgsecondary w-20 ml-0.5 p-0">
                        <Image
                          source={require('../assets/icons/Share.png')}
                        />
                        <Text className="font-mRoboto mb-2">Share</Text>
                  </TouchableOpacity>
                </View>
                <Text className="font-mRoboto text-lg mb-2">Max Result</Text>
                <View className="flex-row justify-evenly items-center gap-5 w-full p-2 px-0">
                  <TouchableOpacity className="flex-1 ml-0 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">1</Text></TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">3</Text></TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-bgsecondary p-2 rounded-md"><Text className="text-center text-lg font-bold">5</Text></TouchableOpacity>
                  <TouchableOpacity className="flex-1 p-2 bg-bgsecondary rounded-md"><Text className="text-center text-lg font-bold text-primary">All</Text></TouchableOpacity>
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