import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";
import NewButton from '../../components/NewButton';
import LogoSlider from "./LogoImageSlider";

//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";




@inject('Request')
@observer
class RequestCardContainer extends Component {
  state = {
    percentage: 40,
    buttonActiveCount: 0,
    targets: null,
    active: false
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

    componentDidMount() {
      this.setState({...this.state, buttonActiveCount: document.getElementsByClassName("Input").length, 
      targets: document.getElementsByClassName("Input")}
      );
    }

    componentDidUpdate() {
      const { targets,active } = this.state;
      if (this.fullChecker(targets) == true && active == false) {
        this.setState({...this.state, active: true})
      };
    }

    fullChecker(data) {
      const { buttonActiveCount } = this.state;
      let counter = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].value.length != 0) {
          counter += 1
        }
      }
      if (counter == buttonActiveCount) {
        return true
      } else {
        return false
      };
    }

    render() {
      const {percentage, active} = this.state;

      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
              {this.props.content}
            </ContentBox>
            <SliderText>5가지 질문만 완성해주면 가견적이 나옵니다!</SliderText>
            <CustomSlider value={percentage}/>
            <ThumbText> {percentage}% </ThumbText>
            
            <LogoSlider/>
            <MatchingText>요청하신 000 제품 개발에 최적화된 제조 파트너사를 매칭중입니다.</MatchingText>
            <ButtonContainer>
              <NewButton color={"#282c36"}>이전</NewButton>
              <NewButton active={ active }> 다음 </NewButton>
            </ButtonContainer>
          </Card>
        )
    }
}

export default withRouter(RequestCardContainer);


const Card = styled.div`
  width: 894px;
  height: 1002px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
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
  display: flex;
  flex-direction: column;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 7,
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
    borderRadius: 10,
    cursor:'default'
    },
  thumb: {
    // top: -10,
    // paddingRight: 20,
    // content: "apapap"
    display:'none'
  },
  track: {
    height: 7,
    borderRadius: 10,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 7,
    borderRadius: 10,
  },
})(Slider);

const ThumbText = styled(Content.FontSize18)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
`

const SliderText = styled(Content.FontSize16)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
`

const MatchingText = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #282c36;
  margin: 0px 176px;
`
const ButtonContainer = styled.div`
  width: 260px;
  // height: 44px;
  margin: 70px 317px 60px 317px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
