import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/navbar'

const Settings = () => {
  return (
    <SafeAreaView>
      <Navbar/>
      <View>
      <Text>Settings</Text>
      </View>
    </SafeAreaView>
  )
}

export default Settings