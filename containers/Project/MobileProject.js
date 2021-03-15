import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";
import { inject, observer } from 'mobx-react'

import Container from 'components/Containerv1';
import ProposalCard from 'components/ProposalCard';
import Background from 'components/Background';
import Project from '../../stores/Project';

const pass1 = 'static/images/pass1.png'
const pass2 = 'static/images/pass2.png'

const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'

import * as Content from "components/Content";

@inject('Project','Auth')
@observer
class MobileProjectContentContainer extends React.Component {

  state = {
    current: 0,
    next: true,
    prev: true,
    count: 0
  }
  
  handleIntersection = (event) => {
    if(event.isIntersecting) {
      console.log('추가 로딩을 시도합니다')            
    }
  }
  
  async componentDidMount() {
    console.log("<Mobile> did mount")
    const { Project, Auth } = this.props 
    console.log(Project.current_user_id)
    
    await Auth.checkLogin();
    if(Auth.logged_in_client){
      Project.getPage(Auth.logged_in_client.id)  
    }
    console.log(Auth.logged_in_client)    
  }

  // afterChangeHandler = (current) => {
  //   if(current === 0){
  //     this.setState({next: true, prev: false})
  //   } else {
  //       this.setState({next: true, prev: true})
  //   }
  // }
 

  movePage = (e) => {
    const { Project, Auth } = this.props 
    const newPage = e.target.innerText*1;    
    
    Project.currentPage = newPage
    Project.getPage(Auth.logged_in_client.id, newPage)
  }

  pageNext = () => {  
    const { Project, Auth } = this.props  

    if (Project.currentPage  < Project.project_page) {
      const nextPage = Project.currentPage+1  
      Project.currentPage = nextPage
      Project.getPage(Auth.logged_in_client.id, Project.currentPage);
    }        
  }
  
  pagePrev = () => {
    const { Project, Auth } = this.props        
  
    if (Project.currentPage  > 1) {
      const newPage = Project.currentPage  - 1
      Project.currentPage = newPage          
      Project.getPage(Auth.logged_in_client.id, Project.currentPage)
    }
  }

  render() {
    const { Project } = this.props
    const current_set = (parseInt((Project.currentPage-1) /5)+1)    

    // { Project.projectData.length > 0 && Project.projectData.slice(5*(Project.currentPage), 5*(Project.currentPage +1)).map((item, idx) => {                             
      return(
        <>          
        <div>
        <Header style={{marginBottom: '0px'}}>
            <Font16>전체 프로젝트</Font16>
        </Header>
          {Project.projectDataList && Project.projectDataList.map((item, idx) => {
            //   {data.map((item, idx) => {
            return(            
              <Background style={{marginBottom: '3px'}}>
                <Container>        
                  <ProposalCard width={this.props.width} data={item} handleIntersection={this.handleIntersection}/> 
                </Container>          
              </Background>
            )        
        })}

        <PageBar>
            <img src={pass1} style={{opacity: current_set == 1 && Project.currentPage <= 1  ? 0.4 : 1 }} onClick = {this.pagePrev}/>
              <PageCount onClick = {this.movePage} value = {5*(current_set - 1)} active={Project.currentPage %5 == 1} style={{display:  Project.project_page < 5*(current_set - 1) + 1 ? 'none': 'block' }}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 1} active={Project.currentPage %5 == 2} style={{display:  Project.project_page < 5*(current_set - 1) + 2 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={Project.currentPage %5 == 3} style={{display:  Project.project_page < 5*(current_set - 1) + 3 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={Project.currentPage %5 == 4} style={{display:  Project.project_page < 5*(current_set - 1) + 4 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={Project.currentPage %5 == 0} style={{display:  Project.project_page < 5*(current_set - 1) + 5 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 5} </PageCount>
              {/* <PageCount> ... </PageCount> */}
            <img src={pass2} style={{opacity: Project.project_page == Project.currentPage  ? 0.4 : 1 }} onClick = {this.pageNext} />
        </PageBar>    
        </div>          
        </>
    )}
  }

// const data = [
//   {
//     consultation: '상담 진행',
//     name: '컴퓨터',
//     date: '2021.03.02' ,
//     period: '120일',
//     estimate: '10,000,000원'
//   },

//   {
//     consultation: '상담 미진행',
//     name: '스캐너',
//     date: '2021.03.03' ,
//     period: '121일',
//     estimate: '11,000,000원'
//   },

//   {
//     consultation: '완료',
//     name: '키보드',
//     date: '2021.03.04' ,
//     period: '122일',
//     estimate: '12,000,000원'
//   },

//   {
//     consultation: '상담 미진행',
//     name: '마우스',
//     date: '2021.03.05' ,
//     period: '123일',
//     estimate: '13,000,000원'
//   },

//   {
//     consultation: '완료',
//     name: '프린터',
//     date: '2021.03.06' ,
//     period: '124일',
//     estimate: '14,000,000원'
//   },
// ]

const PageBar = styled.div`
  width: 280px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-around;
`

const PageCount = styled.span`
    width: 14px;
    height: 30px;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.63px;
    text-align: left;
    color : #999999;
    cursor: pointer;
    ${(props) =>
      props.active &&
      css`
      font-weight: 700;
      color: #0933b3;
      `
     }
`

const Header = styled.div`
    position: relative;
    width: auto;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

`

const Font16 = styled(Content.FontSize16)`
    width: 90px;
    height: 24px;
    color: #0a2165;
    line-height: 18;
    letter-spacing: -0.4px;
    font-weight: bold;

`

export default MobileProjectContentContainer

