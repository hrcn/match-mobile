import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// styling
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = (props) => {
  const { id, chatName, enterChat } = props

  return (
    <ListItem>
      <Avatar 
        rounded
        source={{uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'}}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: '800'}}>
          Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          This is a subtitle aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
