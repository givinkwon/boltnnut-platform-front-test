import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import * as Content from 'components/Content'
import { inject, observer } from 'mobx-react';

@inject('Request')
@observer
class ConsultantBoxContainer extends React.Component {
  render(){
  const { Info } = this.props;

  return (
      <>
        <ConsultantBox>
            <ConsultantImgBox>
            <img src={Info.Img}/>
            <Font18>{Info.Name}</Font18>
            <Font14 style={{color:'#0933b3',fontWeight:500}}>{Info.Job}</Font14>
            </ConsultantImgBox>
            <div style={{height:120,width:2,backgroundColor:'#c6c7cc',marginTop:53}}/>
            <ConsultantTextBox>
                <Font16>{Info.Text1}</Font16>
                <Font14>{Info.Text2}</Font14>
                <Font15>{Info.Text3}</Font15>
            </ConsultantTextBox>
        </ConsultantBox>
      </>
    )
  }
}

export default ConsultantBoxContainer;

const ConsultantBox = styled.div`
  width:727px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin:0 auto;
  margin-top:20px;
  display:flex;
`

const ConsultantImgBox = styled.div`
  display:inline-flex;
  flex-direction:column;
  align-items:center;
  padding:34px 36px 13px 40px;
`

const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  flex-direction:column;
  margin-left:36px;
  // margin-top:31px;
  justify-content:center;
`

const Font14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.14;
  letter-spacing: -0.14px;
  color: #999999;
`

const Font15 = styled(Content.FontSize15)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.15px;
  color: #414550;
  white-space: pre-line;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
`

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
`