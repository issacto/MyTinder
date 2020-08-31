import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
//import data , {usersshow} from './data.js';
import React, { Component } from 'react';
import firebase from './firebase.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class Swipe extends Component{
    constructor(props) {
        super(props);
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
      email:"kinwaitoissac@gmail",
      data: []
   }
        fetchData(){
          var rootRef = firebase.database().ref('users/'+this.state.email+'/peopleNotSwiped');
          var fecthdata =[];
          rootRef.once('value', (snapshot) => {
              if (snapshot.exists()){
              var something = snapshot.val();
              console.log(something);
              var somethingiven = Object.values(something)
              somethingiven.map((abc)=>{
                  var somethinginside = Object.values(abc)[0];
                  console.log("somehting makes sense: "+ somethinginside)
                  var joined = fecthdata.concat({name: somethinginside, uri: this.geturi(somethinginside)});
                  this.setState({data: joined });
                  console.log("dsfgfgs"+this.geturi(somethinginside));
                  
              })}})}
          
              geturi(name){
                  var urlPresent = false;
                  let imageRef = firebase.storage().ref("Usersimage/"+name);
                  imageRef.getDownloadURL().then((url) => {
                    console.log(url);
                    urlPresent =true;
                      //from url you can fetched the uploaded image easily
                      return url;
                    }).catch((e) => console.log('getting downloadURL of image error => ', e));
                  if (urlPresent==false){
                    return './person.jpg';
                  }
              }         

        
    
    
    render(){
        
        return this.state.data.map((item, i) => {
            if (i < this.state.currentIndex) {
              return null;
            } else if (i == this.state.currentIndex) {
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
                            fontSize: 32,
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
                            fontSize: 32,
                            fontWeight: "800",
                            padding: 10
                        }}
                        >
                        NOPE
                        </Text>
                    </Animated.View>
                <Image
                style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20
                }}
                source={item.uri}
                />
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
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 20
                    }}
                    source={item.uri}
                  />
                </Animated.View>
              );
            }
          }).reverse();
     
        }
        componentWillMount() {
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
                } else if (gestureState.dx < -120) {
                  Animated.spring(this.position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    useNativeDriver: false
                  }).start(() => {
                    this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                      this.position.setValue({ x: 0, y: 0 })
                    })
                  })
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