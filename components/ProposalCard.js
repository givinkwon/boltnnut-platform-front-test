import React from 'react'
import styled from 'styled-components'

class ProposalCard extends React.Component {
    state={
        width:null,
    }

      componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.setState({ ...this.state, width: window.innerWidth });
      }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      };
      updateDimensions = () => {
        this.setState({ ...this.state, width: window.innerWidth });
      };


	render() {        
        const {data} = this.props;
        const {width} = this.state;
        // console.log(this.props.data.request_set[0].name);
        let name=""
        let date=""
        let period=""
        let estimate=""

        if(data.request_set[0])
        {
            name = data.request_set[0].name;
            date = data.request_set[0].createdAt.substr(0, 10);
            period  = data.request_set[0].period + "일";
            estimate = data.request_set[0].price;
        }
        
        const consultation = this.props.data.status;
        
        // let { consultation, name, date, period, estimate } = this.props.data;
        // consultation = consultation ? consultation : "상담 미지정"
        // name = name ? name : "이름 없음"
        // date = date ? date.substr(0, 10) : "날짜 미지정"
        // period = period ? period : "기간 미지정"
        // estimate = estimate ? estimate : "미지정"
        
        //date = date.substr(0, 10);

        {console.log(width)}
		return (
            
            <>
            { width > 767.98 ? (
            <Card>
                { consultation === "완료" ? 
                    <StepTag style={{backgroundColor: '#999999'}}>                                
                        <span> {consultation} </span>                    
                        <div style={{borderTop: '9.1px solid #414550'}}></div>                                
                    </StepTag>                    
                    :
                    <StepTag>                                        
                        <span> {consultation} </span>                    
                        <div></div>                                
                    </StepTag>
                }
                    
                <HeaderWrapper>
                    <Title>
                        {name}
                    </Title>
                    <Content>
                        {date}
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
                        <span>반려 동물 용품</span>
                    </CategoryBox>
                </CategoryWrapper>
                <FooterWrapper>
                    <div style={{display: 'inline-flex'}}>
                        <SubTitle>
                            희망개발기간
                        </SubTitle>
                        <Content>
                            {period}
                        </Content>
                    </div>
                    <PriceTagBox>
                        <span class="tag1"> 가견적 </span>
                        <span class="tag2">{estimate}</span>
                    </PriceTagBox>
                </FooterWrapper>
            </Card>) : (

            
            <Card style={{backgroundColor: consultation ==="완료" ? '#f6f6f6' : 'var(--white)'}}>                 
                    <StepTag>                                
                        <span style={{color: consultation === "완료" ? '#767676' : '#0933b3'}}> {consultation} </span>                            
                    </StepTag>                    
                                                           
                <HeaderWrapper>
                    <Title>
                        {name}
                    </Title>
                </HeaderWrapper>
                
                <FooterWrapper>                    
                    <Content>
                        {date}
                    </Content>

                    <PriceTagBox>
                        <span class="tag1"> 가견적 </span>
                        <span class="tag2">{estimate}</span>
                    </PriceTagBox>
                </FooterWrapper>
            </Card>
            )}
            
            
            </>
        )
	}
}

export default ProposalCard

const StepTag = styled.div`
    @media (min-width: 0px) and (max-width: 767.98px) {
        > span {
            color: #0933b3;
            font-size: 13px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 34px;
            letter-spacing: -0.33px;
            margin-left: 14px;
            margin-top: 14px;
            margin-bottom: 8px;
            
            
        }

    }
      @media (min-width: 768px) and (max-width: 991.98px) {
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
            bottom: -7.9px;
            background-color: #0a2165;
            border-top: 9.1px solid #0933B2;
            border-bottom: 0px solid #f6f6f6;
            border-left: 12px solid #f6f6f6;
        } 
        > span {
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.88;
            letter-spacing: -0.16px;
        }
      }
      @media (min-width: 992px) and (max-width: 1299.98px) { 
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
            bottom: -7.9px;
            background-color: #0a2165;
            border-top: 9.1px solid #0933B2;
            border-bottom: 0px solid #f6f6f6;
            border-left: 12px solid #f6f6f6;
        } 
        > span {
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.88;
            letter-spacing: -0.16px;
        }
      }
      @media (min-width: 1300px) { 
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
            bottom: -7.9px;
            background-color: #0a2165;
            border-top: 9.1px solid #0933B2;
            border-bottom: 0px solid #f6f6f6;
            border-left: 12px solid #f6f6f6;
        } 
        > span {
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.88;
            letter-spacing: -0.16px;
        }
      }

`
const Card = styled.div`
    
    width: 100%;
    
    position: relative;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: var(--white);

    @media (min-width: 0px) and (max-width: 767.98px) {
        height: 108px;        
        padding-top: 14px;           
        padding-right: 14px;       
        margin-top: 14px;        
        padding-bottom: 8px; 
        box-sizing: border-box;
    }
      @media (min-width: 768px) and (max-width: 991.98px) {
        height: 100%;
        margin-top: 30px;
        padding-top: 62px;
        padding-left: 32px;
        padding-bottom: 33px;
        padding-right: 49px;
      }
      @media (min-width: 992px) and (max-width: 1299.98px) { 
        height: 100%;
        margin-top: 30px;
        padding-top: 62px;
        padding-left: 32px;
        padding-bottom: 33px;
        padding-right: 49px;
      }
      @media (min-width: 1300px) { 
        height: 100%;
        margin-top: 30px;
        padding-top: 62px;
        padding-left: 32px;
        padding-bottom: 33px;
        padding-right: 49px;
      }
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
    @media (min-width: 0px) and (max-width: 767.98px) {        
        padding-left: 14px;     
        font-size: 15px;
        height: 22px;
        line-height: 15px;
        letter-spacing: -0.38px;
    }

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
    @media (min-width: 0px) and (max-width: 767.98px) {        
        margin-bottom: 0px;
        box-sizing: border-box;
    }
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
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: -0.4px;
    text-align: left;
    padding-left: 14px;
    align-self: flex-end;
    white-space: nowrap;

    @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px;
        color: #767676;    
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
        font-size: 16px;
        color: #414550;
      }
      @media (min-width: 992px) and (max-width: 1299.98px) { 
        font-size: 16px;
        color: #414550;
      }
      @media (min-width: 1300px) { 
        font-size: 16px;
        color: #414550;
      }

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
        @media (min-width: 0px) and (max-width: 767.98px) {
            font-size: 14px
        }
    }

    @media (min-width: 0px) and (max-width: 767.98px) {
        .tag1{
            font-size: 13px;
            padding-right: 8px;
        }
    }
`