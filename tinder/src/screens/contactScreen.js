import React from 'react';
import { Text, StyleSheet,ImageBackground ,Dimensions, ScrollView,TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import { styles } from '../styles';



class contactScreen extends React.Component {
    constructor(props) {
        super(props);
        
        
        };
        UNSAFE_componentWillMount(){
            this.getPeople();
        }

        state = {
            email: "tototototoman@gmail",
            matchedPeople: [],
            dataReady: false,
         };

        getPeople ()  {
        var rootRef = firebase.database().ref('users/'+this.state.email+'/peopleMatched');
        
        rootRef.once('value', (snapshot) => {
            if (snapshot.exists()){
                console.log("here")
            var something = snapshot.val();
            console.log(something);
            var somethingiven = Object.values(something)
            somethingiven.map((abc)=>{
                var somethinginside = Object.values(abc)[0]
                var joined = this.state.matchedPeople.concat(somethinginside)
                this.state.matchedPeople = joined;
                console.log("dsfgfgs"+this.state.matchedPeople)
                
            });
            /*
            something.map((matchedPerson) => (
                this.state.matchedPeople.push(Object.keys(something)))); */
            this.setState({dataReady: true})
            
            
            }
        })

        ;
        
    }
    
    
    render() {
        {console.log(this.state.matchedPeople)}
        const boxes = this.state.matchedPeople.map((matchedPerson) => 
        {
            return(
            <TouchableOpacity onPress={ ()=>
            this.props.navigation.navigate('Chat')}
            style={internalStyles.individualchatbox }>
            <Text style= {styles.centerText}>{matchedPerson}</Text>
            </TouchableOpacity> 
            )}) 
        
        const normalsettings =  <ScrollView><ImageBackground style={internalStyles.chatbox} >{boxes}</ImageBackground></ScrollView>

        return (
            <View style={styles.screen}>
                
             <Text style={{fontSize:20, margin: 15, color: 'white'}}>Contact</Text>
             {this.state.dataReady ?  normalsettings: null}
             
            </View>
        )
    }
}
const win = Dimensions.get('window');
const internalStyles= StyleSheet.create({
    chatbox:{
        alignItems: 'center',
        borderRadius:10,
        backgroundColor: 'red',
        width: win.width/1.05,
        height: win.height/1.25
    },
    individualchatbox:{
        backgroundColor: '#F7F7FF',
        borderRadius: 5,
        elevation: 10,
        height: 40,
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10,
        width: win.width/1.2,

    },

})

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(contactScreen);