import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react';
import * as Title from 'components/Title';
import 'intersection-observer';
import DetailQuestion from '../../../stores/DetailQuestion';
import MobileProductInfoContainer from '../../Request/Mobile/MobileProductInfo';
import MobileRequestCardContainer from '../Mobile/MobileRequestCard';

const Qimage = "/static/images/request/Step2/MobileQ.png";
const fileImage = '/static/images/components/Input2/Mask.png';

@inject('DetailQuestion', 'Request', 'ManufactureProcess')
@observer
class MobileStep2Container extends React.Component {
  onChangeFile = (e,data,idx) => {
    const {Request}  = this.props;
    let fileName;
    if (e.currentTarget.files[0]) {
      fileName = e.currentTarget.files[0].name;
      Request.setDrawFile(e.currentTarget.files[0]);
      DetailQuestion.SelectChecked = idx;
      DetailQuestion.nextPage = data.nextTitle;
    } else {
      fileName = null;
      Request.setDrawFile(null);
      DetailQuestion.SelectChecked = '';
      DetailQuestion.nextPage = data.nextTitle;
    }

    this.setState({
      ...this.state,
      fileName: fileName,
    })
  }
  state = {
    fileName: '',
  };
  componentDidMount()
  {
    if(DetailQuestion.select)
      DetailQuestion.index=1;
    DetailQuestion.pageCount=0;
  }
  content = () => {
    const { DetailQuestion, Request, ManufactureProcess } = this.props;

    let test = (e,idx) => {
      if(DetailQuestion.SelectChecked===idx)
      {
        DetailQuestion.nextPage = null;
        DetailQuestion.SelectChecked='';
        DetailQuestion.SelectId = null;
      }
      else
      {
        DetailQuestion.SelectChecked=idx;
        DetailQuestion.nextPage = e.nextTitle;
        DetailQuestion.SelectId = e.id;
        Request.drawFile = null;
      }
    };

    let fileActiveHandler=(idx)=>{
      if (Request.drawFile) {
        return true;
      } else {
        return false;
      }
    }

    let activeHandler=(idx) =>
    {
      // console.log(idx===DetailQuestion.SelectChecked)
      if(idx===DetailQuestion.SelectChecked)
      { return true; } 
      else
      { 
        return false; }
    };
    return (
      <>
        <TitleContainer>
          <img src={ Qimage }/>
          {/* Array 문제로 DetailQuestion 형식 고쳤음. */}
          <TitleQue>{DetailQuestion.title_list[DetailQuestion.index-1] && DetailQuestion.title_list[DetailQuestion.index-1].question}</TitleQue>
        </TitleContainer>
        <input value={DetailQuestion.index<8 ? DetailQuestion.SelectChecked : ManufactureProcess.SelectChecked} class="Input" style={{display:'none'}}/>
        <SelectContainer index={DetailQuestion.index}>
          {
            (DetailQuestion.select.data && DetailQuestion.index<8)&& DetailQuestion.select.data.map((data,idx) => {
              return (
                <div>
                  {
                    DetailQuestion.index == 4 &&
                    <>
                      <FileSelect active={fileActiveHandler(1)}
                                  onClick = {() =>
                                    document.getElementById("FileInput").click()
                                  }
                      >
                        <Text id={'queText'} color={"#282c36"}>
                          { Request.drawFile ? this.state.fileName : "파일을 선택해 주세요." }
                        </Text>
                        <img src={fileImage} />
                        <input
                          id="FileInput"
                          type="file"
                          style={{display: 'none'}}
                          onChange={(e) => this.onChangeFile(e,{nextTitle:8}, 1)}
                          // onClick={(event) => fileSelector({nextTitle: 8}, 1)}
                        />
                      </FileSelect>
                    </>
                  }

                  <Select onClick = {()=>{test(data,idx)}} active={activeHandler(idx)}>
                    <Text id={'queText'} color={"#282c36"}>
                      {data.select}
                    </Text>
                  </Select>
                </div>
              )}
            )
          }
          {DetailQuestion.index===8 && <MobileProductInfoContainer updater={this.props.ManufactureProcess.SelectChecked}/>}
        </SelectContainer>
      </>
    );
  }

  render(){
    const content = this.content();
    return (
      <MobileRequestCardContainer title={"제품 정보 선택 " + (DetailQuestion.pageCount + 1) + "/5"} content = { content }>
      </MobileRequestCardContainer>
    );
  }
}

export default MobileStep2Container;



const TitleContainer = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  display: inline-flex;
  justify-content: center;
`
const TitleQue = styled(Title.FontSize24)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 17px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #282c36;
    display: inline;
    margin-left: 10px;
  }
`
const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  height: ${(props) => (props.index==8 ? "auto" : '374px')};
  flex-direction: column;
  display: flex;
  align-items: center;
`
const Text = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: ${(props) => (props.color ? props.color : '#282c36')};
  margin-left: 10px;
  
  
`
const Select = styled.button`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};
  // &:hover {
  //   border: solid 2px #0933b3;
  //   box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  // }
  > input {
    width: 100%;
    height: 100%;
  }
  > img {
    margin-left: 10px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 347px;
    height: 40px;
    //padding: 10px 152px 10px 8px;
    object-fit: contain;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }
`
const FileSelect = styled.div`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};
  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
  > input {
    width: 100%;
    height: 100%;
  }
  > img {
    margin-left: 10px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 40px;
  }
`