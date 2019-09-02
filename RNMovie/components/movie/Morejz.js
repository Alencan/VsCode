import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    FlatList
} from 'react-native';



export default class Morejz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        }
    }

    render() {
        return <FlatList
            data={this.state.photos}
            keyExtractor={(item, i) => i}
            renderItem={({ item }) => this.renderItem(item)}
            numColumns={3}
            columnWrapperStyle={{ flexWrap: "wrap", justifyContent: 'space-around', marginBottom: 5 }}
        />
    }

    renderItem = (item) => {
        return <View style={styles.nowplayingItem}>
            <Image source={{ uri: item.thumb }} style={{ width: '100%', height: "100%" }}></Image>
        </View>
    }

    componentDidMount() {
        this.getMorejz();
    }

    getMorejz() {
        const url = `http://api.douban.com/v2/movie/subject/${this.props.id}/photos?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        fetch(url)
            .then(res => res.json())
            .then(({ photos }) => {
                this.setState({
                    photos: photos
                })
            })
    }
}

const styles = StyleSheet.create({
    nowplayingItem: {
        height: 100,
        width: 100,
    }
})


