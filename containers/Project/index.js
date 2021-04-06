import React from 'react'
import ClientContentContainer from './Client/Content'
import ClientMobileContentContainer from './Client/MobileProject'
import PartnerContentContainer from './Partner/Content'
import PartnerMobileContentContainer from './Partner/MobileProject'
import BannerContainer from './Banner';
import NavContainer from './Nav.js';
import SearchBar from './SearchBar';
import styled from 'styled-components'

import { inject, observer } from 'mobx-react';

@inject("Project", "Auth")
@observer 
class ProjectContainer extends React.Component {
  async componentDidMount() {

  }
  render(){
    const { Auth } = this.props
    return (
      <>  
        {
          Auth.logged_in_client && (
            this.props.width && this.props.width > 767.99 ? (
              <div style={{ overflow: 'visible'}}>          
                <BannerContainer/>                    
                <NavContainer style={{marginTop: '50px'}}/>
                <ClientContentContainer length = {this.props.length} />
              </div>
            ) : (
              <div>      
                <ClientMobileContentContainer width={this.props.width}/>             
              </div>
            )
          )
          
        } 
        {
           Auth.logged_in_partner && (
            this.props.width && this.props.width > 767.99 ? (
              <div style={{ overflow: 'visible'}}>          
                <BannerContainer/>        
                          
                  <SearchBar/> 
                <PartnerContentContainer length = {this.props.length} />
              </div>
            ) : (
              <div>      
                <PartnerMobileContentContainer width={this.props.width}/>             
              </div>
            )
          )
        }                                                               
      </>
    )
  }
}

export default ProjectContainer


// const Header = styled.div`
//   margin-top: 90px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `