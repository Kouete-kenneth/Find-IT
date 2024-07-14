import { View, Text,Image, ScrollView, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'
import { uploadFile } from '../../lib/appWrite';
import { createNewItem } from '../../lib/items';
import backendBaseURL from '../../utils/backendBaseURL';
import handleApiError from '../../utils/handleApiError';
import Navbar from '../../components/navbar.jsx';
const Home = () => {
  const refScrollView = useRef(null);

  // const [inputValueselect, setInputValueselect] = useState('');
  const [missingLocation, setMissingLocation] = useState('');
  const [missingDescription, setMissingDescription] = useState('');
  const [missingTime, setMissingTime] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [foundDescription, setFoundDescription] = useState('');
  const [foundTime, setFoundTime] = useState('');
  const [uploadSelectedImage, setuploadSelectedImage] = useState(null);
  const [searchSelectedImage, setSearchSelectedImage]=useState(null);
  const [match, setMatch]=useState(false)
  const [imageUrl,setImageUrl]=useState('');
  const [matchImageURLs,setMatchImageURL]=useState([]);
  const [foundUploadResponse, setFoundUploadResponse]=useState(null)

  // const [targetimage, setTargetImage] = useState('');
  // const [matchArray, setMatchArray] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemDesc,setItemsDesc]=useState('');
  
  const searchPickImage= async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSearchSelectedImage(result.assets[0]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setuploadSelectedImage(result.assets[0]);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setuploadSelectedImage(result.assets[0]);
    }
  };
  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on this platform');
      return;
    }

    await Sharing.shareAsync(searchSelectedImage.uri);
  };

  const handleUploadFound=async(event)=>{
    event.preventDefault();
    try {
      // const imageurl=await uploadFile(uploadSelectedImage,'image');
      setImageUrl('https://cloud.appwrite.io/v1/storage/buckets/668a965e003a0df0cf74/files/6692afbe001774c8251f/view?project=665df1ef0031b59f137e&mode=admin')
      const response= await createNewItem({
      imageURL: imageUrl,
      description: foundDescription,
      location: foundLocation,
      type: "found",
     });
     if (response && imageUrl) {
      setFoundUploadResponse(response)
      setFoundDescription('')
      setFoundLocation('');
      setFoundTime('')
      setuploadSelectedImage(null);
      alert('image upload succesful');
     }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await backendBaseURL.get('/items');
        const descriptionArray = response.data.map(item => item.description); // Extracting description strings
        setItemsDesc(descriptionArray); // Setting state to array of descriptions
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getItems();
  }, [searchSelectedImage]);

      const handleSearchMissingItem = async () => {
        try {
          const matchResponse = await backendBaseURL.post('/match', {
            targetimage: missingDescription, 
            matchArray: itemDesc
          });
          
           // Process the response to filter matches with rating >= 0.6 and sort them
        const filteredMatches = matchResponse.data.ratings.filter(item => item.rating >= 0.5);
        const sortedMatches = filteredMatches.sort((a, b) => b.rating - a.rating);


          // console.log('SORTED MATCHES:  ',sortedMatches[0].target);
        // Extract targets from sorted matches
        const targets = sortedMatches.map(match => match.target);
        // Fetch image URLs for each target
        // Initialize an array to hold the image URL fetch 
        const imageurls = [];
        // Fetch image URLs for each target using map
        await Promise.all(targets.map(async (description) => {
          try {
            const response = await backendBaseURL.get(`/items/description?description=${encodeURIComponent(description)}`);
              imageurls.push(response.data.imageURL);
          } catch (error) {
            console.error('Error fetching image URL for target:', description, error);
            handleApiError(error,setError)
            imageurls.push(null);
          }
        }));
        setMatchImageURL(imageurls)
        // console.log('URL:',imageurls,' TARGETS:',targets,'SROTED MATCH:', response.data)

        // Prepare the final sorted array with image URLs
        const processedResults = {
          ratings: sortedMatches.map((match, index) => ({
            target: match.target,
            rating: match.rating,
            imageUrl: imageurls[index]
          })),
          bestMatch: matchResponse.data.bestMatch,
          bestMatchIndex: matchResponse.data.bestMatchIndex
        };
        
        // Set the results state to display in your component
        setResults(processedResults);
        setMatch(true);
          // Set the results state to display in your component
          console.log(processedResults.ratings); 
        } catch (error) {
          console.error(error.message);
        }
      };

      

    

  return (
    <SafeAreaView className="flex-1 bg-white">
          <Navbar/>
        <ScrollView className="flex-col" contentContainerStyle={{alignItems:'center'}} ref={refScrollView}>
            <View className="flex-row relative z-0 gap-2 mt-2 ml-0 mr-3 z-0 py-3 px-4 justify-evenly items-center" style={{width:'100%',height:130}} >
                {/* Home Tab */}
                <Pressable className=" flex-1 items-center border-2 rounded-md border-gray-300" style={{height:'100%'}} onPress={()=>refScrollView.current.scrollTo({ x: 0, y: 130 })} title="Go to Found Item section">
                    <Text className="text-blue-500 text-4xl p-2">😊</Text>
                    <Text className="text-sm">Upload Found Object</Text>
                </Pressable>

                {/* Report Tab */}
                <Pressable className="items-center flex-1 border-2 rounded-md border-gray-300" style={{height:'100%'}} onPress={()=>refScrollView.current.scrollTo({ x: 0, y: 650 })}>
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
                    source={{ uri: uploadSelectedImage.uri,width:'100%',height:'100%' }}
                    className='object-cover rounded-lg'  
                    />
                  </View>
                )}
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="At what time did you pick the object?..."
                  onChangeText={(text)=>{setFoundTime(text)}}
                  value={foundTime}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="where did you pick the object?..."
                  onChangeText={(text)=>{setFoundLocation(text)}}
                  value={foundLocation}
                />
                <TextInput
                className="w-full rounded-lg border-2 p-2 border-bgsecondary"
                style={{  }}
                placeholder="describe the object..."
                onChangeText={(text)=>{setFoundDescription(text)}}
                value={foundDescription}
              />
              <View className="w-full p-3 flex-row justify-evenly items-center mt-3">
                 <TouchableOpacity className="flex-1 mr-2  p-3 rounded-lg border-2 border-bgsecondary"><Text className="font-mRoboto text-center text-lg">Cancel</Text></TouchableOpacity>
                 <TouchableOpacity className=" bg-primary ml-2 rounded-lg flex-1 p-3"><Text className="font-mRoboto text-[#ffffff] text-center text-lg" onPress={handleUploadFound}>Upload</Text></TouchableOpacity>
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
                    source={{uri:searchSelectedImage.uri,width:'100%',height:'100%'}}
                    className='rounded-lg object-cover'
                  />
                </TouchableOpacity>
              )}
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="At what time did your object get missing?..."
                  onChangeText={(text)=>{setMissingTime(text)}}
                  value={missingTime}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 mb-2 border-bgsecondary"
                  style={{  }}
                  placeholder="where did your get the missing?..."
                  onChangeText={(text)=>{setMissingLocation(text)}}
                  value={missingLocation}
                />
                <TextInput
                  className="w-full rounded-lg border-2 p-2 border-bgsecondary"
                  style={{  }}
                  placeholder="describe the object..."
                  onChangeText={(text)=>{setMissingDescription(text)}}
                  value={missingDescription}
                />
                <View className="flex-row w-100 rounded-md justify-center items-center">
                  {searchSelectedImage && (
                    <TouchableOpacity className="flex-row gap-2 my-4 rounded-md bg-bgsecondary w-20 ml-0.5 p-0" onPress={shareImage}>
                      <Image
                        source={require('../../assets/icons/Share.png')}
                      />
                      <Text className="font-mRoboto mb-2">Share</Text>
                    </TouchableOpacity>
                  )

                  }
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
                 <TouchableOpacity className=" bg-primary ml-2 rounded-lg flex-1 p-3"><Text className="font-mRoboto text-[#ffffff] text-center text-lg" onPress={handleSearchMissingItem}>Search</Text></TouchableOpacity>
                </View>             
                  {match && (
                    <View className="container mx-au">
                    <Text className="text-2xl font-bold mb-4 mt-3">Search Results</Text>
                    <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.ratings.map((result, index) => (
                        <View key={index} className="shadow-sm shadow-zinc-800 rounded-xlg p-4 bg-bgsecondary">
                          <Image
                            source={{uri:result.imageUrl || 'https://via.placeholder.com/300x200?text=Image+Not+Found'}}
                            alt={result.target}
                            resizeMode="contain"
                            style={{borderRadius:20}}
                            className="w-full h-60 object-cover rounded-lg mb-4"
                          />
                          <View className="p-4 bg-slate-200 rounded-md">
                            <Text className="text-xl font-semibold">{result.target}</Text>
                            <Text className="text-gray-600">Rating: {result.rating.toFixed(2)}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <View className="mt-8 p-4 bg-green-100 rounded-lg">
                      <Text className="text-xl font-bold">Best Match</Text>
                      <Text className="text-gray-800">Target: {results.bestMatch.target}</Text>
                      <Text className="text-gray-800">Rating: {results.bestMatch.rating.toFixed(2)}</Text>
                    </View>
                  </View>
                    
                  )}
                  {!match && (
                      <View className="flex-col gap-y-2 bg-bgsecondary p-6 items-center">
                      <Image
                      className="w-full rounded-lg"
                      source={require('../../assets/images/no found.jpg')}
                        style={{height:100, width:100}}
                      />
                      <Text className='opacity-40 font-bold'>We will notify you in case of any Match</Text>
                     
                    </View>
                  )}
              
            </View>
            <View className="w-full flex-col justify-center items-center border-bgsecondary mt-0  mb-2 p-2 rounded-lg " style={{height:200}}>
                <View className="flex-col justify-center items-center gap-y-1 w-full h-full  mb-4">
                  <Image
                    className="w-ful h-fulll"
                    source={require('../../assets/images/map.jpg')}
                    style={{height:150}}
                  />
                </View>
                
            </View>
            <TouchableOpacity className="mt-1 mb-2 rounded-lg p-3 bg-bgsecondary"><Text className="text-primary">Track Location</Text></TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home