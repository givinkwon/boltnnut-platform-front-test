import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import RequestCardContainer from './RequestCard';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import DetailQuestion from '../../stores/DetailQuestion';

const Qimage = "static/images/request/Step2/Q.png";

@inject('DetailQuestion')
@observer
class Step2Container extends React.Component {
  componentDidMount()
  {
    DetailQuestion.index=1;
  }


  content = () => {
    const { DetailQuestion } = this.props;
    console.log(DetailQuestion.SelectChecked)
    
    let test = (e,idx) => {
      if(DetailQuestion.SelectChecked===idx)
      {
        DetailQuestion.nextPage = null;
        DetailQuestion.SelectChecked=null;
      }
      else
      {
        DetailQuestion.SelectChecked=idx;
        DetailQuestion.nextPage = e.nextTitle;
      }
    };

    
    let activeHandler=(idx) =>
    {
      if(idx==DetailQuestion.SelectChecked)
      {
        return true;
      }
      else
      {
        return false;
      }
    };

    return (
      <>
        <TitleContainer>
          <img src={ Qimage }/>
          {DetailQuestion.title_list.results &&<TitleQue>{DetailQuestion.title_list.results[DetailQuestion.index-1].question}&nbsp;&nbsp;&nbsp;&nbsp;{DetailQuestion.pageCount + 1}/5</TitleQue>}
        </TitleContainer>
        <SelectContainer>
          <input value = {DetailQuestion.SelectChecked} class="Input" />
          {
            DetailQuestion.select.data && DetailQuestion.select.data.map((data,idx) => {
              return (
                <>
                  <Select onClick = {()=>{test(data,idx)}} active={activeHandler(idx)}>
                    <Text id={'queText'} color={"#282c36"}>
                      {data.select}
                    </Text>
                  </Select>
                </>
              )}
            )
          }

        </SelectContainer>
      </>
    );
  }

  render(){
    const content = this.content();

    return (
      <RequestCardContainer title={"제품 정보 선택"} content = { content }>
      </RequestCardContainer>
    );
  }
}

export default Step2Container;



const TitleContainer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TitleQue = styled(Title.FontSize24)`
  font-weight: bold;
  letter-spacing: -0.6px;
  color: #282c36;
  display: inline;
  margin-left: 10px;
`
const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 33px;
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
  border: 0;

  border: ${(props) => (props.active ? 'solid 2px #0933b3' : 'none')};

  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }

  // &:focus {
  //   border: solid 2px #0933b3;
  //   box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  // }
`