import React from 'react';
import styled from 'styled-components';

import Typography, { TypographyMode } from 'primitives/Typography';

import { colors } from '../Theme/colors';

export interface ICounterProps {
  currentNumber: number;
  total: number;
}

function Counter({ currentNumber, total }: ICounterProps) {
  return (
    <StyledCounter as="p" mode={TypographyMode.FIGCAPTION} color={colors.WHITE}>
      {currentNumber}/{total}
    </StyledCounter>
  );
}

export default React.memo(Counter);

const StyledCounter = styled(Typography)`
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
`;
