/*import React from 'react';

var data =[]
class settingsScreen extends React.Component {

  state ={
    NotSwiped : [
      { id: "1", uri: require('./person.jpg') },
      { id: "2", uri: require('./person.jpg') },
      { id: "3", uri: require('./person.jpg') },
      { id: "4", uri: require('./person.jpg') },
      { id: "5", uri: require('./person.jpg') },
    ],
    dataready: false
  }

  fetchData(){
    var rootRef = firebase.database().ref('users/'+this.state.email+'/peopleNotSwiped');
    
    rootRef.once('value', (snapshot) => {
        if (snapshot.exists()){
        var something = snapshot.val();
        console.log(something);
        var somethingiven = Object.values(something)
        somethingiven.map((abc)=>{
            var somethinginside = Object.values(abc)[0]
            var joined = this.state.NotSwiped.concat(somethinginside)
            this.state.NotSwiped = joined;
            console.log("dsfgfgs"+this.state.NotSwiped)
            this.setState({dataReady: true})
        })}})}

  render(){
        return  NotSwiped
    }
}

export default data */