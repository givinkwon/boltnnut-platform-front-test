import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

// 아래 주석 삭제하면 안됩니다!
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

        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(37.506502, 127.053617);

        // 마커를 생성
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);
      });
    };
  }
  render() {
    const { city } = this.props;
    console.log(city);
    return (
      <>
        <Maps id="map"></Maps>
      </>
    );
  }
}

export default MapContainer;

const Maps = styled.div`
  height: 400px;
  border: 3px solid red;
`;
