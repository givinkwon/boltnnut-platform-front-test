import React from 'react'
import styled from 'styled-components'

class ProposalCard extends React.Component {
	render() {
		return (
            <Card>
                <StepTag>
                    <span> 상담 진행 중 </span>
                    <div>
                    </div>
                </StepTag>
                <HeaderWrapper>
                    <Title>
                        실리콘 반려동물 샤워기
                    </Title>
                    <Content>
                        2021.02.02
                    </Content>
                </HeaderWrapper>
                <CategoryWrapper>
                    <SubTitle>
                        <span>카테고리</span>
                    </SubTitle>
                    <CategoryBox>
                        <span>제품 및 용품</span>
                    </CategoryBox>
                    <CategoryBox>
                        <span>제품 및 용품</span>
                    </CategoryBox>
                </CategoryWrapper>
                <FooterWrapper>
                    <div style={{display: 'inline-flex'}}>
                        <SubTitle>
                            희망개발기간
                        </SubTitle>
                        <Content>
                            90일
                        </Content>
                    </div>
                    <PriceTagBox>
                        <span class="tag1"> 가견적 </span>
                        <span class="tag2"> 4,000,000원 </span>
                    </PriceTagBox>
                </FooterWrapper>
            </Card>
		)
	}
}

export default ProposalCard

const StepTag = styled.div`
    width: 100px;
    height: 36px;
    position: absolute;
    background-color: #0933b3;
    top: 0;
    left: -12px;  
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
        position: absolute;
        width: 0px;
        height: 0px;
        left: 0;
        bottom: -7.2px;
        background-color: #0a2165;
        border-top: 9.1px solid #0933B2;
        border-bottom: 0px solid white;
        border-left: 12px solid white;
    } 
    > span {
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.88;
        letter-spacing: -0.16px;
    }
`
const Card = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    position: relative;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: var(--white);
    padding-top: 62px;
    padding-left: 32px;
    padding-bottom: 33px;
    padding-right: 49px;
`
const Title = styled.span`
    height: 36px;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    text-align: left;
    color: #282c36;
    white-space: nowrap;
`
const SubTitle = styled.span`
    height: 29px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: -0.5px;
    text-align: left;
    color: #282c36;
    padding-right: 16px;
    white-space: nowrap;
`
const HeaderWrapper = styled.div`
    width: 100%;
    margin-bottom: 27px;
    display: inline-flex;
`
const CategoryWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    width: 100%;
    margin-bottom: 13px;
`
const FooterWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    height: 29px;
    align-items: flex-end;
    justify-content: space-between;
`
const CategoryBox = styled.div`
    width: 110px;
    height: 30px;
    object-fit: contain;
    border-radius: 3px;
    background-color: #e1e2e4;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    > span {
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.88;
        letter-spacing: -0.16px;
        text-align: left;
        color: #282c36;
    }
`
const Content = styled.span`
    height: 24px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: -0.4px;
    text-align: left;
    color: #414550;
    padding-left: 20px;
    align-self: flex-end;
    white-space: nowrap;
`
const PriceTagBox = styled.div`
    display: inline-flex;
    align-items: flex-end;
    .tag1 {
        height: 29px;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: -0.5px;
        text-align: left;
        color: #282c36;
        padding-right: 20px;
    }
    .tag2 {
        display: flex;
        align-items: center;
        height: 29px;
        font-size: 30px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.73;
        letter-spacing: -0.75px;
        text-align: left;
        color: #282c36;
    }
`