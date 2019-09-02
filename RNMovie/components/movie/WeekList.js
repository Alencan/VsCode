import React from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight } from 'react-native'
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isloading: true,
            start: 0,
            count: 4,
            photo: '',
            title: '',
        }
    }
    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return <FlatList data={this.state.movies}
            keyExtractor={(item) => item.subject.id.toString()}
            renderItem={({ item, index }) => this.renderItem(item, index + 1)}
            ItemSeparatorComponent={this.renderSeparator}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMovies}
            ListHeaderComponent={this.headerComponent}
        ></FlatList>

    }

    renderItem = (item, index) => {
        choose = (i) => {
            if (i == 1) {
                return <Text style={[styles.number1, styles.number]}>NO.1</Text>
            } else if (i == 2) {
                return <Text style={[styles.number2, styles.number]}>No.2</Text>
            } else if (i == 3) {
                return <Text style={[styles.number3, styles.number]}>No.3</Text>
            } else {
                return <Text style={[styles.number4, styles.number]}>No.{i}</Text>
            }

        }
        return <TouchableHighlight underlayColor='#fff' onPress={() => this.getMovieDetail(item.id)}>
            <View style={{ flexDirection: 'row', justifyContent: "flex-start", height: 160 }}>
                <View>
                    {choose(index)}
                    <Image source={{ uri: item.subject.images.small }} style={{ width: 90, height: 110, marginLeft: 7 }}></Image>
                </View>
                <View style={{ paddingLeft: 10, }}>
                    <Text style={{ paddingTop: 32, fontSize: 18 }}>{item.subject.title}</Text>
                    <View style={{ paddingTop: 10, width: 50, flexDirection: 'row' ,position: 'relative'}}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={9}
                            rating={item.subject.rating.stars / 10}
                            fullStarColor='orange'
                        />
                        <Text style={{ fontSize: 12, marginLeft: 6, position: 'absolute', left: 45, top: 7 }}>{item.subject.rating.average}</Text>
                        <View style={{ position: "absolute", left: 210, top: 10 }}>
                            <Icon name='heart' size={20} color='orange' />
                            <Text style={{ color: 'orange' }}>收藏</Text>
                        </View>

                    </View>

                </View>
            </View>
        </TouchableHighlight>

    }
    headerComponent = () => {
        return <View >
            <Image source={{ uri: this.state.photo }} style={{width:"100%", height: 190, opacity: 0.8 }}></Image>
            <Text style={{ fontSize: 24, position: 'absolute', left: 15, top: 120, color: 'white' }}>{this.state.title}</Text>
        </View>;
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
        const url1 = `http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${this.state.start}&count=${this.state.count}`

        fetch(url1)
            .then(res => res.json())
            .then(data => {

                this.setState(state => {
                    return {
                        movies: [...state.movies, ...data.subjects],
                        photo: data.subjects[0].subject.images.small,
                        title: data.title,
                        isloading: false,

                    }
                }
                )

            })

        this.state.start += this.state.count;

    }
    getMovieDetail = (id) => {
        Actions.movieDetail({ id: id })
    }

}

const styles = StyleSheet.create({
    number: {
        color: 'white',
        width: 40,
        height: 20,
        marginBottom: 12,
        marginLeft: 7,
        marginTop: 5,
        textAlign: 'center'
    },
    number1: {
        backgroundColor: 'red',
    },
    number2: {
        backgroundColor: 'orange'
    },
    number3: {
        backgroundColor: 'yellow'
    },
    number4: {
        backgroundColor: 'gray'
    }
})