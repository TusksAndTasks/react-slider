import React from 'react';
import styled from 'styled-components';

import Typography from '../primitives/Typography';
import { TextModeEnum } from '../primitives/Typography';
import { ICounterProps } from './Slider'; // FIXME компоненты не должны зависеть друг от друга, в данном случае PageCounter это часть компонента Slider
import { colors } from '../Theme/colors';

function PageCounter({ currentPage, pagesTotal }: ICounterProps) {
  return (
    <StyledCounter as="p" mode={TextModeEnum.SLIDEINFO} color={colors.WHITE}>
      {currentPage > pagesTotal ? 1 : currentPage}/{pagesTotal}
    </StyledCounter>
  );
}

export default React.memo(PageCounter);

const StyledCounter = styled(Typography)`
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
`;
