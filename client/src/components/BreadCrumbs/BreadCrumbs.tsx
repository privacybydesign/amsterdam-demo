import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Icon, themeColor, themeSpacing, breakpoint, Theme } from '@amsterdam/asc-ui';
import { ChevronRight } from '@amsterdam/asc-assets';
import { BreadCrumbItem, IBreadCrumbItemProps } from './BreadCrumbItem';

interface IBreadCrumbsProps {
    className?: string;
}

interface IBreadCrumbsComposition {
    Item: React.FC<IBreadCrumbItemProps>;
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> & IBreadCrumbsComposition = ({ children, className }) => {
    const themeContext = { theme: useContext(ThemeContext) as Theme.ThemeInterface };
    const iconColor = themeColor('tint', 'level5')(themeContext);

    return (
        <Container className={className} aria-label="Breadcrumbs" data-testid="breadCrumbs">
            {React.Children.map(children, (child, index) => (
                <React.Fragment key={String(index)}>
                    {child}
                    {children instanceof Array && index < children.length - 1 && (
                        <StyledIcon size={14} color={iconColor}>
                            <ChevronRight />
                        </StyledIcon>
                    )}
                </React.Fragment>
            ))}
        </Container>
    );
};

const Container = styled.nav`
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
