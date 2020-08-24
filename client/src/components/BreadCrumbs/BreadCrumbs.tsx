import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import { Icon, themeColor, themeSpacing, breakpoint, Theme } from '@datapunt/asc-ui';
import { ChevronRight } from '@datapunt/asc-assets';
import { BreadCrumbItem, IBreadCrumbItemProps } from './BreadCrumbItem';

interface IBreadCrumbsProps {
    className?: string;
}

interface IBreadCrumbsComposition {
    Item: React.FC<IBreadCrumbItemProps>;
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> & IBreadCrumbsComposition = ({ children, className }) => {
    const themeContext = { theme: useContext(ThemeContext) as Theme.ThemeInterface };

    return (
        <Container className={className}>
            {React.Children.map(children, (child, index) => (
                <React.Fragment key={String(index)}>
                    {child}
                    {children instanceof Array && index < children.length - 1 && (
                        <StyledIcon size={14} color={themeColor('tint', 'level5')(themeContext)}>
                            <ChevronRight />
                        </StyledIcon>
                    )}
                </React.Fragment>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: ${themeSpacing(4)} 0;

    @media ${breakpoint('min-width', 'laptopM')} {
        margin: ${themeSpacing(5)} 0;
    }
`;

const StyledIcon = styled(Icon)`
    margin: 0 ${themeSpacing(1)};
`;

BreadCrumbs.Item = BreadCrumbItem;

export default BreadCrumbs;
