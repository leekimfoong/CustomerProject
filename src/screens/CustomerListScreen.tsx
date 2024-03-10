import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, 
    Image } from "react-native";
import { useGetUsersQuery } from "../services/customer";

const CustomerListScreen = () => {
    const [text, setText] = useState('');
    const { data, error, isLoading } = useGetUsersQuery('');

    return (
        <>
            <View style={styles.view}>
                <Text style={styles.title}>Manage Customers</Text>
                <TouchableOpacity style={{flex: 1}} onPress={() => 
                    console.log('logout')} >
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewSearch}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search Customers" 
                    value={text}
                    onChangeText={newText => setText(newText)} 
                />
                <TouchableOpacity onPress={() => console.log('search')} >
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
            </View>
            { error ? 
                (console.log(error)) : isLoading ? 
                    (console.log('Loading...')) : data ? (
            <FlatList 
                data={data.data} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => {
                    return (
                        <View style={styles.viewList}>
                            <Image style={styles.img} 
                                source={{ uri: item.avatar }} />
                            <View style={styles.content}>
                                <Text style={styles.titleName}>
                                    {item.first_name}, {item.last_name}
                                </Text>
                                <Text>{item.email}</Text>
                            </View>
                        </View>
                    );
                }}
            />
            ) : null }
        </>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 2,
        textAlign: 'right'
    },
    logout: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ED703A',
        textAlign: 'center'
    },
    viewSearch: {
        backgroundColor: `#DDDDDD`,
        height: 40,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row'
    },
    input: {
        flex: 1
    },
    button: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        backgroundColor: `#E6696E`,
        borderRadius: 5,
        color: 'white',
        padding: 10

    },
    viewList: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black'
    },
    content: {
        padding: 20
    },
    titleName: {
        fontWeight: 'bold'
    }
});

export default CustomerListScreen;