import React, { ReactElement, Component } from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { StyleSheet, View, Dimensions} from 'react-native';
import TextBlock from '../texts/text-block';
type Props = {
    entries:Array<{title:string,description:string,icon:ReactElement}>;
}
type State = {
    activeSlide:number;
}
export default class CarouselContainer extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {activeSlide:0}
    }
    _renderItem=(obj:any):ReactElement=>{
        return(
            <View style={styles.container}>
                <TextBlock big bold>
                    {obj.item.title}
                </TextBlock>
                <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
                    {obj.item.icon}
                    <TextBlock>
                        {obj.item.description}
                    </TextBlock>
                </View>
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
              dotStyle={{
                  width: 6,
                  height: 6,
                  padding:0,
                  borderRadius: 3,
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
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    <Carousel
                        style={{justifyContent:'center'}}
                        layout={"default"}
                        ref={(ref:any) => this._carousel = ref}
                        data={this.props.entries}
                        renderItem={this._renderItem}
                        itemWidth={vWidth-64}
                        sliderWidth={vWidth-32}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                </View>
                <View>
                    {this.pagination}
                </View>
            </View>
        )
    }
}
const vWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-start',
        alignItems: 'center',
    },
});