import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import Router from "next/router";

const image1 = "/static/images/Home/Banner9/Banner9_img1.png"

class Banner9Container extends React.Component {
  render() {
    return (
      <Background src={image1} style={{backgroundPosition:'0% 60%'}}>
        <Layer>
          <Containerv1 style={{paddingBottom: 80, paddingTop: 60, justifyContent: 'center'}}>
            <Fade bottom>
              <div>
                <Font24>
                  내 제조 의뢰 견적과 <br/>
                  전문 제조사를 바로 만나보세요.
                </Font24>
                <Buttonv1 style={{height: 76, width: 308, margin:'0 auto', marginTop: 50}} onClick={() => Router.push("/request")}>
                  <Font24>지금 무료 가견적 받기</Font24>
                </Buttonv1>
              </div>
            </Fade>
          </Containerv1>
        </Layer>

      </Background>
    );
  }
}

export default Banner9Container;


const Font24 = styled(Content.FontSize24)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align:center;
  margin:0 auto;
`


const Layer=styled.div`
  background-color: rgba(0, 0, 0, 0.67);
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
`
