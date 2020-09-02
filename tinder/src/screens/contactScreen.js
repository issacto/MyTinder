import React from 'react';
import { Text, StyleSheet,ImageBackground , Image,Dimensions, ScrollView,TouchableOpacity, View } from 'react-native';
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
            
            matchedPeople: [],
            dataReady: false,
            email:this.props.name,
            uriReady : false,
            tempUrl: '',
            response: null,


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
        console.log("HEREHERE"+ this.state.email)

        /*const { name } = this.props.route.params;
        this.state.email = name;  
        console.log("bhuvgyccv"+this.state.email)*/
        {console.log(this.state.matchedPeople)}

        return (
            <View style={styles.screen}>
                
             <Text style={{fontSize:20, margin: 15, color: 'white'}}>Contact</Text>
             {this.state.dataReady? <ScrollView>  
        <ImageBackground style={internalStyles.chatbox} >
        {this.state.matchedPeople.map( (matchedPerson) => 
      {
        var uriReady = false;
        var url ='';
        //firebase.storage().ref("Usersimage/"+matchedPerson).getDownloadURL().then((uri)=> url=uri,uriReady=true,console.log("AAAAAA"+url)).catch((e)=>console.log(e.message));
        let imageRef= firebase.storage().ref("Usersimage/"+matchedPerson);
        //url = await imageRef.getDownloadURL();
        //uriReady = true;
        imageRef.getDownloadURL().then( (uri)=>{
            //from url you can fetched the uploaded image easily
            url =  uri,
            uriReady = true,
            console.log("WHYYYYY"+url)
          }).catch((e) => console.log('getting downloadURL of image error => ', e)); 
        return(
        <TouchableOpacity onPress={ ()=>
        this.props.navigation.navigate('Chat', {yourUsername: this.state.email, otherUsername: matchedPerson})}
        style={internalStyles.individualchatbox }>
        
        {uriReady==true ? <Image source ={{uri:url}} style={internalStyles.square}  />: <View style={internalStyles.circle } />}   
        <Text style= {internalStyles.centerText}>{matchedPerson}</Text>
        </TouchableOpacity> 
        )}) }
        </ImageBackground></ScrollView>: null}
             
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
        height: win.height/1.25,
        padding: 10
    },
    individualchatbox:{
        flexDirection:'row',
        backgroundColor: '#F7F7FF',
        borderRadius: 5,
        elevation: 10,
        height: 60,
        alignItems: "center",
        textAlign: 'center',
        margin: 10,
        width: win.width/1.2,

    },
    circle:{
    height:55,
    width: 55,
    borderRadius: 20,
    margin: 5,
    backgroundColor: 'black'

    },
    square:{
    height:55,
    width: 55,
    backgroundColor: 'yellow'

    },
    centerText:{
        textAlign: 'center',
        fontSize: 20,
        
    }

})

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(contactScreen);