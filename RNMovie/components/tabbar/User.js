import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { gray } from 'ansi-colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View >
      <View >
        <ImageBackground source={require('../../images/101.jpg')} style={styles.img} >
          <View style={{ marginTop: 70, marginLeft: 170 }}>
            <Image source={require('../../images/101.jpg')} style={{ borderRadius: 30, width: 60, height: 60 }}></Image>
            <Text style={{ fontSize: 18, color: 'white' }}>MyMovie</Text>
          </View>
        </ImageBackground>
      </View>

      <TouchableHighlight onPress={()=>{this.goMylike()}}>
            <View style={{height:54, borderBottomColor: "lightgray", borderBottomWidth: 1}} onPress>
            <Icon name='user' size={25}  style={{top:13,left:8}}></Icon>
            <Text style={{position:'absolute', left:55,top:17}}>我的收藏</Text>
            <Icon name="chevron-right" size={15} style={{position:'absolute',right:10,top:18}}></Icon>
            </View>
      </TouchableHighlight>  

      <TouchableHighlight onPress={()=>{this.goMyaddress()}}>
            <View style={{height:54, borderBottomColor: "lightgray", borderBottomWidth: 1}}>
            <Icon name='file-text' size={25}  style={{top:13,left:8}}></Icon>
            <Text style={{position:'absolute', left:55,top:17}}>项目地址</Text>
            <Icon name="chevron-right" size={15} style={{position:'absolute',right:10,top:18}}></Icon>
            </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={()=>{this.goMywechat()}}>
            <View style={{height:54, borderBottomColor: "lightgray", borderBottomWidth: 1}}>
            <Icon name='star' size={25}  style={{top:13,left:8}}></Icon>
            <Text style={{position:'absolute', left:55,top:17}}>我的微信号</Text>
            <Icon name="chevron-right" size={15} style={{position:'absolute',right:10,top:18}}></Icon>
            </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={()=>{this.goMypublic()}}>
            <View style={{height:54, borderBottomColor: "lightgray", borderBottomWidth: 1}}>
            <Icon name='send' size={25}  style={{top:13,left:8}}></Icon>
            <Text style={{position:'absolute', left:55,top:17}}>我的公众号</Text>
            <Icon name="chevron-right" size={15} style={{position:'absolute',right:10,top:18}}></Icon>
            </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={()=>{this.goMyskill()}}>
            <View style={{height:54, borderBottomColor: "lightgray", borderBottomWidth: 1}}>
            <Icon name='quora' size={25}  style={{top:13,left:8}}></Icon>
            <Text style={{position:'absolute', left:55,top:17}}>设置</Text>
            <Icon name="chevron-right" size={15} style={{position:'absolute',right:10,top:18}}></Icon>
            </View>
      </TouchableHighlight>
            


        </View>

  }
      goMylike=()=>{
        Actions.mylike()
      }
      goMyaddress=()=>{
        Actions.myaddress()
      }
      goMywechat=()=>{
        Actions.mywechat()
      }
      goMypublic=()=>{
        Actions.mypublic()
      }
      goMyskill=()=>{
        Actions.myskill()
      }
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 190,
    // opacity: 0.7,
  }
});

