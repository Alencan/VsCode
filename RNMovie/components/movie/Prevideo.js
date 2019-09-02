import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls'



export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={{flex:1,backgroundColor:"#000"}}>
      {/* <Video
        source={{ uri: this.props.url }}
        ref={(ref)=>{
          this.player=ref
        }}
        onBuffer={this.onBuffer}
        onError={this.onError}
        style={{ position:"absolute",top:0,left:0,borderWidth:1,borderColor:"red",width:"100%",height:200}}
      /> */}
      <VideoPlayer
        source={{uri:this.props.url}}
        style={{ position:"absolute",top:150,left:0,width:"100%",height:200}}
      />
    </View>
  }
}


const styles = StyleSheet.create({

});

