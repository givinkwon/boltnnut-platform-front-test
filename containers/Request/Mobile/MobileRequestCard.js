import React, {Component} from "react";
import styled, { keyframes } from 'styled-components';
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";
import NewButton from 'components/NewButton';
import MobileLogoImageSlider from './MobileLogoImageSlider';
import * as DetailQuestionApi from "axios/DetailQuestion";
import DetailQuestion from "stores/DetailQuestion";

//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import MobileStepContainer from '../../../components/MobileStep';

import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
var titleData=[];

@inject('Request', 'DetailQuestion','ManufactureProcess')
@observer
class MobileRequestCardContainer extends Component {
  state = {
    percentage: 0,
    buttonActiveCount: 0,
    targets: null,
    active: false
  }

  // handleChange = (event, newValue) => {
  //   this.setState({percentage: newValue})
  // }

  CustomSliderThumbComponent = (props) => {
    const { Request } = this.props;
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {Request.percentage}% </ThumbText>
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
    // console.log(this.state);
    if (this.fullChecker(targets) == true && active == false) {
      this.setState({...this.state, active: true})
    } else if (this.fullChecker(targets) == false && active == true) {
      this.setState({...this.state, active: false})
    };
  }

  fullChecker(data) {
    const { buttonActiveCount, active } = this.state;
    let counter = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].value.length != 0) {
        counter += 1
      }
    }
    // console.log(counter);
    if (counter == buttonActiveCount) {
      return true
    } else {
      return false
    };
  }

  prevButtonClick = () => {
    const { Request, DetailQuestion } = this.props;
    window.scrollTo(0, 0)
    switch (Request.step_index) {
      case 1:
        if (Request.step1_index == 2) {
          Request.step1_index = 1;
          Request.percentage -= 15;
        }
        break;
      case 2:
        Request.titleData.pop();

        if (DetailQuestion.prevPage.length > 0)
        {
            DetailQuestion.pageCount -= 1;
            if (DetailQuestion.prevPage[DetailQuestion.prevPage.length-1] == 4) {
              DetailQuestion.pageCount += 1;
            }

          DetailQuestion.index = DetailQuestion.prevPage.pop();
          DetailQuestion.loadSelectFromTitle(DetailQuestion.index);
          Request.percentage -= 14;
        }
        else {
          Request.step_index = 1;
          Request.percentage -= 15;
        }
        break;

    }
  }
  nextButtonClick = () => {
    const { Request, DetailQuestion,ManufactureProcess } = this.props;
    window.scrollTo(0, 0)

    switch(Request.step_index)
    {
      case 1:
        if (Request.step1_index == 1) {
          Request.step1_index = 2;
          Request.percentage += 15;
        } else {
          try {
            Request.createRequest();
            dataLayer.push({'event':'Step1Complete'});

            DetailQuestion.index=1; //여기서 1로 초기화해주는 이유는 밑에 prev버튼 조건 때문
          } catch(e) {
            console.log(e);
          }
          }
        break;
      case 2:
        if(DetailQuestion.nextPage)
        {
          if(DetailQuestion.index!=4 || DetailQuestion.nextPage==8)
          {
            DetailQuestion.pageCount += 1;
          }
          Request.titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});
          DetailQuestion.prevPage.push(DetailQuestion.index);
          DetailQuestion.index = DetailQuestion.nextPage;
          DetailQuestion.nextPage=null;
          DetailQuestion.SelectChecked='';

          DetailQuestion.loadSelectFromTitle(DetailQuestion.index);
        }
        else {
          Request.titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});

          // console.log(Request.drawFile);
          if(DetailQuestion.index==8)
          {
            const ManufactureProcessFormData = new FormData();
            ManufactureProcessFormData.append("blueprint",Request.drawFile);
            ManufactureProcessFormData.append("process",ManufactureProcess.SelectedItem.process);
            ManufactureProcessFormData.append("detailProcess",ManufactureProcess.SelectedItem.id);
            //기본정보입력에서 받은 의뢰서로 바꾸기
            ManufactureProcessFormData.append("request",Request.created_request);
            ManufactureProcess.saveSelect(ManufactureProcessFormData);
            Request.titleData= Request.titleData.slice(0,3);
          }

          var SelectSaveData = {
            "request": Request.created_request,
            "data": Request.titleData,
          }
          DetailQuestion.loadProposalType(SelectSaveData);
          dataLayer.push({'event':'Step2Complete'});
          // 제품 및 용품이 아닌 경우 && 도면이 아닌 경우
          if(Request.maincategory_id != 1 && DetailQuestion.index != 8){
            Request.step_index = 6;
            break;
          }
          // 도면에서 카테고리가 실리콘/플라스틱이 아닌 경우

          Request.step_index = 3;
        }
        Request.percentage += 14;
        break;
    }
  }
  countCalc () {
    const { Request} = this.props;
    let result = 4997
    //console.log(Request.select_big, Request.select_mid, Request.select_small)

    if(Request.select_big != null && Request.select_mid == null){
        result = Request.select_big.id === 0 ?  4997 : 460 * (((Request.select_big.id)/5) + 4)
    }
    if(Request.select_big != null && Request.select_mid != null){
        result = Request.select_big.id === 0 ?  4997 : 460 * (((Request.select_big.id)/5) + 4) - 260* ((Request.select_mid.id/50) + 5)
    }
    return result
  }

  render() {
    const { active } = this.state;
    const { Request, DetailQuestion } = this.props;
    // console.log(this.props.title)
    const countSettings1 = {
      start: 0,
      count : this.countCalc(),
      duration: 6000,
      decimals: 0,
      useGroup: true,
      animation: 'up',
      width: 100
    };
    return(
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <Header>
          <span>{this.props.title}</span>
          <MobileStepContainer/>
        </Header>
        <CustomSlider value={Request.percentage}/>
        <ContentBox>
          {this.props.content}
        </ContentBox>
      <MatchingText>해당 의뢰에 적합한 <span><AnimationCount {...countSettings1}/>&nbsp;개의 볼트앤너트 파트너사가 있습니다.</span></MatchingText>
        <MobileLogoImageSlider/>
        {this.props.title == "기본 정보 입력 1/2" ? (<SliderText>의뢰에 대해 이해할 수 있도록 기본 정보를 입력해주세요</SliderText>) : (<SliderText>5가지 질문만 완성해주면 가견적이 나옵니다!</SliderText>)}
         <ButtonContainer>
          <NewButton active={ Request.step1_index!=1 && DetailQuestion.index!=1 } type={1} onClick={ this.prevButtonClick }>이전</NewButton>
          <div style={{marginRight: 14}} />
          <NewButton active={ active } type={2} onClick={ this.nextButtonClick }>다음</NewButton>
        </ButtonContainer>
    </div>
    )
  }
}

export default withRouter(MobileRequestCardContainer);

const Header = styled.div`
  font-family: Roboto;
  color: #0a2165;
  position: relative;
  font-size: 16px;
  width: auto;
  height: 46px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: -0.4px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const ContentBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 4,
    width: '100%',
    borderRadius: 50,
    cursor:'default',
    position: "absolute",
    left: 0,
    paddingTop: 46,
    paddingBottom: 0
  },
  thumb: {
    display:'none'
  },
  track: {
    height: 4,
    borderTopRightRadius:5,
    borderBottomRightRadius:5
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 4,
    borderRadius: 0,
  },
})(Slider);

const ThumbText = styled(Title.FontSize20)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
`

const boxFade = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`
const SliderText = styled(Content.FontSize13)`
  position: relative;
  height: 19px;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  animation: ${ boxFade } 2s linear infinite;
`

const MatchingText = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  text-align: center;
  color: #282c36;
  display: flex;
  flex-direction: column;
  > span {
    color: #282c36;
    display: inline-flex;
    > div {
      font-weight: 900;
      color: #0933b3;
    }
  }
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 120px;
`
