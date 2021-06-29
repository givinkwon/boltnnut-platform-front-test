import React from 'react'
import ContentContainer from './Content'
import BannerContainer from './Banner';
import NavContainer from './Nav.js';
import { inject, observer } from 'mobx-react';


@inject("Project")
@observer 
class AnswerContainer extends React.Component {
  async componentDidMount() {
  }
  render(){
    return (
      <>        
        <div style={{ overflow: 'visible' }}>
          <BannerContainer/>
          <NavContainer style={{marginTop: '50px'}}/>
          <ContentContainer length = {this.props.length} />
        </div>
      </>
    )
  }
}

export default AnswerContainer
