import React from 'react';
import styled from 'styled-components';
import Containerv1 from 'components/Containerv1';
import Background from 'components/Background';

import Content1 from 'containers/Project/Detail/Content1';
import Content2 from 'containers/Project/Detail/Content2';
import ContentSub from 'containers/Project/Detail/ContentSub';
import Content3 from 'containers/Project/Detail/Content3';
import BannerContainer from './Banner';

class Test extends React.Component {
	render() {
		return (
			<>
				<Background
					style={{
						display: 'inline-flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'start',
						marginTop: 50,
					}}
				>
					<Containerv1>
						<Container13>
							<Content1 />
							<Content2 />
						</Container13>
						<ContentSub />
					</Containerv1>
				</Background>

				<Content3 />
			</>
		);
	}
}

export default Test;

const Container13 = styled.div`
	width: 996px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
