import styled from 'styled-components';
import {
	ClickableDiv,
	CenteredFlexBox,
	SPACING,
	SvgWrapperButton,
	BaseLink,
} from '../../_styles';
import { theme } from '../../_styles/Theme';

export const NavLogoArea = styled(ClickableDiv)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export const NavContainer = styled.div`
	font-weight: 500;
	font-size: 1em;
	${CenteredFlexBox}
	border-bottom: 1px solid rgb(236, 239, 241);
	z-index: 5;
	position: sticky;
	top: 0;
	background-color: white;
	width: 100%;
	height: ${SPACING.NavbarHeight};
`;

export const NavFlexSpacer = styled.div`
	width: 100%;
	height: 100%;
`;

export const NavAccountContainer = styled.div`
	position: relative;
	height: 100%;
	${CenteredFlexBox};
`;

export const ToggleSidebar = styled.div`
	${CenteredFlexBox}
	position: absolute;
	left: 0;
	height: ${SPACING.NavbarHeight};
	width: ${SPACING.NavbarHeight};
	&:hover {
		background: ${theme.palette.grey[100]};
	}
`;

export const BrandingContainer = styled.div``;

export const BrandTextLink = styled(BaseLink)`
	font-size: 2rem;
	$:hover {
		color: var(--accent-color);
	}
`;

export const NavAccountText = styled(ClickableDiv)`
	white-space: nowrap;
	&:hover {
		color: var(--accent-base);
	}
`;
