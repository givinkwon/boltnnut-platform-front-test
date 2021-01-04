import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";

//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Components
import * as Content from "components/Content";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";

class RequestCardContainer extends Component {
  state = {
    percentage: 40,
  }

handleChange = (event, newValue) => {
  this.setState({percentage: newValue})
}
CustomSliderThumbComponent = (props) => {
  const {percentage} = this.state;
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {percentage}% </ThumbText>
      </div>
      );
    }

    render() {
      const {percentage} = this.state;
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
              콘텐츠
            </ContentBox>
            <CustomSlider
              ThumbComponent={this.CustomSliderThumbComponent}
              value={percentage}
              onChange={this.handleChange}
            />
          </Card>
        )
    }
}

export default withRouter(RequestCardContainer);


const Card = styled.div`
  width: 894px;
  height: 1004px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
`
const Header = styled(Content.FontSize32)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 4%;
  border-bottom: solid 1px #707070;
  object-fit: contain;
`
const ContentBox = styled.div`
  height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 4%;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 12,
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
    borderRadius: 10,
    },
  thumb: {
    top: -10,
    paddingRight: 20,
    content: "apapap"
  },
  track: {
    height: 12,
    borderRadius: 10,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 12,
    borderRadius: 10,
  },
})(Slider);

const ThumbText = styled(Content.FontSize18)`
  position: absolute;
  color: white;
  top: -10px;
  font-weight: bold;
`