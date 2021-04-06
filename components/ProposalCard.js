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
        const {data, middleCategory, mainCategory, newData, checkTotal, customer } = this.props;
        const {width} = this.state;

        // console.log(this.props.data.request_set[0].name);
        let name=""
        let date=""
        let period=""
        let estimate=""
        let status =""

        if(data.request_set[0])
        {
            // console.log(typeof(data.project_status))
            name = data.request_set[0].name ? data.request_set[0].name : "미지정";
            date = data.request_set[0].createdAt ? data.request_set[0].createdAt.substr(0, 10).replaceAll('-', '.') : "미지정";
            period  = data.request_set[0].period ? data.request_set[0].period + "개월" : "미지정";
            estimate = data.request_set[0].price ? data.request_set[0].price : "미지정";
            if(customer == "partner"){
                status = data.project_status == 21 ? "모집 완료" : "모집 중"
            } else{
                //status = data.status
                // console.log(data.project_status)
                switch(data.project_status){
                    case 1:
                        status = "상담 미진행"
                        break
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:                       
                    case 7:                        
                    case 8:                       
                    case 9:                       
                    case 10:
                    case 11:                       
                    case 13:                     
                    case 14:                      
                    case 15:                       
                    case 17:                    
                    case 19:
                        status = "상담 중"
                        break
                    case 21:
                        status = "상담 완료"
                        break
                    default:
                        status = "미정"
                        break
                }                
            }                
        }
        
        const consultation = data.status;
      
		return (
            
            <>
            {/* {console.log(newData)} */}
            { width > 767.98 ? ( 
                // checkTotal === "전체" && newData === 0 ? (                    
                //     <Card>                        
                //         { status === "모집 완료" ? 
                //             <StepTag style={{backgroundColor: '#999999'}}>                                
                //                 <span> {status} </span>                    
                //                 <div style={{borderTop: '9.1px solid #414550'}}></div>                                
                //             </StepTag>                    
                //             :
                //             <StepTag>                                        
                //                 <span> {status} </span>                    
                //                 <div></div>                                
                //             </StepTag>
                //         }                                            
                //         <HeaderWrapper>
                //             <Title>
                //                 오래된 데이터 입니다.
                //             </Title>                        
                //         </HeaderWrapper>
                //         <CategoryWrapper>
                //             <SubTitle>
                //                 <span>카테고리</span>
                //             </SubTitle>                                   
                //         </CategoryWrapper>
                //         <FooterWrapper>
                //             <div style={{display: 'inline-flex'}}>
                //                 <SubTitle>
                //                     희망개발기간
                //                 </SubTitle>                                
                //             </div>
                //             <PriceTagBox>
                //                 <span class="tag1"> 견적 </span>
                //                 <span class="tag2"></span>
                //             </PriceTagBox>
                //         </FooterWrapper>
                //     </Card>
                // ) : (               
                    <Card>                    
                        { data.project_status === 21 ? 
                            <StepTag style={{backgroundColor: '#999999'}}>                                
                                <span> {status} </span>                    
                                <div style={{borderTop: '9.1px solid #414550'}}></div>                                
                            </StepTag>                    
                            :
                            <StepTag>                                        
                                <span> {status} </span>                    
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
                                <span>{mainCategory}</span>
                            </CategoryBox>
                            <CategoryBox>
                                <span>{middleCategory}</span>
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
                                <span class="tag1"> 견적 </span>
                                <span class="tag2">{estimate}</span>
                            </PriceTagBox>
                        </FooterWrapper>
                    </Card>
            //    ) 
                ) : (

            
            <Card style={{backgroundColor: data.project_status === 21 ? '#f6f6f6' : 'var(--white)'}}>                             
                    <StepTag>                                
                        <span style={{color: data.project_status === 21 ? '#767676' : '#0933b3'}}> {status} </span>                            
                    </StepTag>                                                                               
                <HeaderWrapper>
                    <Title>
                        {name}
                    </Title>
                </HeaderWrapper>
                
                <FooterWrapper>          
                    <div style={{display: 'inline-flex'}}>          
                        <Content>
                            {date}
                        </Content>
                    </div>
                    <PriceTagBox>
                        <span class="tag1"> 견적 </span>
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
            width: 61px;
            height: 19px;
            color: #0933b3;
            font-size: 13px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 34px;
            letter-spacing: -0.33px;                                              
            
            
        }

    }
      @media (min-width: 768px) and (max-width: 991.98px) {
        width: 100px;
        height: 36px;
        position: absolute;
        background-color: #0933b3;
        top: 0;
        left: -9px;  
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
            left: 1px;
            bottom: -8px;                        
            border-left: 9px solid transparent;
            border-top: 9px solid #0a2165;
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
        left: -9px;  
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
            left: 1px;
            bottom: -8px;                        
            border-left: 9px solid transparent;
            border-top: 9px solid #0a2165;
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
        left: -9px;  
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
            left: 1px;
            bottom: -8px;                        
            border-left: 9px solid transparent;
            border-top: 9px solid #0a2165;
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
    //width: 987px;    
    position: relative;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;

    @media (min-width: 0px) and (max-width: 767.98px) {
        height: 108px;        
        
        padding-left: 14px;
        padding-right: 14px;
        padding-top: 7px;
        padding-bottom: 14px;
        margin-top: 14px;        
        box-sizing: border-box;
    }
      @media (min-width: 768px) and (max-width: 991.98px) {
        height: 100%;
        margin-bottom: 34px;
        padding: 62px 49px 32px 32px;    
        box-sizing: border-box;
      }
      @media (min-width: 992px) and (max-width: 1299.98px) { 
        height: 100%;
        margin-bottom: 34px;
        padding: 62px 49px 32px 32px;
        box-sizing: border-box;
      }
      @media (min-width: 1300px) { 
        height: 100%;
        margin-bottom: 34px;
        padding: 62px 49px 32px 32px;
        box-sizing: border-box;
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
    margin-right: 20px;
    @media (min-width: 0px) and (max-width: 767.98px) {                 
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
    white-space: nowrap;
    margin-right: 15px;
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
    align-items: baseline;
    justify-content: space-between;
`
const CategoryBox = styled.div`

    object-fit: contain;
    border-radius: 3px;
    background-color: #e1e2e4;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    padding: 0 15px;
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
    align-self: flex-end;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: -0.4px;
    text-align: left;
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
    .tag1 {
        height: 29px;
        display: inline-flex;
        
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 40px;
        letter-spacing: -0.5px;
        text-align: left;
        color: #282c36;
        padding-right: 20px;   
        
    }
    .tag2 {
        display: inline-flex;        
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: -0.75px;
        text-align: left;
        color: #282c36;
        height: 45px;
        @media (min-width: 0px) and (max-width: 767.98px) {
            font-size: 14px
            line-height: 15px;
        }
        @media (min-width: 768px) and (max-width: 991.98px) {
            font-size: 24px;        
            line-height: 52px;
          }
          @media (min-width: 992px) and (max-width: 1299.98px) { 
            font-size: 27px;    
            line-height: 52px;
          }
          @media (min-width: 1300px) { 
            font-size: 30px;
            line-height: 52px;
          }
    }

    @media (min-width: 0px) and (max-width: 767.98px) {    
        .tag1{
            font-size: 13px;
            padding-right: 8px;
        }
    }
`