import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
//import ContentConatiner from './Content'
import ContentConatiner from "./Content2";

import TabletContentContainer from "./TabletMagazine";
import MobileContentContainer from "./MobileMagazine2";

class MagazineConatiner extends React.Component {


  render() {
    const {width} = this.props;
    return (
      <div style={{ overflow: "hidden" }}>

        {width && width > 767.99 && <BannerConatiner />}

        {width && width > 1300 || width < 1 ? 
        (
            <Section style={{ padding: 0 }}>
              <Container style={{ padding: 0 }}>
                <ContentConatiner style={{ padding: 0 }} />
              </Container>
            </Section>
        ) : 767.99 < width && width < 1299.98 ? (
            
            <TabletContentContainer length={this.props.length} />
        ) : (
            
            <MobileContentContainer length={this.props.length} />
        
        )
        }
      </div>
    );
  }
}

export default MagazineConatiner;
