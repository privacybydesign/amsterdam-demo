import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Row, themeSpacing, themeColor } from '@amsterdam/asc-ui';
import AppRoutes from '@app/AppRoutes';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Alert as AlertIcon } from '@amsterdam/asc-assets';
import Footer from '@components/Footer/Footer';
import content from '@services/content';

interface IProps {
    className?: string;
}

declare global {
    interface Document {
        documentMode?: any;
    }
}

const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const PageTemplate: React.FC<IProps> = ({ children, className }) => {
    const location = useLocation();
    return (
        <StyledRow className={className}>
            <AscLocal.Header fullWidth={false} tall homeLink={AppRoutes.HOMEPAGE.path} />
            <StyledColumn span={12}>
                {isIE && location.pathname !== '/ie-support' && (
                    <AscLocal.Alert
                        color={AscLocal.AlertColor.ERROR}
                        icon={<AlertIcon />}
                        iconSize={22}
                        heading={content.ieSupport.errorAlert.heading}
                        content={content.ieSupport.errorAlert.content}
                        dataTestId="hasErrorAlert"
                    />
                )}
                {children}
            </StyledColumn>
            <Footer />
        </StyledRow>
    );
};

const StyledColumn = styled(AscLocal.Column)`
    margin: ${themeSpacing(5)} 0;
    max-width: 940px;
`;

const StyledRow = styled(Row)`
    background-color: ${themeColor('tint', 'level1')};
    flex-direction: column;
    overflow-x: hidden;
`;

export default PageTemplate;
