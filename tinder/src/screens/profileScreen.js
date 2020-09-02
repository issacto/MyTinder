import React from 'react';
import { Text,Button,TextInput,Alert, TouchableOpacity, Image, View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import ImagePicker from 'react-native-image-picker';


import { styles } from '../styles';

var nameForPress ='';
class profileScreen extends React.Component {
    constructor(props) {
        //constructor to set default state
        super(props);
        //set last inputed information
        this.setupPreviousInformation();
        nameForPress = this.props.name;
        };
         state = {
          isImageReady: false,
          profileImageUrl: null,
          username: this.props.name,
          year: "",
          age:"",
          major:"",
          filepath: {
            data: '',
            uri: ''
          },
          fileData: '',
          fileUri: ''
        
        };
        
    updateState(location){
      this.setState({isImageReady: true});
      this.setState({profileImageUrl: location});
    }

    setInformation (){
      console.log(nameForPress);
      var name =nameForPress;
      if(this.state.age!==''&& this.state.year!=='' && this.state.major!=='')
        {firebase.database().ref('users/' + name).set({
        Username: name,
        Age: this.state.age,
        Year: this.state.year,
        Major: this.state.major});
      }
      else{
        Alert.alert("Please fill in all the information!");
      }
    }

    setupPreviousInformation() {
      var something = this.state.username
      console.log(something)
      firebase.database().ref('users/' + this.state.username).once('value', (snapshot) => {
        if (snapshot.exists()){
          var Username = snapshot.val().Username;
          var Age = snapshot.val().Age;
          var Year = snapshot.val().Year;
          var Major = snapshot.val().Major;
        this.setState({
        username : Username,
        age : Age,
        year : Year,
        major : Major
        });
        }
    });
    this.getAndLoadHttpUrl();

    };


    openImagePickerAsync = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
            this.uploadImage(this.state.fileUri);
          }
        });
    
      }
    

    uploadImage = async(uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref1 = firebase.storage().ref("Usersimage/"+this.state.username);
      return ref1.put(blob);
    }


    getAndLoadHttpUrl()  {
      let imageRef = firebase.storage().ref("Usersimage/"+this.state.username);
      imageRef.getDownloadURL().then((url) => {
          //from url you can fetched the uploaded image easily
          this.setState({profileImageUrl: url,isImageReady: true });
        }).catch((e) => console.log('getting downloadURL of image error => ', e));
     /*
     let imageRef = Firebase.storage().ref('/' + this.state.username);
      imageRef.getDownloadURL().then((url) => {
          //from url you can fetched the uploaded image easily
          this.setState({profileImageUrl: url});
        }).catch((e) => console.log('getting downloadURL of image error => ', e));
      this.setState({ isImageReady: true })*/
      }


    render(){
      

      const fakesource = <Image source={{uri:this.state.profileImageUrl }} style={internalStyles.circle}/>;
      const circle = <View style={internalStyles.circle}/>

      return(
                <View style={styles.screen}>
                <View style = {internalStyles.mainroot}>
                <Text style={{fontSize:20, margin: 15,color: 'white'}}>Your Profile</Text>

                <View>
                {[this.state.isImageReady ?  fakesource :circle]}
                </View>

                <View style ={internalStyles.buttonlengthstyle}>
                <Button onPress={this.openImagePickerAsync} style = {internalStyles.confirmButton} color ='black' title="Pick a photo"/>
                </View>

                <View style={{marginBottom: 20,width: win.width/1.5}}>
                <TextInput value={this.state.age}
                onChangeText={age=> this.setState({ age })}
                placeholder={'Age'}
                style={internalStyles.input}/>
                <TextInput value={this.state.year}
                onChangeText={year=> this.setState({ year })}
                placeholder={'Year'}
                style={internalStyles.input}/>
                <TextInput value={this.state.major}
                onChangeText={major=> this.setState({ major })}
                placeholder={'Major'}
                style={internalStyles.input}/>
                <View style ={styles.buttonlengthstyle,{marginVertical:0}}>
                <Button onPress={() => this.setInformation()} 
                style = {internalStyles.confirmButton} color = 'red' title="Click to Change Information"/>
                </View>
                </View>
                </View>
            </View>
      );
    }

}

const win = Dimensions.get('window');
const internalStyles = StyleSheet.create({
    root:{
        flex:1,
        alignItems: "center"
    },
    mainroot:{
      flex: 1,
      alignItems: "center",
    },
    profile:{
      width: win.width/1.25,
      height: win.width/1.25,
      borderRadius: win.width/2/1.25,
      backgroundColor: 'red',
      marginVertical:10
    },
    circle: {
      width: win.width/1.3,
      height: win.width/1.3,
      borderRadius: win.width/2/1.3,
      backgroundColor: '#f0ffff',
      marginBottom: 35,
      marginBottom: 5
      
    },
    confirmButton:{
      margin:30,
      color: 'white' ,
      fontSize: 30,
    },
    input:{
      padding: 8,
      marginBottom: 10,
      backgroundColor: '#DBDBD9',
    },
    buttonlengthstyle:{
      width: win.width/1.5,
      marginVertical:10
    }
});

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(profileScreen);