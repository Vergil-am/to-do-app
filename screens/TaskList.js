import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';




export default function TaskList(props) {
    const [task, settask] = useState()
    const [TaskItems, setTaskItems] = useState([])
    const [Completed, setCompleted] = useState([])
    
    const route = useRoute()

    const TaskListTitle = route.params.title
    const CompletedList = "Completed"+ route.params.title

    const fetch = async () => {
        try {
            const dataTasks = await AsyncStorage.getItem(TaskListTitle)
            const dataCompleted = await AsyncStorage.getItem(CompletedList)
            if (dataTasks !== null && dataCompleted !== null){
                setTaskItems(JSON.parse(dataTasks))
                setCompleted(JSON.parse(dataCompleted))
            } else if (dataTasks !== null && dataCompleted == null) {
                setTaskItems(JSON.parse(dataTasks))

            } else if (dataTasks == null && dataCompleted !== null) {
                setCompleted(JSON.parse(dataCompleted))
            }
            
        } catch (err) {
            console.log(err)
            
        }
    }
    useEffect (() => {
        fetch();
    }, [])
    const handleAddTask = async () => {
        if (task) {
            Keyboard.dismiss()
            const Tasks = [...TaskItems, task]
            setTaskItems(Tasks)
            settask(null)
            const SavedTasks = JSON.stringify(Tasks)
            await AsyncStorage.setItem(TaskListTitle, SavedTasks)
            
        }
      }
    
    
    return (
        <View style={styles.container}>
            {TaskItems.map((item, index) => {
                return <TouchableOpacity item={item} key={index} style={styles.taskContainer} onPress={ async () => {
                    setCompleted([...Completed, item])
                    const index = TaskItems.indexOf(item)
                    TaskItems.splice(index, 1)
                    await AsyncStorage.setItem(CompletedList, JSON.stringify([...Completed, item]))
                    await AsyncStorage.setItem(TaskListTitle, JSON.stringify(TaskItems))


                }} ><Text style={styles.taskText}>{item}</Text></TouchableOpacity 
                >
            })}
            {Completed.map((item, index) => {
                return <TouchableOpacity item={item} key={index} style={styles.completedContainer}
                onPress={ async () => {
                        const index = Completed.indexOf(item)
                        Completed.splice(index, 1);
                        setTaskItems([...TaskItems, item])
                        await AsyncStorage.setItem(CompletedList, JSON.stringify(Completed))
                        await AsyncStorage.setItem(TaskListTitle, JSON.stringify([...TaskItems, item]))
                        
                    }}
                >
                    <Text style={styles.completedText}>{item}</Text></TouchableOpacity>

            })}
            <KeyboardAvoidingView style={styles.inputContainer}
            behavior={Platform.OS=== "android" ? "height": "padding"}>
                <TextInput placeholder='add new task' style={styles.input} value={task} onChangeText={text => settask(text)} />
                <TouchableOpacity style={styles.button} onPress={() => handleAddTask()}><Text style={{color: "#1a1716",
                fontSize: 36, fontWeight: 'bold', marginBottom: 10}}>+</Text></TouchableOpacity>
                </KeyboardAvoidingView>
        </View>
    )
};

const styles = StyleSheet.create({
    completedText: {
        opacity: 0.5, textDecorationLine: 'line-through',
        fontSize: 24,
    },
    taskText: {
        fontSize: 24
    },
    taskContainer :{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#0A758F',
        borderRadius: 15,
        elevation: 3
    },
    completedContainer :{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#FF5C5C',
        borderRadius: 50,
        elevation: 3
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
      button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50, height: 50,
        backgroundColor: "#fff",
        borderRadius: 100
      },
    container: {
        width: '100%',
        height: '100%',
    },
    title :{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 100,
        marginLeft: 50
    }
})