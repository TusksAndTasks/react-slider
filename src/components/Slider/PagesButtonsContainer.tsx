import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import SliderSettingsModel from 'store/SliderSettingsModel';

function PagesButtonsContainer({ children }: { children: React.ReactNode }) {
  const { pages } = SliderSettingsModel;

  return <>{pages && <StyledPagesContainer>{children}</StyledPagesContainer>}</>;
}

export default React.memo(observer(PagesButtonsContainer));

const StyledPagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 5px 0;
  background-color: #dcdcdc;
`;
