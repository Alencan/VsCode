import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight } from 'react-native'
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';




export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isloading: true,
            start: 0,
            count: 10
        }
    }
    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return <FlatList data={this.state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMovies}
        ><Text>即将上映</Text></FlatList>

    }
    renderItem = (item) => {
        //
        return <TouchableHighlight underlayColor='#fff' onPress={() => this.getMovieDetail(item.id)}>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                <Image source={{ uri: item.images.small }} style={{ width: 90, height: 140, marginTop: 12, marginBottom: 12, marginLeft: 8 }}></Image>
                <View style={{ paddingLeft: 15, position: 'relative' }}>
                    <Text style={{ paddingTop: 12, fontSize: 18 }}>{item.title}</Text>
                    <View style={{ paddingTop: 10, width: 50 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={9}
                            rating={item.stars / 10}
                            fullStarColor='orange'
                            emptyStarColor="#fff"
                        />
                        <Text style={{ color: "#000", fontSize: 10, marginTop: 10 ,width:80}}>{item.pubdate.slice(0, 4)}/ 剧情·动作·爱情
                        </Text>
                        <Text style={{ borderWidth: 1, borderColor: 'red', fontSize: 10, height: 34, width: 40, paddingLeft: 5, paddingRight: 5, textAlign: 'center', position: "absolute", left: 210, top: 10 }}>{item.pubdate.split("-")[1] + '月' + item.pubdate.split("-")[2] + '日'}</Text>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    }
    renderSeparator = () => {
        return <View style={{ borderTopColor: '#ccc', borderTopWidth: 1 }}></View>
    }
    loadMovies = () => {
        this.getMovieDatas()
        // this.setState(state=>{
        //     return {count:state.count+1}
        // },()=>{
        //     this.getMovieDatas()
        // })
    }
    componentDidMount() {

        this.getMovieDatas();
        //因为是'异步'方法setState()所以一开始movies就是空的
        //console.warn(this.state.movies+'11')
    }

    getMovieDatas = () => {
        const url = `http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${this.state.start}&count=${this.state.count}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.warn(data)
                this.setState(state => {
                    return {
                        movies: [...state.movies, ...data.entries],
                        isloading: false
                    }
                })
                //console.warn(this.state.movies)
            })
        this.state.start += this.state.count;

    }
    getMovieDetail = (id) => {
        Actions.movieDetail({ id: id })
    }

}