import React from 'react'
import ContentContainer from './Content'
import BannerContainer from './Banner';
import NavContainer from './Nav.js';
import { inject, observer } from 'mobx-react';


@inject("Project")
@observer 
class AnswerContainer extends React.Component {
  async componentDidMount() {
    // await this.props.Test.init();
    //this.props.Partner.search_text = await this.props.query.q;
    //await this.props.Test.searchjust();
  }
  render(){
    return (
      <>        
        <div style={{ overflow: 'visible' }}>
          {/* {console.log(this.props.length)} */}
          <BannerContainer/>
          <NavContainer style={{marginTop: '50px'}}/>
          <ContentContainer length = {this.props.length} />
          {/* {console.log(this.props.length)} */}
        </div>
      </>
    )
  }
}

export default AnswerContainer
