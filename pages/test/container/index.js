import React, { useState } from "react";
import styled from "styled-components";
import { WHITE, PRIMARY } from "static/style";
import { inject, observer } from "mobx-react";

import Banner0Container from './Banner0';
import Banner1Container from './Banner1';
import Banner2Container from './Banner2';
import Banner3Container from './Banner3';
import Banner4Container from './Banner4';
import Banner5Container from './Banner5';
import Banner6Container from './Banner6';
import Banner7Container from './Banner7';
import Banner8Container from './Banner8';
import Banner9Container from './Banner9';
import Banner10Container from './Banner10';

import MobileBanner0Container from './Mobile/MobileBanner0';
import MobileBanner1Container from './Mobile/MobileBanner1';
import MobileBanner3Container from './Mobile/MobileBanner3';
import MobileBanner6Container from './Mobile/MobileBanner6';
import MobileBanner2Container from './Mobile/MobileBanner2';
import MobileBanner4Container from './Mobile/MobileBanner4';
import MobileBanner5Container from './Mobile/MobileBanner5';
import MobileBanner7Container from './Mobile/MobileBanner7';
import MobileBanner8Container from './Mobile/MobileBanner8';
import MobileBanner9Container from './Mobile/MobileBanner9';
import MobileBanner10Container from './Mobile/MobileBanner10';

import TabletBanner0Container from 'containers/Home/Tablet/TabletBanner0';
import TabletBanner1Container from 'containers/Home/Tablet/TabletBanner1';
import TabletBanner2Container from 'containers/Home/Tablet/TabletBanner2';
import TabletBanner3Container from 'containers/Home/Tablet/TabletBanner3';
import TabletBanner4Container from 'containers/Home/Tablet/TabletBanner4';
import TabletBanner5Container from 'containers/Home/Tablet/TabletBanner5';
import TabletBanner6Container from 'containers/Home/Tablet/TabletBanner6';
import TabletBanner7Container from 'containers/Home/Tablet/TabletBanner7';
import TabletBanner8Container from 'containers/Home/Tablet/TabletBanner8';
import TabletBanner9Container from 'containers/Home/Tablet/TabletBanner9';


@inject('Home')
@observer
class HomeConatiner extends React.Component{
	state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  }
	componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
	};
  render(){
		const { width, reqList } = this.props;
    return(
			<>
			{width < 767.98 ? (
				<>
				<CustomContainer>
					<MobileBanner0Container />
					<MobileBanner10Container />
					<MobileBanner1Container />
					<MobileBanner2Container />
					<MobileBanner3Container />
					<MobileBanner4Container />
					<MobileBanner5Container />
					<MobileBanner6Container />
					<MobileBanner7Container />
					<MobileBanner8Container />
					<MobileBanner9Container />
				</CustomContainer>
				</>
			):(767.99 < width && width < 1279.98)  ? (
				<>
				  <CustomContainer>
					<TabletBanner0Container/>
					<TabletBanner1Container/>
					<TabletBanner2Container/>
					<TabletBanner3Container/>
					<TabletBanner4Container/>
					<TabletBanner5Container/>
					<TabletBanner6Container/>
					<TabletBanner7Container/>
					<TabletBanner8Container/>
					<TabletBanner9Container/>
				  </CustomContainer>
				</>
			
				):(
					<>
					<CustomContainer>
					<Banner0Container />
					<Banner10Container />
					<Banner1Container />
					<Banner2Container />
					<Banner3Container />
					<Banner4Container />
					<Banner5Container />
					<Banner6Container />
					<Banner7Container />
					<Banner8Container />
					<Banner9Container />
					</CustomContainer>
					</>
				)
			}
				{/*
				<Banner style={{marginTop: 101}}>
				
					<Containerv1 style={{ alignItems: 'center'}}>
						<Fade bottom>
						<img src = {clock} style = {{width: 576.1, height: 263}}></img>
						
						<BannerText style={{marginLeft: 137.9}}>
							<p>컨설턴트 중 해당 제품</p>
							<span></span><span>1초만에</span><span> 내 제품<br/>
								가견적 받기
							</span>
							<div style={{marginTop: 114}}>평균 48시간의 견적 시간을 450건의 의뢰 데이터를<br/>
										기반으로 클릭 한 번으로 해결해 드립니다.
							</div>
						</BannerText>
						</Fade>
					</Containerv1>
				</Banner>
				
				<Banner style={{backgroundColor: "#f6f6f6"}}>

					<Containerv1 style={{ alignItems: 'center'}}>
					<Fade bottom>
						<BannerText style={{marginRight: 242}}>
							<p>무료 도면 수정 서비스</p>
							<span>전문 엔지니어의<br/></span>
							<span>무료 도면 수정</span>
							<span><br/>서비스 제공</span>
							<div style={{marginTop: 38}}>볼트앤너트 기술팀이 제작하신 금속가공, 금형/사출<br/>
							도면의 생산성을 검토하고 수정해드립니다.
							</div>
						</BannerText>
						<img src = {banner2} style = {{width: 588, height: 392}}></img>
					</Fade>
					</Containerv1>
					
				</Banner>

				<Banner src = {banner3bg}>
					
					<Containerv1 style = {{alignItems: 'center'}} >	
					<Fade bottom>
						<img src = {banner3}></img>
						<BannerText style = {{marginLeft: 126}}>
							<p style={{color: '#ffffff'}}>컨설턴트 중 해당 제품</p>
							<span style={{color: '#ffffff'}}>5000여개의 제조사 중<br/>딱 맞는 전문가를 매칭</span>
							<div style={{color: '#ffffff'}}>200여개 이상의 프로젝트 데이터를 학습한 AI 매칭<br/>
									 알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
							</div>
						</BannerText>
						</Fade>
					</Containerv1>
					
				</Banner>

				<Banner src = {banner4bg}>
					<Containerv1 style = {{alignItems: 'center'}} >	
					<Fade bottom>
						<BannerText style = {{marginRight: 187}}>
							<p>컨설턴트 중 해당 제품</p>
							<span>40년 경력의 전문<br/>컨설턴트</span><span> 무료 상담</span>
							<div>컨설턴트 중 해당 제품의 전문가가 배정되어<br/>
									 무료상담을 통해 최적의 솔루션을 찾아드립니다.
							</div>
						</BannerText>
						<img src = {banner4} style = {{transform:"scaleX(-1)"}}></img>
						</Fade>
					</Containerv1>
				</Banner>


				<Banner src = {banner5bg}>
					<Containerv1 style = {{alignItems: 'center'}} >	
					<Fade bottom>
						<img src = {banner5}></img>
						<BannerText style = {{marginLeft: 126}}>
							<p>컨설턴트 중 해당 제품</p>
							<span>7가지 계약 관리<br/>서비스로 계약 이행<br/></span>
							<span>100% 보증</span>
							<div>200여개 이상의 프로젝트 데이터를 학습한 AI 매칭<br/>
									 알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
							</div>
						</BannerText>
						</Fade>
					</Containerv1>
				</Banner>

				<Banner src = {banner5bg}>
					<Containerv1 style = {{alignItems: 'center'}} >	
					<Fade bottom>
						<img src = {banner5}></img>
						<BannerText style = {{marginLeft: 126}}>
							<p>컨설턴트 중 해당 제품</p>
							<span>7가지 계약 관리<br/>서비스로 계약 이행<br/></span>
							<span>100% 보증</span>
							<div>200여개 이상의 프로젝트 데이터를 학습한 AI 매칭<br/>
									 알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
							</div>
						</BannerText>
						</Fade>
					</Containerv1>
				</Banner>
				*/}
				</>
    )
  }
}

export default HomeConatiner



const CustomContainer = styled.div`
  background-color: #ffffff;
  overflow: hidden;
`