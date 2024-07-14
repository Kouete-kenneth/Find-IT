import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';

const Notification = () => {
  const notifications = [
  { id: 1, title: 'New Item Found!', text: 'A new match has been found, click for more', forMoreText: 'click for more' },
  { id: 2, title: 'New Feature!', text: 'You can now share your items on social media. Tap to learn more.', forMoreText: 'Tap to learn more' },
  { id: 3, title: 'App Update Available', text: 'A new version of FindIt is available. Enjoy new features and improvements.', forMoreText: 'Click here' },
  { id: 4, title: 'Reminder', text: 'Remember to check the location of your keys. Last seen: Click here.', forMoreText: 'Click here' },
  { id: 5, title: 'Notification 5', text: 'This is the fifth notification text.', forMoreText: 'Click here' },
  ];
  return (
    <SafeAreaView className='flex-1 bg-white px-4'>
      <ScrollView className="flex-1 bg-white">
      <View className='shadow shadow-bgsecondary'>
        {notifications.map(notification => (
          <View key={notification.id} className="mb-6 p-4 border-b border-gray-300 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold">{notification.title}</Text>
              <TouchableOpacity>
                <FontAwesome name="trash" size={24} color="#7454f4" />
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-gray-700">{notification.text}</Text>
            <TouchableOpacity>
              <Text className="mt-2 text-primary">{notification.forMoreText}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Notification