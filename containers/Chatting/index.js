import React from "react";
import ClientContentContainer from "./Client/Content";
import ClientMobileContentContainer from "./Client/ProjectDetail/Mobile/MobileProject";
import ProjectSearch from "./Partner/Content";
import PartnerMobileContentContainer from "./Partner/Mobile/MobileProject";
import BannerContainer from "./Banner";
import NavContainer from "./Nav.js";

import ClientChatting from "./ClientChatting";
import PartnerChatting from "./PartnerChatting";

@inject("Project", "Auth", "Partner")
@observer
class ChattingContainer extends React.component{
  async componentDidMount() {
    const { Auth } = this.props;
    await Auth.checkLogin();
  };
  render(){
    const {Auth} = this.props;
    return(
      <>
      {Auth.logged_in_client &&
      (this.props.width && this.props.width > 1279.98 ?(
        <div style={{ overflow: "visible" }}>
        
        </div>
      )
      
      
      <ClientChatting/>}
      {Auth.logged_in_partner && <PartnerChatting/>}
      </>

    );
  }
}

export default ChattingContainer