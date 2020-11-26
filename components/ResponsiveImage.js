import React, {Component, Fragment} from 'react'
import styled, {css} from 'styled-components'

const ROW = 1
const COLUMN = 2

class ResponsiveImage  extends Component {
   constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({target:img}) {
        this.setState({dimensions:{height:img.offsetHeight,
                                   width:img.offsetWidth}});
    }
    render(){
        const {src} = this.props;
        const {width, height} = this.state.dimensions;

        return (
        	<Fragment>
            <Image
            	onLoad={this.onImgLoad} 
            	direction={width > height ? ROW : COLUMN}
            	src={src}
            />
        	</Fragment>
       	);
    }
}

export default ResponsiveImage

const Image = styled.img`
	${
		props => props.direction === ROW ? 
			css`
				width: 100%;
				height: auto;
			` 
			: 
			css`
				width: auto;
				height: 100%;
			` 
	}; 
`
