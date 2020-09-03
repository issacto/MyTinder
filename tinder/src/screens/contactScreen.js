import React from 'react';
import { Text, StyleSheet,ImageBackground , Image,Dimensions, ScrollView,TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import { styles } from '../styles';



class contactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.getPeople();
       
        
        };
        state = {
            
            matchedPeople: [ ],
            dataReady: false,
            email:this.props.name,
            uriReady : false,
            tempUrl: '',
            response: null,
            data: [],


         };
        

        getPeople ()  {
        var rootRef = firebase.database().ref('users/'+this.state.email+'/peopleMatched');
        rootRef.once('value',  (snapshot) => {
            if (snapshot.exists()){
                console.log("here");
                var something =  snapshot.val();
                console.log(something);
                var somethingiven = Object.values(something);
                console.log(somethingiven);
                somethingiven.map( async (abc)=>{
                    let somethinginside =  Object.values(abc)[0];
                    console.log("HIHIHIHIHIHIHI"+somethinginside);
                    //this.state.matchedPeople.push(somethinginside);
                    var joined = [].concat(this.state.matchedPeople, somethinginside);
                    await this.setState({matchedPeople:joined});
                    console.log("dsfgfgs"+this.state.matchedPeople);
                
            });
        };  this.getdata();}
        
            );
            
        ;
        
    }
        async getdata(){
            
           //await this.getPeople();
           console.log("just anything");
            //var list = this.state.matchedPeople
           console.log("HEYHEYEYHEYHEYHEYH"+this.state.matchedPeople);
           
            await Promise.all(this.state.matchedPeople.map(async (person) =>{
                console.log("HALO"+person)
                let photoUri = await this.geturi(person);
                console.log("photourl fakejb bfaeobfaejo: "+ photoUri)
                var joined = this.state.data.concat([[person, photoUri]]);
                this.state.data = joined;
                console.log(this.state.data);

            })).then(()=>{
            this.setState({dataReady :true});
            console.log("WHATWHATEWHAT"+this.state.data);})
        }
        
    async geturi(person) {
        var isDone = false;
        console.log("YO"+person);
        try{
          let url = await firebase.storage().ref("Usersimage/"+person).getDownloadURL();
          isDone = true;
          console.log("HERE we GO 1: "+ url);
          return url;
              
        }catch(e) {console.log('getting downloadURL of image error => ', e.message);
            if(isDone!==true){
            let newImageRef = await firebase.storage().ref("Usersimage/"+'background.jpg').getDownloadURL();
            console.log("HERE we GO 2: "+ newImageRef);
            return newImageRef
                ;}
      }  }   

    
    
    
    render() {
        console.log("HEREHERE"+ this.state.email)

        /*const { name } = this.props.route.params;
        this.state.email = name;  
        console.log("bhuvgyccv"+this.state.email)*/
        {console.log(this.state.data)}

        return (
            <View style={styles.screen}>
                
             <Text style={{fontSize:20, margin: 15, color: 'white'}}>Contact</Text>
              <ScrollView>  
            <ImageBackground style={internalStyles.chatbox} >
                {console.log("HI THERE"+this.state.data)}
            {this.state.dataReady? this.state.data.map( matchedPerson => 
            
            <TouchableOpacity onPress={ ()=>
            this.props.navigation.navigate('Chat', {yourUsername: this.state.email, otherUsername: matchedPerson})}
            style={internalStyles.individualchatbox }>
            <Image source ={{uri:matchedPerson[1]}} style={internalStyles.circle}  />
            <Text style= {internalStyles.centerText}>{matchedPerson[0]}</Text>
            </TouchableOpacity> 
            ) : <View style={internalStyles.square}/>}
            </ImageBackground></ScrollView>
             
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