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

@inject('Project','Auth')
@observer
class ProjectContentContainer extends React.Component {

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
  
  componentDidMount() {
    const { Project, Auth } = this.props 
    console.log("<Web> did mount")
    console.log(localStorage)

    // const color = document.getElementsByClassName("Footer").setAttribute("style","background-color:red");
    // const color = document.getElementById("MyFooter").getAttribute('style');
    // console.log(color);
    // Project.init(918)

    //console.log(Auth)
    if(Auth.logged_in_client){    
       Project.getPage(Auth.logged_in_client.id)  
       console.log(Auth.logged_in_client)          
    }
    
  }

  // afterChangeHandler = (current) => {
  //   if(current === 0){
  //     this.setState({next: true, prev: false})
  //   } else {
  //       this.setState({next: true, prev: true})
  //   }
  // }
  // updaProjectate(newPage, count){
  //   this.setState({...this.state, current: newPage, count: count }, () => {
  //     console.log(this.state.count);
  //   });
  // }

  movePage = (e) => {
    const { Project, Auth } = this.props 
    const newPage = e.target.innerText*1;    
    const length = Project.projectData.length; 
    let filledPage = parseInt(length/5);
    Project.currentPage = newPage
    Project.getPage(Auth.logged_in_client.id, newPage)
  }

  pageNext = () => {  
    const { Project, Auth } = this.props  
    const newPage = this.state.current + 1
    console.log(`previous currentPage : ${Project.currentPage}`)
    console.log(`after currentPage : ${Project.currentPage}`)

    Project.getPage(Auth.logged_in_client.id, Project.currentPage+1);
    Project.currentPage = Project.currentPage+1
    
  }
  
  pagePrev = () => {
    if (this.props.Project.currentPage  != 0) {
      const newPage = this.props.Project.currentPage  - 1
      this.setState({...this.state, current: newPage, prev: true})
      this.props.Project.currentPage = newPage
      Project.getPage(this.props.Auth.logged_in_client, this.props.Project.currentPage)
    }
  }

  render() {
    const { Project } = this.props
    const current_set = (parseInt((Project.currentPage-1) /5)+1)    
    const gray = "#f9f9f9"

    // const data = (data) => {
    //   return data.filter((item) => 
    //     this.props.Project.current_user_id === item.request_set[0].clientId
    //   )
    // }    
      return(
        <>                
        <Background style={{backgroundColor: '#f9f9f9'}} id="MyBackground">
        {/* <Background> */}
        {/* { Project.projectData.length > 0 && Project.projectData.slice(5*(Project.currentPage), 5*(Project.currentPage +1)).map((item, idx) => {                             */}
          {Project.projectDataList && Project.projectDataList.map((item, idx) => {
            return(            
              <Background style={{marginBottom: '5px', backgroundColor: '#f9f9f9'}}>
                <Container>        
                  <ProposalCard data={item} handleIntersection={this.handleIntersection}/> 
                </Container>          
              </Background>
            )        
        })}
        
           <PageBar>
            <img src={pass1} style={{opacity: current_set == 1 && Project.currentPage == 0  ? 0.4 : 1 }} onClick = {this.pagePrev}/>
              <PageCount onClick = {this.movePage} value = {5*(current_set - 1)} active={Project.currentPage %5 == 1} style={{display:  Project.project_page < 5*(current_set - 1) + 1 ? 'none': 'block' }}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 1} active={Project.currentPage %5 == 2} style={{display:  Project.project_page < 5*(current_set - 1) + 2 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={Project.currentPage %5 == 3} style={{display:  Project.project_page < 5*(current_set - 1) + 3 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={Project.currentPage %5 == 4} style={{display:  Project.project_page < 5*(current_set - 1) + 4 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={Project.currentPage %5 == 0} style={{display:  Project.project_page < 5*(current_set - 1) + 5 ? 'none': 'block' }} onClick = {this.movePage}> {5*(current_set - 1) + 5} </PageCount>
              {/* <PageCount> ... </PageCount> */}
            <img src={pass2} style={{opacity: Project.project_page == Project.currentPage  ? 0.4 : 1, visibility: Project.project_page === Project.currentPage ? 'hidden' : 'visible'}} onClick = {this.pageNext} />
        </PageBar>    
        </Background>    
        </>
    )}
  }

const data = [
  {
    consultation: '상담 진행',
    name: '컴퓨터',
    date: '2021.03.02' ,
    period: '120일',
    estimate: '10,000,000원'
  },

  {
    consultation: '상담 미진행',
    date: '2021.03.03' ,
    period: '121일',
    estimate: '11,000,000원'
  },

  {
    consultation: '완료',
    name: '키보드',
    date: '2021.03.04' ,
    period: '122일',
    estimate: '12,000,000원'
  },

  {
    consultation: '상담 미진행',
    name: '마우스',
    date: '2021.03.05' ,
    period: '123일',
    estimate: '13,000,000원'
  },

  {
    consultation: '완료',
    name: '프린터',
    date: '2021.03.06' ,
    period: '124일',
    estimate: '14,000,000원'
  },
]

const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const PageCount = styled.span`
    width: 14px;
    height: 30px;
    font-size: 25px;
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

export default ProjectContentContainer

