import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
// styling
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
// firebase
import { auth } from '../firebase'

const RegisterScreen = (props) => {
  const { navigation } = props
  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login'
    })
  }, [navigation])

  const register = () => {
    // return a Promise
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
        })
      }).catch(error => alert(error.message))
  }
  
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create an Account
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder='Full Name' 
          autoFocus 
          type='text' 
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input 
          placeholder='Email'
          type='Email' 
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input 
          placeholder='Password'
          type='password' 
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Input 
          placeholder='Profile picture url (optional)'
          type='text' 
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          // press enter when in this field
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title='Register'
        onPress={register}
        raised
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    width: 200,
    marginTop: 10
  },
  inputContainer: {
    width: 300
  }
})
