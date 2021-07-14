import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

/*global kakao*/

class MapContainer extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=1469e9509222cfd066d35737d4359063&libraries=LIBRARY&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }
  render() {
    return (
      <>
        <Maps id="map"></Maps>
      </>
    );
  }
}

export default MapContainer;

const Maps = styled.div`
  width: 400px;
  height: 400px;
  // margin: 100px 100px 0 130%;
  border: 3px solid red;
`;
