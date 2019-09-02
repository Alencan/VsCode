import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
// import '../../tools/palette/getPalette.js';
// import '../../tools/palette/index.js';


export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isloading: true,
            moviedetail: [],
            genres: "",
            pubdates: "",
        }
    }

    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size='large'></ActivityIndicator>
        }
        return <View style={{ width: "100%" }}>
            <ScrollView>
                {/* 头 */}
                <View style={{ width: "100%" }}>
                    <View style={{ width: "100%", height: 180, backgroundColor: "red" }}>
                        <Image source={{ uri: this.state.moviedetail.photos && this.state.moviedetail.photos[0].image }} style={{ width: "100%", height: "100%" }}></Image>
                        <View style={styles.cover}>
                            <Image source={{ uri: this.state.moviedetail.images && this.state.moviedetail.images.large }} style={{ width: 100, height: 120, marginTop: 30, marginLeft: 10 }}></Image>
                            <Text style={{ fontSize: 18, color: "#fff", position: "absolute", top: 30, left: 115 }}>{this.state.moviedetail.title}</Text>
                            <Text style={{ fontSize: 13, color: "#fff", position: "absolute", top: 60, left: 115 }}>{this.state.moviedetail.original_title}({this.state.moviedetail.year})</Text>
                            <StarRating disabled={false} maxStars={5} starSize={10} containerStyle={{ width: 30, position: "absolute", top: 85, left: 115 }} fullStarColor="orange" rating={this.state.moviedetail.rating && this.state.moviedetail.rating.stars / 10} />
                            <Text style={{ position: "absolute", top: 83, left: 170, fontSize: 10, color: "#fff" }}>{this.state.moviedetail.rating && this.state.moviedetail.rating.average}</Text>
                            <View style={{ position: "absolute", top: 105, left: 115, width: 190, height: 75 }}>
                                <Text style={{ color: "#fff", fontSize: 10 }}>{this.state.moviedetail.countries}/{this.state.genres}/ 上映时间: {this.state.pubdates}/ 片长: {this.state.moviedetail.durations} / {this.state.moviedetail.directors && this.state.moviedetail.directors.map((item) => { return <Text key={item.name}>{item.name}</Text> })} / {this.state.moviedetail.casts && this.state.moviedetail.casts.map((item) => { return <Text key={item.name}> {item.name} </Text> })}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 体 */}
                <View style={{ width: "100%", backgroundColor: "#778899" }}>
                    {/* 所属频道 */}
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: "#fff" }}>所属频道</Text>
                        <ScrollView horizontal={true}>
                            {this.state.moviedetail.tags && this.state.moviedetail.tags.map((item) => {
                                return <View key={item} style={{ height: 20, paddingLeft: 5, paddingRight: 10, backgroundColor: "#696969", borderRadius: 10, flexWrap: "nowrap", marginRight: 10, marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: "#fff", flex: 2 }}> {item} </Text>
                                    <Icon name="angle-right" size={25} color="#fff" style={{ flex: 1, marginTop: -4 }} />
                                </View>
                            })}
                        </ScrollView>
                    </View>
                    {/* 简介 */}
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: "#fff" }}>简介</Text>
                        <ScrollView style={{ height: 80 }}>
                            <View ref="loadmore" style={{ marginTop: 10 }}>
                                <Text style={{ color: "#fff", fontSize: 12 }}>{this.state.moviedetail.summary}</Text>
                            </View>
                        </ScrollView>
                    </View>
                    {/* 演员 */}
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: "#fff" }}>演员</Text>
                        <ScrollView horizontal={true}>
                            {this.state.moviedetail.directors && this.state.moviedetail.directors.map((item) => {
                                return <TouchableOpacity onPress={() => { this.actorDetail(item) }}>
                                    <View key={item.id} style={{ width: 60, height: 80, borderRadius: 50, flexWrap: "nowrap", marginRight: 10, marginTop: 10 }}>
                                        <Image source={{ uri: item.avatars && item.avatars.large }} style={{ width: 60, height: 60, borderRadius: 50 }} ></Image>
                                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            })}
                            {this.state.moviedetail.casts && this.state.moviedetail.casts.map((item) => {
                                return <TouchableOpacity onPress={() => { this.actorDetail(item) }}>
                                    <View key={item.id} style={{ width: 60, height: 80, borderRadius: 50, flexWrap: "nowrap", marginRight: 10, marginTop: 10 }}>
                                        <Image source={{ uri: item.avatars && item.avatars.large }} style={{ width: 60, height: 60, borderRadius: 50 }} onPress={() => { this.actorDetail(item) }}></Image>
                                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 10 }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>
                    {/* 预告片/剧照 */}
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: "#fff" }}>预告片/剧照</Text>
                        <ScrollView horizontal={true}>
                            {this.state.moviedetail.trailers && this.state.moviedetail.trailers.map((item) => {
                                return <View key={item.id} style={{ width: 120, height: 80, borderRadius: 10, flexWrap: "nowrap", marginRight: 10, marginTop: 10 }}>
                                    <Image source={{ uri: item.medium }} style={{ width: 120, height: 80, borderRadius: 10 }}></Image>
                                    <Icon name="play-circle" size={25} color="#fff" style={{ position: "absolute", top: "35%", left: "40%", opacity: 0.5 }} onPress={() => { this.goprevideo(item) }} />
                                </View>
                            })}
                            {this.state.moviedetail.photos && this.state.moviedetail.photos.map((item) => {
                                return <View key={item.id} style={{ width: 120, height: 80, borderRadius: 10, flexWrap: "nowrap", marginRight: 10, marginTop: 10 }}>
                                    <Image source={{ uri: item.cover }} style={{ width: 120, height: 80, borderRadius: 10 }}></Image>
                                </View>
                            })}
                            <TouchableOpacity onPress={() => { this.gomorejz(this.props.id) }}>
                                <View style={{ width: 60, height: 80, borderRadius: 10, flexWrap: "nowrap", marginRight: 10, marginTop: 10, paddingTop: 25 }}>
                                    <Text style={{ color: "#fff", fontSize: 12 }}>查看更多</Text>
                                    <Icon name="chevron-right" size={10} color="#fff" style={{ position: "absolute", top: 27, right: 0 }} />
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    {/* 短评 */}
                    <View style={{ marginTop: 20, marginLeft: 10, marginRight: 20, width: "90%", marginLeft: "5%", marginBottom: 10, paddingTop: 10, paddingLeft: 10,paddingRight:10, backgroundColor: "#696969" }}>
                        <Text style={{ color: "#fff" }}>短评</Text>
                        {this.state.moviedetail.popular_comments && this.state.moviedetail.popular_comments.map((item) => {
                            return <View key={item.id} style={{ marginTop: 20, marginBottom: 10 }}>
                                <Image source={{ uri: item.author.avatar }} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>
                                <Text style={{ color: "#fff", position: "absolute", top: -5, left: 40 }}>{item.author.name}</Text>
                                <Text style={{ color: "#fff", position: "absolute", top: 10, left: 100 }}>{item.created_at.slice(0, 10)}</Text>
                                <StarRating containerStyle={{ width: 30, position: "absolute", top: 15, left: 40 }} disabled={false} rating={item.rating.value / 10} maxStars={5} starSize={10} emptyStarColor="#fff" emptyStar="star" fullStarColor="orange" />
                                <Text style={{ color: "#fff" }}>{item.content}</Text>
                                <Icon name="thumbs-up" size={15} color="#fff" />
                                <Text style={{ color: "#fff", marginTop: -18, marginLeft: 20 }}>{item.useful_count}</Text>
                                <View style={{ width: "100%", borderWidth: 1, borderColor: "#ccc", marginTop: 5}}></View>
                            </View>
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>



    }

    componentDidMount() {
        this.getMovieDetail();
    }
    //获取电影海报主题色
    getColor(url){
        // console.warn(url)
        // Palette.from(url).getPalette()
        // .then(colors=>{
        //     const chirldren = colors.reduce((prev,color)=>{
        //         const [r,g,b] = color.value
        //         console.warn([r,g,b])
        //     })
        // })
    }

    //获取影片详情
    getMovieDetail() {
        const url = `http://api.douban.com/v2/movie/subject/${this.props.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    moviedetail: data,
                    genres: data.genres&&data.genres.join("·"),
                    pubdates: data.pubdates&&data.pubdates.join("·"),
                    isloading: false,
                }
                // ,()=>{
                //     this.getColor(this.state.moviedetail.images.large)
                // }
                )
            })
    }

    //去看预告片
    goprevideo = (item) => {
        Actions.goprevideo({ url: item.resource_url });
    }

    //去演员详情
    actorDetail = (item) => {
        Actions.actorDetail({ id: item.id })
    }

    //更多剧照
    gomorejz = (id) => {
        Actions.morejz({ id: id })
    }
}


const styles = StyleSheet.create({
    cover: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        top: "0%",
        // borderRadius: 10,
        overflow: "hidden"
    }
});

