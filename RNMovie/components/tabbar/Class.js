import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';

export default class Class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekly: [],
      newmovies: [],
      usbox: [],
      top: [],
      isloading: true,
    }
  }

  render() {
    if (this.state.isloading) {
      return <ActivityIndicator size='large'></ActivityIndicator>
    }
    return <View style={{ width: "100%", paddingBottom: 50, backgroundColor: "#ccc" }}>
      <View style={{ width: "100%", marginTop: "2%", marginLeft: "5%" }}>
        <Text style={{ width: "19%", borderBottomColor: "#000", borderBottomWidth: 2 }}>电影榜单</Text>
      </View>
      <ScrollView>
        {this.renderFlatList()}
      </ScrollView>
    </View>
  }

  //周榜、北美榜
  renderweekItem = (item) => {
    return <View style={{ width: "90%", marginLeft: 10, marginTop: 5 }}>
      <Text style={{ color: "#fff", fontSize: 13 }}>{item.subject.title}</Text>
      <StarRating disabled={false} maxStars={5} starSize={10} containerStyle={{ width: 18, position: "absolute", right: 50 }} fullStarColor="orange" rating={item.subject.rating.stars / 10} />
      <Text style={{ position: "absolute", bottom: 5, right: 0, fontSize: 10, color: "#fff" }}>{item.subject.rating.average}</Text>
    </View>
  }
  //新片榜、top榜
  rendernewItem = (item) => {
    return <View style={{ width: "90%", marginLeft: 10, marginTop: 5 }}>
      <Text style={{ color: "#fff", fontSize: 13 }}>{item.title}</Text>
      <StarRating disabled={false} maxStars={5} starSize={10} containerStyle={{ width: 18, position: "absolute", right: 50 }} fullStarColor="orange" rating={item.rating.stars / 10} />
      <Text style={{ position: "absolute", bottom: 5, right: 0, fontSize: 10, color: "#fff" }}>{item.rating.average}</Text>
    </View>
  }

  renderFlatList = () => {
    return <View>
      {/* 周榜 */}
      <TouchableOpacity onPress={() => { this.goweeklist() }}>
        <View style={{ width: "80%", height: 180, marginLeft: "10%", marginTop: 10, borderRadius: 10 }}>
          <Image source={{ uri: this.state.weekly.length > 0 && this.state.weekly[0].subject.images.large }} style={{ width: '100%', height: '100%', borderRadius: 10 }}></Image>
          <View style={styles.cover}>
            <Text style={{ fontSize: 12, color: "#fff", marginTop: 13, marginLeft: 10 }}>每周五更新·共十部</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 15, marginLeft: 10 }}>一周口碑电影榜</Text>
            <View style={{ width: "100%", height: 120, backgroundColor: "#8b3a3a", marginTop: 10 }}>
              <FlatList
                data={this.state.weekly}
                keyExtractor={(item, i) => i}
                renderItem={({ item }) => this.renderweekItem(item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* 新片榜 */}
      <TouchableOpacity onPress={() => { this.gonewlist() }}>
        <View style={{ width: "80%", height: 180, marginLeft: "10%", marginTop: 10, borderRadius: 10 }}>
          <Image source={{ uri: this.state.newmovies.length > 0 && this.state.newmovies[0].images.large }} style={{ width: '100%', height: '100%', borderRadius: 10 }}></Image>
          <View style={styles.cover}>
            <Text style={{ fontSize: 12, color: "#fff", marginTop: 13, marginLeft: 10 }}>每周五更新·共十部</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 15, marginLeft: 10 }}>一周新电影榜</Text>
            <View style={{ width: "100%", height: 120, backgroundColor: "#778899", marginTop: 10 }}>
              <FlatList
                data={this.state.newmovies}
                keyExtractor={(item, i) => i}
                renderItem={({ item }) => this.rendernewItem(item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* 北美票房榜 */}
      <TouchableOpacity onPress={() => { this.gouslist() }}>
        <View style={{ width: "80%", height: 180, marginLeft: "10%", marginTop: 10, borderRadius: 10 }}>
          <Image source={{ uri: this.state.usbox.length > 0 && this.state.usbox[0].subject.images.large }} style={{ width: '100%', height: '100%', borderRadius: 10 }}></Image>
          <View style={styles.cover}>
            <Text style={{ fontSize: 12, color: "#fff", marginTop: 13, marginLeft: 10 }}>每周五更新·共十部</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 15, marginLeft: 10 }}>北美电影票房榜</Text>
            <View style={{ width: "100%", height: 120, backgroundColor: "#8b4726", marginTop: 10 }}>
              <FlatList
                data={this.state.usbox}
                keyExtractor={(item, i) => i}
                renderItem={({ item }) => this.renderweekItem(item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Top250 */}
      <TouchableOpacity onPress={() => { this.gotoplist() }}>
        <View style={{ width: "80%", height: 180, marginLeft: "10%", marginTop: 10, borderRadius: 10 }}>
          <Image source={{ uri: this.state.top.length > 0 && this.state.top[0].images.large }} style={{ width: '100%', height: '100%', borderRadius: 10 }}></Image>
          <View style={styles.cover}>
            <Text style={{ fontSize: 12, color: "#fff", marginTop: 13, marginLeft: 10 }}>豆瓣榜单·共250部</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 15, marginLeft: 10 }}>豆瓣电影Top250</Text>
            <View style={{ width: "100%", height: 120, backgroundColor: "#8b2323", marginTop: 10 }}>
              <FlatList
                data={this.state.top}
                keyExtractor={(item, i) => i}
                renderItem={({ item }) => this.rendernewItem(item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  }

  componentDidMount() {
    this.getweekly();
    this.getnewmoview();
    this.getusbox();
    this.gettop()
  }


  //获取本周口碑榜数据
  getweekly() {
    const url = `http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fetch(url)
      .then(res => res.json())
      .then(({ subjects }) => {
        this.setState({
          weekly: subjects
        })
      })
  }

  //获取新片榜数据
  getnewmoview() {
    const url = `http://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fetch(url)
      .then(res => res.json())
      .then(({ subjects }) => {
        this.setState({
          newmovies: subjects
        })
      })
  }

  //获取北美榜数据
  getusbox() {
    const url = `http://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fetch(url)
      .then(res => res.json())
      .then(({ subjects }) => {
        this.setState({
          usbox: subjects
        })
      })
  }

  //获取Top250榜
  gettop() {
    const url = `http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fetch(url)
      .then(res => res.json())
      .then(({ subjects }) => {
        this.setState({
          top: subjects,
          isloading: false
        })
      })
  }

  //去周榜列表
  gotoplist = () => {
    Actions.toplist()
  }

  gonewlist = () => {
    Actions.newlist()
  }

  goweeklist = () => {
    Actions.weeklist()
  }

  gouslist = () => {
    Actions.uslist()
  }
}


const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: "0%",
    borderRadius: 10,
    overflow: "hidden"
  }
});

