import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
//styling
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
// components
import CustomListItem from '../components/CustomListItem'
// firebase
import { auth, db } from '../firebase'

const HomeScreen = (props) => {
  const { navigation } = props

  const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      return setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    // clean up
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Messenger",
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            </TouchableOpacity>
          </View>
        )
      },
      headerRight: () => {
        return (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
              <SimpleLineIcons name='pencil' size={24} color='black' />
            </TouchableOpacity>
          </View>
        )
      }
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {
          chats.map(chat => {
            const { id, data } = chat
            const { chatName } = data
            return (
              <CustomListItem key={id} id={id} chatName={chatName} />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
