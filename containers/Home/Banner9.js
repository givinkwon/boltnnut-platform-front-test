import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
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
                <Font32>
                  제조 발주를 위한 업체 검색<br/><br/> 볼트앤너트에서 가능합니다.
                </Font32>
                <Buttonv1
                  style={{
                    height: 76,
                    width: 308,
                    margin: "0 auto",
                    marginTop: 55,
                  }}
                  onClick={() => Router.push("/login")}
                >
                  <Font24>업체 검색하러 가기</Font24>
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

const Header = styled(Title.FontSize32)`
  color: #ffffff;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.8px;
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

const Font32 = styled(Title.FontSize32)`
  font-weight: bold;
  color: white;
`;

const Font24 = styled(Title.FontSize24)`
  font-weight: bold;
  color: white;
`;
