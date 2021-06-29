import React, {Component} from "react";
import styled from "styled-components";

import Container from "components/Container";
import * as Text from 'components/Text';
import ProfileContainer from "./Profile";
import CompanyInfoContainer from "./CompanyInfo";
import CompanyDetailContainer from "./CompanyDetail";
import PortfolioContainer from "./Portfolio";
import StructureConatiner from "./Structure";
import MachineConatiner from "./Machine";
import CertificationConatiner from "./Certification";
import ProcessConatiner from "./Process";
import RequestCardConatiner from "./RequestCard";
import {inject, observer} from "mobx-react";


@inject('Answer')
@observer
class PartnerDetailContainer extends Component {
  state = {
    answerId: -1,
  }

  componentDidMount() {
    const answerId = window.location.href.split('/').pop()
    this.setState({
      ...this.state,
      answerId: answerId,
    })
  }

  render() {
    const {Answer} = this.props
    const {answerId} = this.state
    let answer = null
    let partner = null
    if(answerId) {
      answer = Answer.getAnswerById(answerId)
    }
    if(answer) {
      partner = Answer.getPartnerById(answer.partner)
      if (!Answer.current_partner && partner) {
        setTimeout(() => Answer.current_partner = partner, 1000)
      }
    }

    return (
      <Container>
        {
          partner &&
            <>
              <ProfileContainer id={partner && partner.id}/>
              <CompanyDetailContainer/>
              <PortfolioContainer/>
              <MachineConatiner/>
              <RequestCardConatiner/>
              <HeightBox/>
            </>
        }
      </Container>
    );
  }
}

export default PartnerDetailContainer

const HeightBox = styled.div`
  height: 50px;
`;

