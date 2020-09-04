import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import { TouchableOpacity,View,Text} from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase.js';
import { styles } from '../styles';


class chatScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.component();
        
        this.onSend = this.onSend.bind(this);
        // pass id here
      }
      state = {
        messages: [],
        email: this.props.route.params.yourUsername,
        othersEmail: this.props.route.params.otherUsername,
        othersAvatar: this.props.route.params.avatar
        //''otherUsername
      };
      timestamp = Date.now()
      geturl(){
        console.log("MYEMAIL:"+this.state.email);
        console.log("otehrsemail:"+this.state.othersEmail);
        if (this.state.email > this.state.othersEmail){
          return(this.state.email +""+this.state.othersEmail);
      }else{
        return(this.state.othersEmail+""+this.state.email);
      };}
      ref = firebase.database().ref('Chat/'+this.geturl());
    
      component() {
        this.setState({
          messages: [],
        });
      }
      
      render() {
         
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={this.send}
            
            user={{
            name: this.state.email/*set name here*/,
            _id:this.state.email,
            createdAt:  new Date(),
            avatar: this.state.othersAvatar
            
            }
          }

          />
        );
      }
      componentDidMount() {
        this.refOn(message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
          }))
        );
      }
      refOn = callback => {
        this.ref
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
      }
      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {_id, timestamp, text, user};
        return message;
      };
    
      send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          const message = {text, user, createdAt: this.timestamp, };
          this.ref.push(message);
        }
      };
    
      onSend(messages = []) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
      }
    }

const mapStateToProps = state => ({
    settings: state.settings,
})

export default connect(mapStateToProps)(chatScreen);