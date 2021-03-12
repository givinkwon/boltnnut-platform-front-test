import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";
import { inject, observer } from 'mobx-react'

import Container from 'components/Containerv1';
import ProposalCard from 'components/ProposalCard';
import Background from 'components/Background';

const pass1 = 'static/images/pass1.png'
const pass2 = 'static/images/pass2.png'

const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'

@inject('Project','Auth')
@observer
class AnswerContentContainer extends React.Component {
 
  // state = {
  //   projectLength: 0,
  //   project_idx: 3,
  //   length: 0
  // }
  // componentDidMount () {
  //   this.setState({...this.state, projectLength: this.props.length })
  //   window.addEventListener('scroll', this.loadScroll);
  // }

  // loadScroll = () => {
  //   const { project_idx, projectLength } = this.state;
  //   var newIdx = project_idx + 3

  //   if (typeof document != "undefined") {
  //     var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //     var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  //     var clientHeight = document.documentElement.clientHeight;
  //   }
  //   if (scrollTop + clientHeight + 4 > scrollHeight && projectLength == null) {
  //     this.setState({...this.state, projectLength: this.props.length})
  //   }
  //   if (scrollTop + clientHeight + 4 > scrollHeight && projectLength > project_idx ) {
  //     if (newIdx < projectLength) {
  //       this.setState({...this.state, project_idx: newIdx})
  //     } else {
  //       this.setState({...this.state, project_idx: projectLength})
  //     }
  //   }
  // }
  state = {
    current: 0,
    next: true,
    prev: true,
    count: 0
  }

  
  handleIntersection = (event) => {
    if(event.isIntersecting) {
      console.log('추가 로딩을 시도합니다')
      const {Project} = this.props
      
    }
  }
  
  componentDidMount() {
    const { Project } = this.props

    //const { current, count } = this.state;    
    console.log("############################3="+Project.project_count)
    this.setState({...this.state, count: Project.project_count})
    
    console.log("did mount")

    console.log(`previous project_count: ${this.props.Project.project_count}`)
    console.log(`previous count: ${this.state.count}`)
    
    console.log(`previous current: ${this.state.current}`)

    
  }
  componentWillMount() {
    const { Project } = this.props;    
    this.setState({...this.state, count: Project.project_count})
    console.log("will mount")
  }
  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    } else {
        this.setState({next: true, prev: true})
    }
  }
  updaProjectate(newPage, count){
    this.setState({...this.state, current: newPage, count: count }, () => {
      console.log(this.state.count);
    });
  }

  pageNext = () => {  
    console.log("next 버튼 눌림")
    const { Project } = this.props;   
    const { current, count } = this.state;
    const newPage = this.state.current + 1
    const page = parseInt(this.state.count/5) + 1
    console.log(`L__project_count: ${Project.project_count}`)
    this.setState({...this.state, current: newPage, count: Project.project_count })

 
    this.updaProjectate(newPage, Project.project_count)

    //if (this.state.current % 2 == 0) {
      //console.log(this.state.current)

    // 실제 
    console.log(this.props.Auth.logged_in_client)
    Project.getNextPage(this.props.Auth.logged_in_client);

    // 임의
    // Project.getNextPage(904);
      
    console.log(this.state)
    console.log(`project_count: ${Project.project_count}`)
    console.log(`count: ${this.state.count}`)
    console.log(`page: ${page}`)
    console.log(`this.state.current: ${this.state.current}`)
    console.log(`current: ${current}`)
    console.log(`newPage: ${newPage}`)
  }
  pagePrev = () => {
    if (this.state.current != 0) {
      const newPage = this.state.current - 1
      this.setState({...this.state, current: newPage, prev: true})
    }
  }
  
  buttonClick = () => {
    console.log("n")
  }

  render() {
    const { Project } = this.props
    const { prev, next, current, count } = this.state
    const current_set = (parseInt(current/5) + 1)
    const page = parseInt(Project.project_count/5) + 1  
    const user = Project.current_user_id

    console.log(count)

    // https://velog.io/@cada/React%EC%9D%98-setState%EA%B0%80-%EC%9E%98%EB%AA%BB%EB%90%9C-%EA%B0%92%EC%9D%84-%EC%A3%BC%EB%8A%94-%EC%9D%B4%EC%9C%A0

    
// page_set == current_set

    // const data = (data) => {
    //   return data.filter((item) => 
    //     this.props.Project.current_user_id === item.request_set[0].clientId
    //   )
    // }    
      return(
        <>                
          { Project.projectData.length > 0 && Project.projectData.slice(5*current, 5*(current+1)).map((item, idx) => {                            
            return(
              <Background style={{marginBottom: '5px'}}>
                <Container>        
                  <ProposalCard data={item} handleIntersection={this.handleIntersection}/> 
               </Container>          
              </Background>
            )        
            })}
           <PageBar>
            <img src={pass1} style={{opacity: current_set == 1 && current == 0  ? 0.4 : 1 }} onClick = {this.pagePrev}/>
              <PageCount onClick = {this.buttonClick} value = {5*(current_set - 1) + 1} active={current%5 == 0} style={{display:  page < 5*(current_set - 1) + 1 ? 'none': 'block' }}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={current%5 == 1} style={{display:  page < 5*(current_set - 1) + 2 ? 'none': 'block' }}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={current%5 == 2} style={{display:  page < 5*(current_set - 1) + 3 ? 'none': 'block' }}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={current%5 == 3} style={{display:  page < 5*(current_set - 1) + 4 ? 'none': 'block' }}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 5} active={current%5 == 4} style={{display:  page < 5*(current_set - 1) + 5 ? 'none': 'block' }}> {5*(current_set - 1) + 5} </PageCount>
              {/* <PageCount> ... </PageCount> */}
            <img src={pass2} style={{opacity: page == current ? 0.4 : 1, display: page == current? 'none' : 'block'}} onClick = {this.pageNext} />
        </PageBar>        
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

export default AnswerContentContainer
