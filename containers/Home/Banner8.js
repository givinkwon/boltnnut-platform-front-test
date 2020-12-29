import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";

const image1 = "/static/images/Home/Banner8/Banner8_img1.png"

class Banner8Container extends React.Component {
    render() {
        return (
            <Background src={image1} style={{backgroundPosition:'0% 60%'}}>
                <Layer>
                    <Containerv1 style={{paddingBottom: 80, paddingTop: 60, justifyContent: 'center'}}>
                        <div>
                            <Header>
                                이미 2,000여명이 넘는 클라이언트분들이<br/>
                                볼트앤너트를 이용하셨습니다.
                            </Header>
                            <Buttonv1 style={{margin:'0 auto', marginTop: 50}}>
                                무료 가견적 받기
                            </Buttonv1>
                        </div>
                    </Containerv1>
                </Layer>

            </Background>
        );
    }
}

export default Banner8Container;

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