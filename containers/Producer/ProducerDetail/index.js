import React from "react";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import DetailCardContainer from "./DetailCard";
class ManufacturerDetailConatiner extends React.Component {
  render() {
    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <>
              <Background>
                <Containerv1>
                  <DetailCardContainer width={this.props.width} />
                </Containerv1>
              </Background>
            </>
          ) : (
            <Background>
              <Containerv1>
                <DetailCardContainer width={this.props.width} />
              </Containerv1>
            </Background>
          ))}
      </>
    );
  }
}

export default ManufacturerDetailConatiner;
