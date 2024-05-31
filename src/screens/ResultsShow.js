import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

export default function ResultsShow({ route }) {
    const [result, setResult] = useState(null);
    const { id } = route.params;

    const getResult = async (id) => 
    {
        try{
            const { data } = await yelp.get(`/${id}`);
            setResult(data);
        }
        catch(err)
        {
            console.log(err);
        }
        
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if(!result) 
    {
        return null;
    }
    
    return (
        <View>
            <Text style = {{margin: 10}}>{result.name}</Text>
            <FlatList 
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem = {({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300,
        margin: 10,
    }
});