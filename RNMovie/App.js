import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './components/tabbar/Home.js';
import Class from './components/tabbar/Class.js';
import User from './components/tabbar/User.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'home' // 选中的tab栏名称嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻ooooooxxxxxx
    }
  }

  render() {
    return <View style={styles.container}>
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Icon name="home" size={25} color="gray" />} // 未选中状态下，展示的图标
          renderSelectedIcon={() => <Icon name="home" size={25} color="#0079FF" />} // 选中状态下展示的图标
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home></Home>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'class'}
          title="排行"
          renderIcon={() => <Icon name="th-list" size={25} color="gray" />} // 未选中状态下，展示的图标
          renderSelectedIcon={() => <Icon name="th-list" size={25} color="#0079FF" />} // 选中状态下展示的图标
          onPress={() => this.setState({ selectedTab: 'class' })}>
          <Class></Class>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'user'}
          title="用户"
          renderIcon={() => <Icon name="user" size={25} color="gray" />} // 未选中状态下，展示的图标
          renderSelectedIcon={() => <Icon name="user" size={25} color="#0079FF" />} // 选中状态下展示的图标
          onPress={() => this.setState({ selectedTab: 'user' })}>
          <User></User>
        </TabNavigator.Item>
      </TabNavigator>

    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

