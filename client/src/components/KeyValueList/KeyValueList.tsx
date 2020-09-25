import React from 'react';
import styled from 'styled-components';
import * as AscLocal from '@components/LocalAsc/LocalAsc';
import { Link, Icon, themeSpacing, breakpoint } from '@datapunt/asc-ui';

interface IKeyValueListProps {
    title: string;
    list: any;
}

const KeyValueList: React.FC<IKeyValueListProps> = props => {
    const { title, list } = props;

    return (
        <>
            <AscLocal.H3>{title}</AscLocal.H3>
            <StyledDL>
                {list.map(item => (
                    <dl key={item.key}>
                        <dt>{item.key}</dt>
                        <dd>{item.value}</dd>
                    </dl>
                ))}
            </StyledDL>
        </>
    );
};

const StyledDL = styled.dl`
    dt,
    dd {
        line-height: 22px;
        vertical-align: top;
        margin: 0;
    }

    dl {
        margin: 0 0 8px 0;
    }

    dt {
        @media ${breakpoint('min-width', 'tabletM')} {
            display: inline-block;
            width: 40%;
        }
    }

    dd {
        font-weight: bold;
        @media ${breakpoint('min-width', 'tabletM')} {
            display: inline-block;
            width: 60%;
        }
    }
`;

export default KeyValueList;
