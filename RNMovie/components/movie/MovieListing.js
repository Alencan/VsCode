import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight } from 'react-native'
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isloading: true,
            start: 0,
            count: 10,
            moviedetail: [],
            genres: []
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
        ></FlatList>

    }
    renderItem = (item) => {
        //
        return <TouchableHighlight underlayColor='#fff' onPress={() => this.getMovieDetail(item.id)}>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                <Image source={{ uri: item.images.small }} style={{ width: 90, height: 140, marginTop: 12, marginBottom: 12, marginLeft: 8 }}></Image>
                <View style={{ paddingLeft: 10, position: 'relative' }}>
                    <Text style={{ paddingTop: 12, fontSize: 18 }}>{item.title}</Text>
                    <View style={{ paddingTop: 10, width: 100 }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={9}
                            rating={item.stars / 10}
                            fullStarColor='orange'
                            containerStyle={{ width: 18 }}
                            emptyStarColor="#fff"
                        />
                        <Text style={{ color: "#000", fontSize: 10,marginTop:10 }}>{item.pubdate.slice(0, 4)}/ 剧情·动作·爱情 
                           
                        </Text>
                        <View style={{ position: "absolute", left: '220%', top: 10 }}>
                            <Icon name='heart' size={20} color='orange' />
                            <Text style={{ color: 'orange' }}>收藏</Text>
                        </View>
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
    }
    componentDidMount() {

        this.getMovieDatas();
        
    }

    getMovieDatas = () => {
        const url = `http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${this.state.start}&count=${this.state.count}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState(state => {
                    return {
                        movies: [...state.movies, ...data.entries],
                        isloading: false
                    }
                }, () => {
                    this.state.movies.map((item) => {
                       
                    })
                })
            })
        this.state.start += this.state.count;



    }
    // getMovieinfo = (id) => {
    //     const url = `http://api.douban.com/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.warn(data)
    //             this.setState({
    //                 // moviedetail: this.state.moviedetail.concat(data),
    //                 genres: this.state.genres.concat(data.genres.join("·")),
    //             })
    //         })
    // }
    getMovieDetail = (id) => {
        Actions.movieDetail({ id: id })
    }

}