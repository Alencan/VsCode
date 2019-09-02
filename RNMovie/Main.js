import React, {Component} from 'react';
//路由要用的相关组件
import { Router, Stack, Scene} from 'react-native-router-flux'
//需要路由的组件
import App from './App.js';
import MovieDetail from './components/movie/MovieDetail.js'
import MovieList from './components/movie/MovieList.js'
import MovieListing from './components/movie/MovieListing.js'
import ActorDetail from './components/movie/ActorDetail.js'
import Prevideo from './components/movie/Prevideo.js'
import Morejz from './components/movie/Morejz.js'
import TopList from './components/movie/TopList.js'
import NewList from './components/movie/NewList.js'
import WeekList from './components/movie/WeekList.js'
import UsList from './components/movie/UsList.js'
import Mylike from './components/movie/Mylike.js'
import Myaddress from './components/movie/Myaddress.js'
import Mywechat from './components/movie/Mywechat.js'
import Mypublic from './components/movie/Mypublic.js'
import Myskill from './components/movie/Myskill.js'
export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {} 
    }

    render() {
        return <Router sceneStyle={{backgroundColor: "white"}}>
            <Stack key="root" headerLayoutPreset="center">
                <Scene key="app" component={App} title="主页" hideNavBar={true}></Scene>
                <Scene key="movieDetail" component={MovieDetail} title="影片详情" hideNavBar={true}></Scene>
                <Scene key="movieListWill" component={MovieList} title="即将上映电影" titleStyle={{fontSize:16}}></Scene>
                <Scene key="movieListing" component={MovieListing} title="影院热映电影" titleStyle={{fontSize:16}}></Scene>
                <Scene key="actorDetail" component={ActorDetail} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="goprevideo" component={Prevideo} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="morejz" component={Morejz} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="toplist" component={TopList} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="newlist" component={NewList} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="weeklist" component={WeekList} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="uslist" component={UsList} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="mylike" component={Mylike}  title="收藏列表"></Scene>
                <Scene key="myaddress" component={Myaddress} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="mywechat" component={Mywechat} hideNavBar={true} titleStyle={{fontSize:16}}></Scene> 
                <Scene key="mypublic" component={Mypublic} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
                <Scene key="myskill" component={Myskill} hideNavBar={true} titleStyle={{fontSize:16}}></Scene>
            </Stack>
        </Router>
    }
} 

