import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import InputComponent from 'components/Input2'
import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

//import ImageCropModal from './ImageCropModal'

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
    }

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
    return (
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>포트폴리오</Text.FontSize20>
        </Header>
        <Content>
          <W100>
            <input
              onChange={this.onChangePortfolio}
              style={{display: 'none'}}
              ref={this.portfolio}
              type='file'
            />

            <Wrap>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>회사소개서[연혁, 실적, 상세 개발 이력, 조직도, 보유 장비 등]</Text.FontSize20>
              <InputBox onClick={() => this.portfolio.current.click()}>
                <Text.FontSize20 color="#767676" fontWeight={400}>
                  { this.state.portfolioValue ? this.state.portfolioValue : '선택된 파일 없음' }
                </Text.FontSize20>
                <FileIcon src="/static/icon/download_file.svg" />
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
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>개발인력 이력서[최소 2인 이상]</Text.FontSize20>
              <InputBox onClick={() => this.resume.current.click()}>
                <Text.FontSize20 color="#767676" fontWeight={400}>
                  { this.state.resumeValue ? this.state.resumeValue : '선택된 파일 없음' }
                </Text.FontSize20>
                <FileIcon src="/static/icon/download_file.svg" />
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

            {/*<Wrap>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>로고</Text.FontSize20>
              <InputBox onClick={() => this.logo.current.click()}>
                <Text.FontSize20 color="#767676" fontWeight={400}>
                  { this.state.logoValue ? this.state.logoValue : '선택된 파일 없음' }
                </Text.FontSize20>
                   {/*src && <ImageCropModal
                            src={src}
                            open={modal_open}
                            handleClose={this.closeModal}/>
                <FileIcon src="/static/icon/download_file.svg" />
              </InputBox>

            </Wrap>*/}
          </W100>
        </Content>
      </div>
    )
  }
}

export default FileConatiner



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
`
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`
const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  
  > div > div > p {
    color: #4b4b4b;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px 20px;
  }
`


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 15px;
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
  padding: 15px;
  
  input {
    font-size: 16px;
  }
  > p {
    max-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
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

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`
