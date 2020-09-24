import React from 'react';
import styled from 'styled-components';
import { isMobile } from '@services/createIrmaSession';
import { Link, Icon, themeSpacing, breakpoint } from '@datapunt/asc-ui';

interface IKeyValueListProps {
    title: string;
    list: any;
}

const KeyValueList: React.FC<IKeyValueListProps> = props => {
    const { list } = props;
    return (
        <StyledDL>
            {console.log('isMobile', isMobile())}
            <dt>key</dt>
            <dd>value</dd>
        </StyledDL>
    );
};

const StyledDL = styled.dl`
    dt,
    dd {
        line-height: 22px;
        widith: 100%;
        margin: 0;
    }

    dt {
        background-color: red;
        @media ${breakpoint('min-width', 'tabletM')} {
            display: inline-block;
            width: 40%;
        }
    }

    dd {
        background-color: blue;
        @media ${breakpoint('min-width', 'tabletM')} {
            display: inline-block;
            width: 60%;
        }
    }
`;

export default KeyValueList;
