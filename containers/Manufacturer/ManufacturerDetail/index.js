import React from "react";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import DetailCardContainer from "./DetailCard";
import ReviewContainer from "../Review/ReviewPage";
import { inject, observer } from "mobx-react";

@inject("Auth", "Partner")
@observer
class ManufacturerDetailConatiner extends React.Component {
  componentDidMount() {
    console.log(this.props.width);
  }
  render() {
    const { Auth, Partner } = this.props;
    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <>
              <Background>
                <Containerv1>
                  {Partner.reviewActiveIndex == 0 && (
                    <DetailCardContainer width={this.props.width} />
                  )}

                  {Partner.reviewActiveIndex == 1 && (
                    <ReviewContainer width={this.props.width} />
                  )}
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
