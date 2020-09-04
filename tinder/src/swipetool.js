import { StyleSheet,YellowBox , Text, View, Dimensions, Image,ImageBackground, Animated, PanResponder } from 'react-native';
//import data , {usersshow} from './data.js';
import React, { Component } from 'react';
import firebase from './firebase.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class Swipe extends Component{
    constructor(props) {
        super(props);
        this.component();
        this.position = new Animated.ValueXY();
        this.fetchData();
        this.rotate = this.position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
          extrapolate: 'clamp'
      });
      this.rotateAndTranslate = {
          transform: [{
            rotate: this.rotate
          },
          ...this.position.getTranslateTransform()
          ]
       };
       this.nextCardOpacity = this.position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp'
       });
       this.nextCardScale = this.position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: [1, 0.8, 1],
          extrapolate: 'clamp'
       });
       this.likeOpacity = this.position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: [0, 0, 1],
          extrapolate: 'clamp'
       });
       this.nopeOpacity = this.position.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          outputRange: [1, 0, 0],
          extrapolate: 'clamp'
       });
  }
    state = {
      currentIndex: 0,
      email:this.props.name,
      data: [],
      uriReady:false,
      swipedEmail:''

   }
          async fetchData(){
          //firebase.database().ref("users/peopleNotSwiped"  + this.state.email).push({name: "tototototoman@gmail"});
          var rootRef = firebase.database().ref('users/'+this.state.email+'/peopleNotSwiped');
          
          rootRef.once('value',async (snapshot) => {
              if (snapshot.exists()){
              var something =  snapshot.val();
              console.log(something);
              var somethingiven = Object.values(something);
              console.log(somethingiven);
              await Promise.all( somethingiven.map(async abc =>{
                  var somethinginside = Object.values(abc)[0];
                  console.log("WTF"+somethinginside);
                  let photoUri = await this.geturi(somethinginside);
                  console.log("photourl fakejb bfaeobfaejo: "+ photoUri)
                  var joined = this.state.data.concat({name: somethinginside, uri: {uri:photoUri }});
                  
                  this.setState({data: joined });
                  
                  console.log(this.state.data)
                  //console.log("dsfgfgs"+this.geturi(somethinginside));
                  
              })).then(users => {console.log("Aegaegaegaeggeaagegeagae"+this.state.data),
              this.setState({uriReady:true})}
                )
              
              
            }})
            
          
          }
          
              async geturi(name1) {
                var isDone = false;
                
                try{

                  let url = await firebase.storage().ref("Usersimage/"+name1).getDownloadURL();
                  isDone = true;
                  console.log("HERE we GO 1: "+ url);
                  return url;
                      
                      
                }catch(e) {console.log('getting downloadURL of image error => ', e.message);
                    if(isDone!==true){
                    console.log("YO"+name1);
                    let newImageRef = await firebase.storage().ref("Usersimage/"+'background.jpg').getDownloadURL();
                     /*newImageRef.getDownloadURL().then((url) => {
                      console.log('hiaeh riubrifaejbofobebirb;');
                        //from url you can fetched the uploaded image easily
                        url = 'https://firebasestorage.googleapis.com/v0/b/ulove-903e0.appspot.com/o/Usersimage%2F11.png?alt=media&token=57ba5897-204f-4a8d-a049-1142a73e995f'
                        return url*/
                        console.log("HERE we GO 2: "+ newImageRef);
                        return newImageRef
                        ;}
              }  }       

        

  
    
    render(){
      return(
        <View>
      {this.state.uriReady ? (this.state.data.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        console.log('y');
        console.log(this.state.data);
        this.state.swipedEmail = item.name;
        console.log("WHATSUP"+this.state.swipedEmail );
        return (
          <Animated.View
          {...this.PanResponder.panHandlers}
          key={i}
          style={[
          this.rotateAndTranslate,
          {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute"
          }
          ]}
      >
             <Animated.View
                  style={{
                  opacity: this.likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000
                  }}
              >
                  <Text
                  style={{
                      borderWidth: 1,
                      borderColor: "green",
                      color: "green",
                      fontSize: 42,
                      fontWeight: "800",
                      padding: 10
                  }}
                  >
                  LIKE
                  </Text>
              </Animated.View>

              <Animated.View
                  style={{ 
                  opacity: this.nopeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000
                  }}
              >
                  <Text
                  style={{
                      borderWidth: 1,
                      borderColor: "red",
                      color: "red",
                      fontSize: 42,
                      fontWeight: "800",
                      padding: 10
                  }}
                  >
                  NOPE
                  </Text>
              </Animated.View>
          <ImageBackground
          style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20
          }}
          source={item.uri}
          >
            <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 20,
              position: 'absolute', // child
              bottom: 10, // position where you want
              left: 0
            }}
          >
           {item.name}
          </Text>

            </ImageBackground>
      </Animated.View>);
      }else {
        return (
          <Animated.View
              key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
              }]
          }>
            <ImageBackground
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}>
                <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 20,
                  position: 'absolute', // child
                  bottom: 10, // position where you want
                  left: 0
                }}>
                {item.name}
              </Text>



            </ImageBackground>
          </Animated.View>
        );
      }
    }).reverse()) : <Text style={{color:'white'}}>Loading.....</Text>}
      </View>
      )}

        
        component() {
            this.PanResponder = PanResponder.create({
              onStartShouldSetPanResponder: (evt, gestureState) => true,
              onPanResponderMove: (evt, gestureState) => {
                 this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                  Animated.spring(this.position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    useNativeDriver: false
                  }).start(() => {
                    this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                      this.position.setValue({ x: 0, y: 0 })
                    })
                  })
                //->自己  swiped people 1 , ->1,2Matchedpeople,1 notswiped bye
                //notswiped bye
                var rootRef = firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped');
                rootRef.once('value', (snapshot) => {
                    if (snapshot.exists()){
                    var newPeopleNotSwiped = [];
                    var something = snapshot.val();
                    console.log(something);
                    var somethingiven = Object.values(something)
                    somethingiven.map((abc)=>{
                        var somethinginside = Object.values(abc)[0]
                        if(somethinginside!=this.state.swipedEmail){
                        var joined = newPeopleNotSwiped.concat(somethinginside)
                        newPeopleNotSwiped = joined;
                        
                        }
                        
                    });
                    firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped').set(newPeopleNotSwiped);
                    console.log("dsfgfgs"+this.state.matchedPeople)
                  }})
                //->自己  swiped people 1 
                var rootRef = firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped');
                rootRef.once('value', (snapshot) => {
                    if (snapshot.exists()){
                    var newPeopleNotSwiped = [];
                    var something = snapshot.val();
                    console.log(something);
                    var somethingiven = Object.values(something)
                    somethingiven.map((abc)=>{
                        var somethinginside = Object.values(abc)[0]
                        if(somethinginside!=this.state.swipedEmail){
                        var joined = newPeopleNotSwiped.concat(somethinginside)
                        newPeopleNotSwiped = joined;
                        
                        }
                        
                    });
                    firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped').set(newPeopleNotSwiped);
                    console.log("dsfgfgs"+this.state.matchedPeople)
                  }})
                firebase.database().ref('users/' + this.state.email +"/peopleISwiped").push(this.state.swipedEmail);
                // ]others got liked
                firebase.database().ref('users/' + this.state.swipedEmail +"/PeopleSwipedU").push(this.state.email);
                //->1,2Matchedpeople, 
                // Your matched
                var rootRef = firebase.database().ref('users/'+this.state.email +'/PeopleSwipedU');
                rootRef.once('value', (snapshot) => {
                    if (snapshot.exists()){
                    var something = snapshot.val();
                    var somethingiven = Object.values(something)
                    somethingiven.map((abc)=>{
                        console.log("AAAAA"+ abc)
                        console.log("BBBBB"+ this.state.swipedEmail)
                        if(abc==this.state.swipedEmail){
                          firebase.database().ref('users/'+this.state.email+'/peopleMatched').push({name:this.state.swipedEmail});
                          firebase.database().ref('users/'+this.state.swipedEmail+'/peopleMatched').push({name:this.state.email});
                        }
                    });
                  }})

                

                } else if (gestureState.dx < -120) {
                  Animated.spring(this.position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: false
                  }).start(() => {
                    this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                      this.position.setValue({ x: 0, y: 0 })
                    })
                  })
                  //notswiped bye
                var rootRef = firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped');
                rootRef.once('value', (snapshot) => {
                    if (snapshot.exists()){
                    var newPeopleNotSwiped = [];
                    var something = snapshot.val();
                    console.log(something);
                    var somethingiven = Object.values(something)
                    somethingiven.map((abc)=>{
                        var somethinginside = Object.values(abc)[0]
                        if(somethinginside!=this.state.swipedEmail){
                        var joined = newPeopleNotSwiped.concat(somethinginside)
                        newPeopleNotSwiped = joined;
                        
                        }
                        
                    });
                    firebase.database().ref('users/'+this.state.email +'/peopleNotSwiped').set(newPeopleNotSwiped);
                    console.log("dsfgfgs"+this.state.matchedPeople)
                  }})

                }

                else {
                    Animated.spring(this.position, {
                       toValue: { x: 0, y: 0 },
                      useNativeDriver: false,
                       friction: 4
                       }).start()
                    }
                
            }
            })
        }
    }