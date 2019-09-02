import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import cheerio from 'cheerio';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      starCount: 3.5,
      title: [],
      desc: [],
      cover: [],
      link: [],
      nowplay: [],
      coming: []
    }
  }

  render() {
    if (this.state.isloading) {
      return <ActivityIndicator size='large'></ActivityIndicator>
    }
    return <View style={styles.container}>
      {/* 轮播图 */}
      <View style={styles.wrapper}>
        <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout="4" showsPagination={false}>
          <View style={styles.slide1}>
            <Image source={{ uri: this.state.cover[0] }} style={{ width: '100%', height: '135%' }}></Image>
            <View style={styles.cover}>
              <Text style={styles.text1}>{this.state.title[0]}</Text>
              <Text style={styles.text2}>{this.state.desc[0]}</Text>
            </View>
          </View>
          <View style={styles.slide2}>
            <Image source={{ uri: this.state.cover[1] }} style={{ width: '100%', height: '135%' }}></Image>
            <View style={styles.cover}>
              <Text style={styles.text1}>{this.state.title[1]}</Text>
              <Text style={styles.text2}>{this.state.desc[1]}</Text>
            </View>
          </View>
          <View style={styles.slide3}>
            <Image source={{ uri: this.state.cover[2] }} style={{ width: '100%', height: '1235%' }}></Image>
            <View style={styles.cover}>
              <Text style={styles.text1}>{this.state.title[2]}</Text>
              <Text style={styles.text2}>{this.state.desc[2]}</Text>
            </View>
          </View>
          <View style={styles.slide3}>
            <Image source={{ uri: this.state.cover[3] }} style={{ width: '100%', height: '135%' }}></Image>
            <View style={styles.cover}>
              <Text style={styles.text1}>{this.state.title[3]}</Text>
              <Text style={styles.text2}>{this.state.desc[3]}</Text>
            </View>
          </View>
          {/* <View style={styles.slide3}>
            <Image source={{ uri: this.state.cover[4] }} style={{ width: '100%', height: '125%' }}></Image>
            <View style={{ width: '100%', height: '125%', backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: "0%" }}>
              <Text style={styles.text1}>{this.state.title[4]}</Text>
              <Text style={styles.text2}>{this.state.desc[4]}</Text>
            </View>
          </View>
          <View style={styles.slide3}>
            <Image source={{ uri: this.state.cover[5] }} style={{ width: '100%', height: '125%' }}></Image>
            <View style={styles.cover}>
              <Text style={styles.text1}>{this.state.title[5]}</Text>
              <Text style={styles.text2}>{this.state.desc[5]}</Text>
            </View>
          </View> */}
        </Swiper>
      </View >


      <ScrollView>
        {/* 正在热映 */}
        <View style={styles.nowplaying}>
          <View style={{ width: "100%", marginTop: "2%", marginLeft: "10%" }}>
            <Text style={{ width: "19%", borderBottomColor: "#000", borderBottomWidth: 2 }}>影院热映</Text>
            <Text style={{ position: "absolute", top: "0%", right: "10%" }} onPress={() => { this.goMovieListing() }}>全部</Text>
            <Icon name="chevron-right" size={10} color="gray" style={{ position: "absolute", top: "22%", right: "5%" }} />
          </View>
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[0]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[0].images.large }} style={{ width: '90%', height: '80%' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[0].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[0].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[0].rating}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[1]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[1].images.large }} style={{ width: '100%', height: '80%' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[1].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[1].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[1].rating}</Text>
            </View>
            
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[2]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[2].images.large }} style={{ width: '100%', height: '80%',flexWrap: 'wrap' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[2].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[2].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[2].rating}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[3]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[3].images.large }} style={{ width: '100%', height: '80%' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[3].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[3].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[3].rating}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[4]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[4].images.large }} style={{ width: '100%', height: '80%' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[4].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[4].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[4].rating}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { this.goMovieDetail(this.state.nowplay.length > 0 && this.state.nowplay[5]) }}>
            <View style={styles.nowplayingItem2}>
              <Image source={{ uri: this.state.nowplay.length > 0 && this.state.nowplay[5].images.large }} style={{ width: '100%', height: '80%' }}></Image>
              <Text numberOfLines={1} style={{ fontSize: 12 }}>{this.state.nowplay.length > 0 && this.state.nowplay[5].title}</Text>
              <StarRating disabled={false} maxStars={5} starSize={10} emptyStarColor="#fff" containerStyle={{ width: 18 }} fullStarColor="orange" rating={this.state.nowplay.length > 0 && this.state.nowplay[5].stars / 10} />
              <Text style={{ position: "absolute", bottom: 2, right: 15, fontSize: 10, color: "grey" }}>{this.state.nowplay.length > 0 && this.state.nowplay[5].rating}</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* 即将上映 */}
        <View style={styles.nowplaying}>
          <View style={{ width: "100%", marginTop: "2%", marginLeft: "5%" }}>
            <Text style={{ width: "19%", borderBottomColor: "#000", borderBottomWidth: 2 }}>即将上映</Text>
            <Text style={{ position: "absolute", top: "0%", right: "10%" }} onPress={() => { this.goMovieList() }}>全部</Text>
            <Icon name="chevron-right" size={10} color="gray" style={{ position: "absolute", top: "22%", right: "5%" }} />
          </View>
          <FlatList
            data={this.state.coming}
            keyExtractor={(item, i) => i}
            renderItem={({ item }) => this.renderItem(item)}
            numColumns={3}
            columnWrapperStyle={{ flexWrap: "wrap", justifyContent: 'space-around', marginBottom: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  }

  //渲染即将上映的单条数据
  renderItem = (item) => {
    return <TouchableHighlight onPress={() => { this.goMovieDetail(item) }}>
      <View style={styles.nowplayingItem}>
        <Image source={{ uri: item.images.large }} style={{ width: '100%', height: "80%" }}></Image>
        <Text numberOfLines={1} style={{ fontSize: 12, width: "100%", flexWrap: "wrap" }}>{item.title}</Text>
        <Text style={{ fontSize: 10, color: "grey", marginTop: -3 }}>{item.collection}人想看</Text>
        <View style={{ width: 50, height: 20, borderColor: "red", borderWidth: 1, borderRadius: 3 }}>
          <Text style={{ fontSize: 8, lineHeight: 15, textAlign: "center" }}>{item.pubdate.split("-")[1] + '月' + item.pubdate.split("-")[2] + '日'}</Text>
        </View>
      </View>
    </TouchableHighlight>
  }

  componentDidMount() {
    this.getNewsMsg();
    this.getnowplaying();
    this.getcoming();
  }

  //获取首页轮播图数据
  getNewsMsg = () => {
    const url = `https://movie.douban.com/`
    fetch(url)
      .then(res => res.text())
      .then(data => {
        $ = cheerio.load(data);
        var titl = [];
        var des = [];
        var cove = [];
        var lin = [];
        //获取轮播数据标题
        $('.gallery-frame h3').each(function (i, elem) {
          titl[i] = $(this).text();
        })
        //获取轮播数据详述
        $('.gallery-frame p').each(function (i, elem) {
          des[i] = $(this).text();
        })
        //获取轮播数据图片url  
        $('.gallery-frame img').each(function (i, elem) {
          cove[i] = $(this).attr('src');
        })
        //获取轮播链接地址
        $('.gallery-frame a').each(function (i, elem) {
          lin[i] = $(this).attr('href');
        })
        this.setState({
          title: titl,
          desc: des,
          cover: cove,
          link: lin
        })
      })
  }

  //获取影院热映数据
  getnowplaying() {
    const url = `http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    fetch(url)
      .then(res => res.json())
      .then(({ entries }) => {
        this.setState({
          nowplay: entries,
          isloading: false
        })
      })
  }

  //获取即将上映数据
  getcoming() {
    const url = `http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6`;
    fetch(url)
      .then(res => res.json())
      .then(({ entries }) => {
        this.setState({
          coming: entries
        })
      })
  }

  //去到影片详情页
  goMovieDetail = (item) => {
    Actions.movieDetail({ id: item.id })
  }

  //去到热映列表
  goMovieListing = () => {
    Actions.movieListing()
  }

  //去到即将上映列表
  goMovieList = () => {
    Actions.movieListWill()
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    height: 180
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  cover: {
    width: '100%',
    height: '125%',
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: "0%"
  },
  text1: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 100
  },
  text2: {
    color: '#ccc',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: -15
  },
  nowplaying: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  nowplayingItem: {
    height: 160,
    width: 100,
    marginTop: 5,
    marginBottom: 15,
  },
  nowplayingItem2: {
    height: 160,
    width: 103,
    marginTop: 5,
    marginBottom: 15,
  }
});

