import React, {Component} from 'react';
import styled from "styled-components";
import * as Title from "components/Title";

class SliderMain extends React.Component {
  render() {
    const { item } = this.props;
    const mac = 'static/Images/Home/Banner6/Mac.png';
    const pic = 'static/Images/Home/Banner6/pic.png';
    return (
      <SliderContent>
        <div style={{marginTop: 50,}}>
          <Head style={{whiteSpace:'pre-line'}}>
            {item.headContent}
          </Head>
          <Main style={{whiteSpace:'pre-line'}}>
            {item.mainContent}
          </Main>
          <Foot style={{whiteSpace:'pre-line'}}>
            {item.footContent}
          </Foot>
        </div>
        <ImageContainer>
          <img src={ mac } style={{ position: 'absolute'}}/>
          <img src={ pic } style={{ position: 'absolute', top: '10px', left:'60px'}}/>
        </ImageContainer>
      </SliderContent>
    );
  }
}

export default SliderMain;

const SliderContent = styled.div`
  width: 1065px;
  height: 390px;
  display: flex;
  flex-direction: row;
  margin: 107px 13px 112px 58px;
`
const Head = styled(Title.FontSize24)`
  color: #0933b3;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
;
`
const Main = styled(Title.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: left;
  color: #333742;
  margin: 10px 0px 30px 0px;
`
const Foot = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #f6f6f6;
`
const ImageContainer = styled.div`
  position: relative;
`
