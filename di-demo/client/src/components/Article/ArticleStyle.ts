import { themeColor, themeSpacing } from '@datapunt/asc-ui';
import styled from 'styled-components';

import Article from './Article';

const ArticleStyle = styled(Article)`
   border-right: 2px solid black;
   padding-bottom: 16px;
   margin-bottom: 28px;

   a {
     color: ${themeColor('tint', 'level7')};
     text-decoration: none;
     display: flex
         flex-direction: column;

     h2 {
       margin-bottom: ${themeSpacing(5)};
     }

     img {
       width: 100%;
       margin-bottom: ${themeSpacing(4)};
     }

     div {
       margin-bottom: ${themeSpacing(3)};
     }

     span {
       margin-right: ${themeSpacing(3)};
       align-self: flex-end;
     }
   }
 `;

export default ArticleStyle;
