import { styled } from 'styled-components';
import { GRAY_500 } from '../../../utils/constants';

export const BackWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	ion-icon {
		width: 28px;
		height: 28px;
		color: ${GRAY_500};
	}
`;
