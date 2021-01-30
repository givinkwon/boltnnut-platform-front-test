import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";
import NewButton from '../../components/NewButton';
import LogoSlider from "./LogoImageSlider";
import * as DetailQuestionApi from "axios/DetailQuestion";
import * as ManufactureProcessApi from "axios/ManufactureProcess";
import DetailQuestion from "../../stores/DetailQuestion";

//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
var titleData=[];

@inject('Request', 'DetailQuestion','ManufactureProcess')
@observer
class RequestCardContainer extends Component {
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
    if (counter == buttonActiveCount) {
      return true
    } else {
      return false
    };
  }

  prevButtonClick = () => {
    const { Request, DetailQuestion } = this.props;

    switch (Request.step_index) {
      case 1:
        if (Request.step1_index == 2) {
          Request.step1_index = 1;
          Request.percentage -= 15;
        }
        break;
      case 2:
        titleData.pop();
        console.log(titleData);

        if (DetailQuestion.prevPage.length > 0)
        {
          if (DetailQuestion.index != 4)
          {
            DetailQuestion.pageCount -= 1;
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

    switch(Request.step_index)
    {
      case 1:
        if (Request.step1_index == 1) {
          Request.step1_index = 2;
          Request.percentage += 15;
        } else {
          try {
            Request.createRequest();
            Request.step_index = 2;
            Request.percentage += 15;
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
          titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});
          DetailQuestion.prevPage.push(DetailQuestion.index);
          DetailQuestion.index = DetailQuestion.nextPage;
          DetailQuestion.nextPage=null;
          DetailQuestion.SelectChecked='';
          
          console.log(titleData);
          DetailQuestion.loadSelectFromTitle(DetailQuestion.index);
        }
        else {
          titleData.push({"title_id":DetailQuestion.index,"title_select":DetailQuestion.SelectId});
          
          // console.log(Request.drawFile);
          if(DetailQuestion.index==8)
          {
            const ManufactureProcessFormData = new FormData();
            ManufactureProcessFormData.append("blueprint",Request.drawFile);
            ManufactureProcessFormData.append("process",ManufactureProcess.SelectedItem.process);
            ManufactureProcessFormData.append("detailProcess",ManufactureProcess.SelectedItem.id);
            //기본정보입력에서 받은 의뢰서로 바꾸기
            ManufactureProcessFormData.append("request",360);
            ManufactureProcessApi.saveSelect(ManufactureProcessFormData);
            titleData= titleData.slice(0,3);
          }
          console.log(titleData);
          var SelectSaveData = {
            "request": Request.created_request,
            "data": titleData,
          }
          DetailQuestionApi.saveSelect(SelectSaveData);
          Request.step_index = 3;
        }
        Request.percentage += 14;
        break;
    }
  }
  render() {
    const { active } = this.state;
    const { Request, DetailQuestion } = this.props;
    return(
      <Card>
        <Header>
          {this.props.title}
        </Header>
        <ContentBox>
          {this.props.content}
        </ContentBox>
        <MatchingText>요청하신 000 제품 개발에 최적화된 제조 파트너사를 매칭중입니다.</MatchingText>
        
        <LogoSlider/>
        <ThumbText> {Request.percentage}% </ThumbText>
        <CustomSlider value={Request.percentage}/>
        <SliderText>5가지 질문만 완성해주면 가견적이 나옵니다!</SliderText>
        <ButtonContainer>
          <NewButton active={ Request.step1_index!=1 && DetailQuestion.index!=1 } onClick={ this.prevButtonClick }>이전</NewButton>
          <NewButton active={ active } onClick={ this.nextButtonClick }>다음</NewButton>
          {/* <NewButton active={ true } onClick={ this.nextButtonClick }>다음</NewButton> */}
        </ButtonContainer>
      </Card>
    )
  }
}

export default withRouter(RequestCardContainer);


const Card = styled.div`
  width: 894px;
  // height: 1002px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  margin-left: 280px;
  margin-top: 60px;
  margin-bottom: 200px;
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
  // height: calc(46.3%);
  
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
    width: '76%',
    marginLeft: '12%',
    marginRight: '12%',
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

const ThumbText = styled(Title.FontSize20)`
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
  text-align:center;
  margin-bottom:20px;
`
const ButtonContainer = styled.div`
  width: 260px;
  margin: 70px 317px 100px 317px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
