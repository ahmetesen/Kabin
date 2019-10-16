import React, { ReactNode } from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { StyleSheet, View, Dimensions} from 'react-native';
import TextBlock from '../texts/TextBlock';
interface Props{
    entries:Array<{title:string,description:string,icon:ReactNode}>;
}
interface State{
    activeSlide:number;
}
export default class CarouselContainer extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {activeSlide:0}
    }
    _renderItem(obj:any):ReactNode{
        return(
            <View style={styles.container}>
                <TextBlock big bold>
                    {obj.item.title}
                </TextBlock>
                {obj.item.icon}
                <TextBlock>
                    {obj.item.description}
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
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  marginHorizontal: 0,
                  backgroundColor: '#FFFFFF'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    _carousel:any;
    render(){
        return(
            <View>
                <Carousel
                ref={(c:any) => { this._carousel = c; }}
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
        justifyContent: 'space-evenly'
    },
});