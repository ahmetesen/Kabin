import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { StyleSheet, View, Dimensions} from 'react-native';
import TextBlock from '../texts/TextBlock';
export default class CarouselContainer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {activeSlide:0}
    }
    _renderItem(item,index){
        return(
            <View style={styles.container}>
                <TextBlock big>
                    {item.item.title}
                </TextBlock>
                <TextBlock italic>
                    {item.item.description}
                </TextBlock>
            </View>
        );
    }

    get pagination () {
        const entries = this.props.entries;
        const activeSlide = this.state.activeSlide;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
              dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render(){
        return(
            <View>
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.entries}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                renderItem={this._renderItem}
                layout='default'
                itemWidth={vWidth - 60}
                sliderWidth={vWidth}
                />
                {this.pagination}
            </View>
        )
    }
}
const vWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});