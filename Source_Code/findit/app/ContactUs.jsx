import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Menu from '../components/menu'
import backendBaseURL from '../utils/backendBaseURL'

const ContactUs = () => {
    const [subject, setsubject] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
      if (!email || !subject || !message) {
          alert("Error", "All fields are required.");
          return;
      }

      try {
          const response = await backendBaseURL.post('/emails', {
              from: email,
              subject: subject,
              message: message
          });

          if (response.status === 200 ||response.status === 201) {
              alert("Success", "Email sent successfully!");
              setEmail('');
              setsubject('');
              setMessage('');
          } else {
              Alert.alert("Error", "Failed to send email.");
          }
      } catch (error) {
        console.log(error)
          alert("Error", "An error occurred while sending the email.");
      }
  };
  return (
      <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row bg-slate-600 justify-between items-center py-0 pl-1 pr-5 border-b border-gray-200" style={{ height: 60, width: '100%', backgroundColor: '#ffffff' }}>
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
        <ScrollView className="flex-1 w-full">
        <View className="flex-1 justify-center items-center mb-4 mt-2">
          <Image
            source={ require('../assets/images/contactus.jpg') }
            style={{ width:'100%', height: 200,objectFit:'cover' }}
          />
        </View>
        <View className='w-full p-4 flex-col items-center justify-center'>
          <View className='w-full pr-6 mt-4 bg-bgsecondary p-6 rounded-md'>
            <View className=' space-x-2 mb-4 flex-row'>
               <FontAwesome name='phone' size={20} color='#7454F4'/>
               <Text className=''>+237 654130795</Text>
            </View>
            <View className=' space-x-2 mb-4 flex-row'>
               <FontAwesome name='envelope' size={20} color='#7454F4'/>
               <Text className=''>example.gmail.com</Text>
            </View>
            <View className=' space-x-2 mb-4 flex-row'>
               <FontAwesome name='facebook-square' size={20} color='#7454F4'/>
               <Text className=''>http://facebook.com</Text>
            </View>
          </View>
          <View className='w-full p-4 flex-col items-center justify-center'>
          <View className="w-full mb-4">
                <View className="w-full mb-4">
                    <View className="flex-row border-b-2 border-gray-300 py-2">
                        <TextInput className="flex-1"  placeholder="Enter your Email" value={email} onChangeText={(text) => setEmail(text)}/>
                        <FontAwesome name="envelope" size={20} color="gray" />
                    </View>
                </View>
                <View className="w-full mb-4">
                    <View className="flex-row border-b-2 border-gray-300 py-2">
                        <TextInput className="flex-1"  placeholder="Enter the subject" value={subject} onChangeText={(text) => setsubject(text)}/>
                        <FontAwesome name="user" size={20} color="gray" />
                    </View>
                </View>
                <View className="w-full mb-4">
                    <View className="flex-row items-center border-b-2 border-gray-300 py-2">
                        <TextInput className="flex-1" placeholder="type the meassage here" value={message} onChangeText={(text) => setMessage(text)}/>
                        <FontAwesome name="envelope" size={20} color="gray" />
                    </View>
                </View>
            </View>
            <TouchableOpacity className="w-full bg-primary py-1 rounded-md font-mRoboto mb-4" onPress={handleSubmit}>
              <Text className="text-center text-white text-lg ">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        
      </ScrollView>
      <View className="bg-purple-500 p-4 w-full">
          <Text className="text-white text-center">All rights reserved, Findit</Text>
        </View>
    </SafeAreaView>
  )
}

export default ContactUs