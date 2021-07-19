import React from 'react'
import styled from 'styled-components'

import Background from 'components/Background';
import Container from 'components/Containerv1';



class NavConatiner extends React.Component {
  render(){
    return (
      <Background>
        <Container>
          <Item>
            <span>전체 프로젝트</span>
          </Item>
        </Container>
      </Background>
    )
  }
}

export default NavConatiner

const Item = styled.div`
width: 100%;  
margin-top: 30px;
border-bottom: 1px solid #707070;
padding-bottom: 8px;


> span{
    width: 130px;
    height: 33px;
    font-size: 22px;
    line-height: 40px;
    letter-spacing: -0.55px;
    color: #0933b3;
    font-weight: bold;
    border-bottom: 3px solid #0933b3;
    padding-bottom: 10px;
    box-sizing: border-box;
    
}
  @media (min-width: 0px) and (max-width: 767.98px) {

  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    
  }
  @media (min-width: 1300px) { 
    
  }
`