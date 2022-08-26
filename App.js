import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=251bf58e"
  const [state, setState] = useState({
    s: "Search movies.....",
    results: [],
    selected:{}
  });
  const search =()=>{
    axios(apiurl + "&s=" + state.s).then(({data})=>{
      let results =data.Search
      console.log(results)
      setState(prevState => {
        return {...prevState, results:results}
      })
    })
  }

  const openPopup = id =>{
    axios(apiurl + "&i=" + id).then(({data})=>{
      let result = data;

      console.log(result)

      setState(prevState => {
        return {...prevState, selected:result}
      })
    })
  }
  return (
    <View style={styles.container}>
      <View style={{ }}>
        <Text style={styles.title}>
          Shivam Movie App
          </Text>
          <TextInput style={styles.searchbox}
          onChangeText={text => setState(prevState => {
            return {...prevState, s:text}
          })}
          onSubmitEditing={search}
          value={state.s}/>
          <ScrollView style={styles.results}>
            {state.results.map(result => (
              <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.imdbID)}>
              <View style={styles.result}>
                <Image source={{uri: result.Poster}}
                style={{width:'100%', height:300}}
                resizeMode="cover"/>
                <Text style={styles.heading}>{result.Title}</Text>
              </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
          <Modal 
          animationType="fade"
          transperent={false}
          visible={(typeof state.selected.Title != "undefined" ? true: false)}
          >
            <Text>hello</Text>
            <View style={styles.popup}>
              <Text style={styles.poptitle}>{state.selected.Title}</Text>
              <Text style={{marginBottom: 20}}>Rating:{state.selected.imdbRating}</Text>
              <Text >{state.selected.Plot}</Text>
            
            </View>
            <TouchableHighlight>
              onPress={() => setState(prevState =>{
                return {...prevState, selected:{}}
              })}
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableHighlight>
            
          </Modal>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152238',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:70,
    paddingHorizontal: 20
  },
  title:{
    color:'cyan',
    fontSize: 30,
    fontWeight:'600',
    fontStyle:'italic',
    textAlign: 'center',
    marginBottom: 20
  },
  searchbox:{
    fontSize:18,
    fontWeight:'300',
    padding:10,
    width:320,
    backgroundColor:'#26619c',
    marginBottom:30,
    color:'white'
  },
  results:{
    flex: 1
  },
  result: {
    flex:1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#26619c'
  },
  some:{
    color:'blue'
  }
});

// Movie app
