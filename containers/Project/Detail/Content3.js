import React from "react";
import styled from 'styled-components';
import * as Content from "components/Content";
import * as Title from 'components/Title';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';

class Content3 extends React.Component{
  render(){
    return(
      <Background style = {{backgroundColor: '#f6f6f6', paddingTop: 70, paddingBottom: 200}}>
        <Containerv1 style = {{display: 'flex', flexDirection: 'column'}}>
        <Font22 style = {{marginBottom: 40}}>비슷한 다른 프로젝트</Font22>
        <div style = {{width: 987, height: 228, backgroundColor: "#ffffff", marginBottom: 32}}></div>
        <div style = {{width: 987, height: 228, backgroundColor: "#ffffff"}}></div>
        </Containerv1>
      </Background>
    )
  }
}
export default Content3;

const Container4 = styled.div`

  width: 100%;
  height: 1091px;
`

const Font22 = styled(Content.FontSize22)`
line-height: 1.5;
font-weight: bold;
letter-spacing: -0.55px !important;
color: #282c36;
`