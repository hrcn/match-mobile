import React, { useLayoutEffect, useState } from 'react'
import { 
  StyleSheet, Text, View, SafeAreaView, 
  TouchableOpacity, KeyboardAvoidingView, Platform,
  ScrollView, TextInput, Keyboard, TouchableWithoutFeedback
} from 'react-native'
// styling
import { Avatar } from 'react-native-elements'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
// firebase
import * as firebase from 'firebase'
import { db, auth } from '../firebase'

const ChatScreen = (props) => {
  const { navigation, route } = props
  // states
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    // force the keyboard to hide
    Keyboard.dismiss()
    
    db.collection('chats').doc(route.params.id).collection('message').add({
      // using the server timestamp to get it unified
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })
    // clear input after sending
    setInput('')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={styles.headerView}>
          <Avatar 
            rounded 
            source={{ uri: messages[0]?.data.photoURL }}
          />
          <Text style={styles.headerText}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => {
        <TouchableOpacity style={styles.headerLeft} onPress={navigation.goBack}>
          <AntDesign name='arrowleft' size={24} color='white' />
        </TouchableOpacity>
      },
      headerRight: () => (
        <View>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('message')
      .orderBy('timestamp', 'desc') // order timestamp descending
      .onSnapshot(snapshot => setMessages(
        // return an object for every single doc
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ))
    return unsubscribe
  }, [route])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style='light' />
      {/* using KeyboardAvoidingView to move text input with the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={90}
      >
        {/* touch anywhere in the chat screen, dismiss keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* have a text input area next to scroll view using React.Fragment */}
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {/* Chat goes here */}
              {messages.map(message => {
                const { id, data } = message
                // check if it is you or not
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar 
                      rounded
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                      // web
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5
                      }}
                    />
                    <Text style={styles.receiverText}>
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                      // web
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5
                      }}
                    />
                    <Text style={styles.senderText}>
                      {data.message}
                    </Text>
                    <Text style={styles.senderName}>
                      {data.displayName}
                    </Text>
                  </View>
                )
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder='enter your message'
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}
              >
                <Ionicons name='send' size={24} color='#2B68E6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 700
  },
  headerLeft: {
    marginLeft: 10
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    // stick it to the bottom
    bottom: 0,
    height: 40,
    // take up enough space
    flex: 1,
    // leave some space with send icon
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    // rounded border
    borderRadius: 30
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative'
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white'
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15
  },
  receiverText: {

  }
})
