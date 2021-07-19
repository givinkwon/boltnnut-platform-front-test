import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

// 아래 주석 삭제하면 안됩니다!
/*global kakao*/

class MapContainer extends React.Component {
  componentDidMount() {
    const { city } = this.props;
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=1469e9509222cfd066d35737d4359063&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // let maps = new window.kakao.maps();
        // console.log(map);
        // console.log(maps);
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(city, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          console.log(result);
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            console.log(coords);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });

        // //마커가 표시 될 위치
        // let markerPosition = new kakao.maps.LatLng(37.506502, 127.053617);

        // // 마커를 생성
        // let marker = new kakao.maps.Marker({
        //   position: markerPosition,
        // });

        // // 마커를 지도 위에 표시
        // marker.setMap(map);
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
`;
