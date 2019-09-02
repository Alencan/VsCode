import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: 0,
            headImage: 0,
            name: 0,
            summary: 0,
            movies: [],
            photoList: []
        }
    }

    render() {

        return <ScrollView style={styles.container}>
            <View>
                <Image source={{ uri: this.state.photo }} style={styles.photo}></Image>
                <Icon name='chevron-left' size={15} color='white' onPress={this.goBack} style={styles.back}></Icon>
                <Image source={{ uri: this.state.headImage }} style={styles.headStyle}></Image>
                <Text style={styles.nameStyle}>{this.state.name}</Text>
                <ScrollView style={styles.introduct}>
                    <Text>简介</Text>
                    <Text >{this.state.summary}</Text>
                </ScrollView>
                <View>
                    <Text style={{ paddingTop: 8, paddingBottom: 6, marginLeft: 5 }}>影视作品</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                this.state.movies.map((item) => {
                                    return <View key={item.name}>
                                        <View style={{ height: 120, width: 80, marginRight: 10 }}>
                                            <Image source={{ uri: item.subject.images.small }} style={{ width: "100%", height: "80%", borderRadius: 5 }}></Image>
                                            <Text numberOfLines={1} style={{ fontSize: 12, width: "100%", flexWrap: "wrap" }}>{item.subject.original_title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row',marginTop:-10}} >
                                            <StarRating containerStyle={{ width: 35, paddingTop: 4 }}
                                                disabled={false}
                                                maxStars={5}
                                                starSize={7}
                                                rating={item.subject.rating.stars / 10}
                                                fullStarColor='orange'
                                            />
                                            <Text style={{ fontSize: 10, width: 25, paddingLeft: 5 }}>{item.subject.rating.average}</Text>
                                        </View>
                                    </View>
                                })
                            }
                        </ScrollView>
                    </View>
                    <Text style={{ paddingTop: 4, paddingBottom: 6, marginLeft: 5 }}>相册</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 ,height:'20%'}}>
                        {
                            this.state.photoList.map((item, idx) => {
                                return <View key={idx}>
                                    <View >
                                        <Image source={{ uri: item.thumb }} style={{ width: 100, height: 78, marginLeft: 5, borderRadius: 5 }}></Image>
                                    </View>
                                </View>
                            })
                        }
                    </ScrollView>
                </View>

            </View>

        </ScrollView>
    }
    componentDidMount() {
        this.getActorPhoto()
        this.getActorDetail()

    }
    //获取相册
    getActorPhoto = () => {
        const url = `http://api.douban.com/v2/movie/celebrity/${this.props.id}/photos?apikey=0df993c66c0c636e29ecbb5344252a4a`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.warn(data)

                this.setState({
                    photo: data.photos[0].thumb,
                    photoList: data.photos
                })
            })
    }
    //获取人物详情
    getActorDetail = () => {
        const url = `http://api.douban.com/v2/movie/celebrity/${this.props.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.warn(data)
                this.setState({
                    headImage: data.avatars.small,
                    name: data.name,
                    summary: data.summary,
                    movies: data.works
                })
            })
    }
    goBack = () => {
        Actions.pop()
    }
    spread = () => {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    photo: {
        height: 200,
        opacity: 0.8
    },
    back: {
        position: "absolute",
        top: 15,
        left: 5,
    },
    headStyle: {
        width: 60,
        height: 60,
        position: "absolute",
        left: '45%',
        top: 60,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    nameStyle: {
        color: 'white',
        position: "absolute",
        left: '45%',
        top: 124,
        fontSize: 20
    },
    introduct: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 4,
        height: 220
    },
    works: {
        marginLeft: 10,
        height: 90,
        width: 76
    }
});

