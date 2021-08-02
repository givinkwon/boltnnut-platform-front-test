import React from 'react'
import styled from "styled-components";
import * as Text from "components/Text";
 
class DisbursementContainer extends React.Component{
    render(){
        return (
            <div>
                <Font26>결제 정보 입력</Font26>
                <PaymentContainer>                
                    <Orderer>
                        <div>
                            <span>주문자 정보</span>
                        </div>           
                        <Name>

                        </Name>
                        <Phone>

                        </Phone>             
                        <Address>

                        </Address>
                        <Method>

                        </Method>
                    </Orderer>
                    <PaymentInfo>
                    </PaymentInfo>
                </PaymentContainer>
            </div>
        )
    }
}

export default DisbursementContainer


const Font26 = styled(Text.FontSize26)`
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal  !important;
  line-height: 40px !important;
  letter-spacing: -0.65px !important;
  color: #414550;  
`

const PaymentContainer = styled.div`
    width: 1200px;
    height: 600px;
    border: 3px solid red;
    display: flex;
    justify-content: space-around;
`
const Orderer = styled.div`
    border: 3px solid blue;
    width: 588px;
    >div:nth-of-type(1){
        width: 100%;
        height: 95px;
        background-color: #f6f6f6;
        padding: 49px 0 10px 4px;
        box-sizing: border-box;
        border-bottom: 1px solid #c6c7cc;
        >span{
            font-size: 24px;
            line-height: 40px;
            letter-spacing: -0.6px;
            color: #282c36;
        }
    }
`

const PaymentInfo = styled.div`
    border: 3px solid green;
    width: 588px;
`
const Name = styled.div`
 
`
const Phone = styled.div`
 
`
const Address = styled.div`
 
`
const Method = styled.div`
 
`