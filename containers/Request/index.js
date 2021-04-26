import React from 'react';
import styled from 'styled-components';
import BannerContainer from './Banner0';
import Step from './StepBar';
import Containerv1 from 'components/Containerv1';
// RequestCard
import RequestCardContainer from './RequestCard';
import Background from 'components/Background';
//counter
import 'react-count-animation/dist/count.min.css';

//Mobile
import MobileRequestContainer from './Mobile/Mobileindex';
import { inject, observer } from 'mobx-react';

import RequestSelectContainer from './RequestSelect';
import Step1Container from './Step1';
import Step2Container from './Step2';
import Step3Container from './Step3';
import Step4Container from './Step4';
import Step5 from './Step5';
import Step5Container from './Step5';
import Step6Container from './Step6';

import FileUploadContainer from './FileUpload';
import DisbursementContainer from './Disbursement';

import MarketingModal from './MarketingModal';
import PaymentPageContainer from './PaymentPage';
import NoneDrawingConsultingContainer from './NoneDrawingConsulting';
import RequestComplete from './RequestComplete';

@inject('DetailQuestion', 'Partner', 'Request', 'Auth')
@observer
class RequestContainer extends React.Component {
	componentDidMount = () => {
		this.props.Auth.bgColor = '#f6f6f6';
	};
	render() {
		const { Request } = this.props;

		return (
			<>
				{this.props.width >= 767.99 ? (
					<div style={{ overflow: 'visible' }}>
						{/* {Request.step_index != 0 && <BannerContainer />} */}
						<BannerContainer />

						<Background backgroundColor={'#ffffff'}>
							<Containerv1>
								<RequestComplete />
								{/* <NoneDrawingConsultingContainer /> */}
								{/* <PaymentPageContainer />
								// {Request.newIndex == 0 && <FileUploadContainer />}
								// {Request.newIndex == 1 && <PaymentPageContainer />}
								// {Request.newIndex == 2 && <NoneDrawingConsultingContainer />} */}

								{/* {Request.step_index == 0 ? (
                  <RequestSelectContainer />
                ) : (
                  <Step />
                )} */}

								{/* {Request.step_index == 1 && <Step1Container page={Request.step1_index} />}
								{Request.step_index == 2 && <Step2Container />}
								{Request.step_index == 3 && <Step3Container />}
								{Request.step_index == 4 && <Step4Container />}
								{Request.step_index == 5 && <Step5Container />}
								{Request.step_index == 6 && <Step6Container />} */}
							</Containerv1>
						</Background>
					</div>
				) : (
					<>
						<MobileRequestContainer />
					</>
				)}
			</>
		);
	}
}

export default RequestContainer;
