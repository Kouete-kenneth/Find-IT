import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import backendBaseURL from '../utils/backendBaseURL';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Menu from '../components/menu';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const data=[
    {
      "faq_id": "1",
      "question": "How do I reset my password?",
      "answer": "To reset your password, click 'Forgot Password' on the login page, follow the prompts, and check your email for a reset link."
    },
    {
      "faq_id": "2",
      "question": "How do I change my email address?",
      "answer": "To change your email address, go to your account settings, click on 'Edit Profile', and update your email address."
    },
    {
      "faq_id": "3",
      "question": "How do I delete my account?",
      "answer": "To delete your account, please contact our support team through the 'Contact Us' page and request account deletion."
    },
    {
      "faq_id": "4",
      "question": "How do I contact customer support?",
      "answer": "You can contact our customer support by clicking on the 'Contact Us' link at the bottom of the page and filling out the form."
    },
    {
      "faq_id": "5",
      "question": "How do I update my profile picture?",
      "answer": "To update your profile picture, go to your account settings, click on 'Edit Profile', and upload a new profile picture."
    }
  ];
  // useEffect(() => {
  //   // Fetch FAQs from the backend
  //   backendBaseURL.get('/faqs')
  //     .then(response => {
  //       if (response) {
  //         setFaqs(response.data)
  //       }
         
  //     })
  //     .catch(error => console.error(error))
  // }, []);

  useEffect(() => {
    setFaqs(data);
  }, []);
  
  const toggleExpand = (faq_id) => {
    setExpanded(prevState => ({
      ...prevState,
      [faq_id]: !prevState[faq_id],
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
        <ScrollView className="flex-1  p-4">
        <View className='mt-2 mb-8'>
          <Text className='text-center font-extrabold text-lg'>
              HELP AND SUPPORT
          </Text>
        </View>
        <View className="flex-1 justify-center items-center mb-4">
          <Image
            source={ require('../assets/images/HELP_SUPPORT.webp') }
            style={{ width:150, height: 120,objectFit:'cover' }}
          />
        </View>
        {faqs.map((faq) => (
          <View key={faq.faq_id} className="mb-4">
            <TouchableOpacity
              className=" bg-bgsecondary p-4 rounded flex flex-row justify-between items-center"
              onPress={() => toggleExpand(faq.faq_id)}
            >
              <Text>{faq.question}</Text>
              {expanded[faq.faq_id] ? <FontAwesome name='chevron-up' size={20} color="gray" /> : <FontAwesome name="chevron-down" size={20} color="gray" />}
            </TouchableOpacity>
            {expanded[faq.faq_id] && (
              <View className="bg-gray-200 p-4">
                <Text>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={() => console.log('Contact Us pressed')} className="self-end p-4 mb-4">
          <Link href='/ContactUs'>
              <Text className='text-xs'>Didn't find Asnwers To your Questions?<Text className='underline text-primary'>Contact Us</Text></Text>
          </Link>
        </TouchableOpacity>
        
      </ScrollView>
      <View className="bg-purple-500 p-4 w-full">
          <Text className="text-white text-center">All rights reserved, Findit</Text>
        </View>
    </SafeAreaView>
  );
};


export default FAQs