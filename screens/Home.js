import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Home({navigation}) {
  const [ListTitle, setListTitle] = useState();
  const [List, setList] = useState([]);

  const fetch = async () => {
    try {
      const savedLists = await AsyncStorage.getItem('Lists');
      if(savedLists !== null){
        setList(JSON.parse(savedLists));
        
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch()
  }, [])
  
  const handleAddList = async () => {
    if (ListTitle) {
      Keyboard.dismiss()
      const Lists = [...List, ListTitle] 
      setList(Lists)
      setListTitle(null)
      await AsyncStorage.setItem('Lists', JSON.stringify(Lists))
      
  }
  }
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {List.map ((item, index) => {
          return <TouchableHighlight key={index} style={styles.list} onPress={() => navigation.navigate('List', {title : item})}
          onLongPress={ async () => {
            const index = List.indexOf(item)
            List.splice(index, 1)
            await AsyncStorage.setItem('Lists', JSON.stringify(List))
            await AsyncStorage.removeItem(item)
            const Completedlist = "Completed"+ item
            await AsyncStorage.removeItem(Completedlist)
            fetch()
          }}
          
          >
            <Text  style={styles.title}>{item}</Text>

            </TouchableHighlight>})}
            </View>
      <KeyboardAvoidingView style={styles.inputContainer}
            behavior={Platform.OS=== "android" ? "height": "padding"}>
              <TextInput placeholder='add new list' style={styles.input} onChangeText={text => setListTitle(text)}/>
              <TouchableOpacity style={styles.addbutton} onPress={() => handleAddList()}><Entypo name="add-to-list" size={24} color={"#1a1716"} /></TouchableOpacity>
            </KeyboardAvoidingView>
    </View>
  )
}


const styles = StyleSheet.create ({
  container: {
    display: 'flex',
    height: '100%' , width: '100%',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24, color: "#1a1716",
    fontWeight: 'bold'
  },
  inputContainer: {
    display: 'flex', flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    marginLeft: 30
  },
  input : {
    borderWidth: 1,
    borderColor: "#1a1716",
    width: '80%', borderRadius: 20, padding :10,
    backgroundColor: "#fff"
  },
  list : {
    backgroundColor: "#fff" ,
    width: '40%', height : 150,
    margin : '5%', borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#281C2D',
  },
  delete : {
    position: 'absolute',
    top: 10,
    right: 20
  },
  addbutton: {
    backgroundColor: 'black', padding: 10,
    borderRadius: 20,
    width: 50, height: 50,
    backgroundColor: "#fff",
    borderRadius: 100
  }
})