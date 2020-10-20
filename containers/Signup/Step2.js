import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

import Email from './Step2/Email'
import Company from './Step2/Company'
import Category from './Step2/Category'
import File from './Step2/File'
import MarketingModal from './MarketingModal'
import PartnerEmailConatiner from './Step2/partnerEmail'

const search_ic = 'static/icon/search.png'

@inject('Auth', 'Answer')
@observer
class Step2Conatiner extends React.Component {
  componentDidMount() {
    const { Auth, Answer } = this.props

    if(Auth.type === 'expert') {
      Answer.loadCategories()
    }
  }

  state = {
    accept_terms: true,
 //   accept_marketing: false,
    open_marketing: false,

  }

  handleSubmit = () => {
    const { Auth } = this.props

    if(!this.state.accept_terms) {
      alert('이용약관을 확인해주세요');
      return;
    }

    Auth.signup();
  }

  toggleCheckBox = () => {
    this.setState({
      ...this.state,
      accept_terms: !this.state.accept_terms,
    })
  }

//  toggleCheckBox2 = () => {
//    this.setState({
//      ...this.state,
//      accept_marketing: !this.state.accept_marketing,
//    })
//  }

  openMarketingModal = () => {
		this.setState({
			...this.state,
			open_marketing: true,

		})
	}
  handleClose = () => {
		this.setState({
			...this.state,
			open_marketing: false,

		})
	}

  render(){
    const { Auth } = this.props
    return (
      <Section>
        <Container>
          {
            Auth.type === 'client' && (
              <>
                <Email/>
              </>
            )
          }
          {
            Auth.type === 'expert' && (
              <>
                <PartnerEmailConatiner/>
                <Company/>
                <Category/>
                <File/>
              </>
              )
          }
          <Terms>
            <CheckBoxComponent
              primary
              checked = {this.state.accept_terms}
              onChange={this.toggleCheckBox}
            >
              <Text.FontSize16 fontWeight={300}>
                <PrimaryColorLink target="_blank" href="/term/policy">이용약관&nbsp;</PrimaryColorLink>
                및
                <PrimaryColorLink target="_blank" href="/term/personal">&nbsp;개인정보 처리방침</PrimaryColorLink>에 동의합니다. (필수)
              </Text.FontSize16>
            </CheckBoxComponent>
          </Terms>

          <CheckBoxComponent
              primary
              checked={Auth.marketing}
              onChange={Auth.setMarketing}
              value={Auth.marketing}
            >
              <Text.FontSize16 fontWeight={300}>
                <PrimaryColorLink target="_blank" onClick={this.openMarketingModal}>마케팅 정보 수신&nbsp;</PrimaryColorLink>에 동의합니다. (선택)
              </Text.FontSize16>
          </CheckBoxComponent>

          <MarketingModal open= {this.state.open_marketing} handleClose={this.handleClose} open_marketing={this.state.open_marketing} accept_marketing={this.state.accept_marketing}/>

          <ButtonBox>
            {/* <ButtonComponent backgroundColor='#e6e6e6' borderColor='#e6e6e6' borderRadius={100} onClick={() => Auth.setStep(0)}>
              <Text.FontSize20 color='#a0a0a0' fontWeight={500}>이전</Text.FontSize20>
            </ButtonComponent> */}
            <ButtonComponent id="sign_up_button_complete_div" backgroundColor={PRIMARY} borderColor={PRIMARY} borderRadius={100} onClick={this.handleSubmit}>
              {
                Auth.loading
                ? <ButtonSpinnerComponent/>
                : <Text.FontSize20 id="sign_up_button_complete_p" color={WHITE} fontWeight={500}>가입완료</Text.FontSize20>
              }
            </ButtonComponent>
          </ButtonBox>
        </Container>
      </Section>

    )
  }
}

export default Step2Conatiner

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  div {
    border-radius: 3px;
    box-shadow: 0 3px 6px 0 rgba(123, 123, 123, 0.64);
    background-color: #0a2165;
    width : 147px ; 
    height: 52px;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: 120px;
    }
  }
`

const Terms = styled.div`
  margin-top: 12px;
`;
const PrimaryColorLink = styled.a`
  display: inline-block;
  color: ${PRIMARY};
  font-weight: 500;
  text-decoration: none;
`;
