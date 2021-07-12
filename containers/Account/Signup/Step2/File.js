import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import InputComponent from 'components/Input3'
import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth')
@observer
class FileConatiner extends React.Component {
  constructor(props) {
    super(props);
    this.logo = React.createRef();
    this.portfolio = React.createRef();
    this.resume = React.createRef();
  }

  state = {
    portfolioValue: '',
    logoValue: '',
    resumeValue: '',
    src: null,
    modal_open: false,
    width : 0, 
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    })
  }

  onChangePortfolio = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        portfolioValue: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      portfolioValue: fileName,
    })

    this.props.Auth.setFile(e.currentTarget.files[0])
  }
  onChangeResume = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        resumeValue: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      resumeValue: fileName,
    })

    this.props.Auth.setResume(e.currentTarget.files[0]) // TODO
  }

  onChangeLogo = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        logoValue: '',
      })
      return
    }
    // image crop
    const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.currentTarget.files[0]);
    // image crop
    const fileName = e.currentTarget.files[0].name;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="gif"){
      // 허용 파일 목록
    }
    else{
      alert("이미지 파일만 사용 가능합니다 (jpg, jpeg, png, gif)");
      this.setState({
        ...this.state,
        logoValue: '',
      })
      return
    }

    this.setState({
      ...this.state,
      logoValue: fileName,
    })

    this.props.Auth.setLogo(e.currentTarget.files[0])
  }

  render(){
    const { Auth } = this.props
    const { crop, croppedImageUrl, src, modal_open } = this.state;
    const { width } = this.state;

    return (
      <ContentContainer>
        <Content>
        { width > 767.98 ? (
          <>
          <Header>
            <Text.FontSize24 color={'#0933b3'} fontWeight={700}>포트폴리오</Text.FontSize24>
          </Header>
          <W100>
            <input
              onChange={this.onChangePortfolio}
              style={{display: 'none'}}
              ref={this.portfolio}
              type='file'
            />

            <Wrap>
              <Text.FontSize20 color={'#505050'} fontWeight={500}>회사소개서[연혁, 실적, 상세 개발 이력, 조직도, 보유 장비 등]</Text.FontSize20>
              <InputBox onClick={() => this.portfolio.current.click()}>
                <Text.FontSize20 color="#999999" fontWeight={400}>
                  { this.state.portfolioValue ? this.state.portfolioValue : '선택된 파일 없음' }
                </Text.FontSize20>
                <FileIcon src="/static/icon/download.png" />
              </InputBox>
            </Wrap>
          </W100>

          <W100>
            <input
              onChange={this.onChangeResume}
              style={{display: 'none'}}
              ref={this.resume}
              type='file'
            />

            <Wrap>
              <Text.FontSize20 color={'#505050'}>개발인력 이력서</Text.FontSize20>
              <InputBox onClick={() => this.resume.current.click()}>
                <Text.FontSize20 color="#999999">
                  { this.state.resumeValue ? this.state.resumeValue : '선택된 파일 없음' }
                </Text.FontSize20>
                <FileIcon src="/static/icon/download.png" />
              </InputBox>
            </Wrap>
          </W100>

          <W100>
            <input
              onChange={this.onChangeLogo}
              style={{display: 'none'}}
              ref={this.logo}
              type='file'
            />
          </W100>
          </>
        ) : (
          <>
          <Header>
            <span>포트폴리오</span>
          </Header>
          <W100>
            <input
              onChange={this.onChangePortfolio}
              style={{display: 'none'}}
              ref={this.portfolio}
              type='file'
            />
            <Wrap>
              <span class="inputHeader">회사소개서[연혁,실적,상세 개발 이력, 보유장비 등]</span>
              <InputBox onClick={() => this.portfolio.current.click()}>
                <span class="inputBody">
                  { this.state.portfolioValue ? this.state.portfolioValue : '선택된 파일 없음' }
                </span>
                <FileIcon src="/static/icon/download.png" />
              </InputBox>
            </Wrap>
          </W100>
          <W100>
            <input
              onChange={this.onChangeResume}
              style={{display: 'none'}}
              ref={this.resume}
              type='file'
            />
            <Wrap>
              <span class="inputHeader">개발인력 이력서</span>
              <InputBox onClick={() => this.resume.current.click()}>
                <span class="inputBody">
                  { this.state.resumeValue ? this.state.resumeValue : '선택된 파일 없음' }
                </span>
                <FileIcon src="/static/icon/download.png" />
              </InputBox>
            </Wrap>
          </W100>
          <W100>
            <input
              onChange={this.onChangeLogo}
              style={{display: 'none'}}
              ref={this.logo}
              type='file'
            />
          </W100>
          </>
        )}

          
        </Content>
      </ContentContainer>
    )
  }
}

export default FileConatiner

const ContentContainer = styled.div`
  margin-bottom : 45px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-right :0px !important;
    margin-left :0px !important;
    
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right :0px !important;
    margin-left :0px !important;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right :0px !important;
    margin-left :0px !important;
  }
  @media (min-width: 1300px) {
    
  }
`


const Button = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.color};

  width: 100px;
  height: 50px;
  margin-top: 12px;
  margin-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 49px;
  }
`
const W100 = styled.div`
  width: 100%;
  display: flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display : inline-flex;
    > span {
      white-space: nowrap;
      margin-top : auto;
      margin-right : 1px; 
      margin-left : 12px; 
    }
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    
  }
  @media (min-width: 1300px) {
    
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  width : 100%;
  > p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.13;
      letter-spacing: -0.4px;
      color: #0933b3;
    }

  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {

  }
`
const Content = styled.div`
  border: solid 1px #c7c7c7;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  p{
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  div {
    border-radius: 3px;
  }
  > div > div > p {
    color: #4b4b4b;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 4.8%;
    .BoxText {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 4.8%;

    .BoxText {
      font-size: 18px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 4.8%;


  }
  @media (min-width: 1300px) {
    width : 996px;
    padding: 40px;


  }
`


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 15px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      white-space: nowrap;
    }
    .inputHeader {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #505050;
    }
    .inputBody {
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #c7c7c7;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {
}
  }
`
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;

  border-radius: 6px;
  border: solid 1px #dddddd;
  
  input {
    font-size: 16px;
  }
  > p {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
  }
  
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding : 0% 2% 
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding : 2% 2% 

  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    padding : 2% 2% 

  }
  @media (min-width: 1300px) {
    padding: 15px;

  }
`

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`
