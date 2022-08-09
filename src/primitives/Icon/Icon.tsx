import React from 'react';
import styled from 'styled-components';

import iconsList from 'primitives/Icon/iconsList';

interface IIconProps {
  className?: string;
  name: keyof typeof iconsList;
  alt: string;
}

function Icon({ name, className }: IIconProps) {
  // @ts-ignore
  const IconSvg = iconsList[name].default as any;
  return <IconSvg className={className} />;
}

export default styled(React.memo(Icon))<IIconProps>`
  width: 48px;
  height: 58px;
  filter: invert();
`;
