import React from 'react'
import ContentContainer from './Content'
import MobileContentContainer from './MobileProject'
import BannerContainer from './Banner';
import NavContainer from './Nav.js';
import { inject, observer } from 'mobx-react';

@inject("Project", "Auth")
@observer 
class ProjectContainer extends React.Component {
  async componentDidMount() {
    console.log("AAAAAAAAAAAAAAa")
     console.log(this.props.Auth.logged_in_client) 
    // await this.props.Test.init();
    //this.props.Partner.search_text = await this.props.query.q;
    //await this.props.Test.searchjust();
  }
  render(){
    return (
      <>  
        {
          this.props.width && this.props.width > 767.99 ? (
            <div style={{ overflow: 'visible'}}>
              
              <BannerContainer/>            
              {Project.step_index == 1 &&         
              <NavContainer style={{marginTop: '50px'}}/>
              <ContentContainer length = {this.props.length} />
  }
            </div>
          ) : (
            <div>      
              <MobileContentContainer width={this.props.width}/>             
            </div>
          )
        }                                                                
      </>
    )
  }
}

export default ProjectContainer
