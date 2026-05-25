import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
  TextStyle,
} from 'react-native';
import { fontFamily, fontSize, lineHeight } from './TextStyle';
import type { Text as TextType } from './TextType';

export interface TextProps extends TextRNProps {
  type?: TextType;
  color?: ColorProp;
  children?: ReactNode;
  textAlign?: TextStyle['textAlign'];
  text?: string;
}

const Text: React.FC<TextProps> = ({
  type = 'regular-base',
  color = 'neutral.base',
  textAlign,
  text,
  children,
  style,
  ...props
}) => {
  const content = text || children;

  return (
    <TextRN
      {...props}
      style={StyleSheet.flatten([
        {
          fontFamily: fontFamily[type],
          fontSize: fontSize[type],
          lineHeight: !style ? lineHeight[type] : undefined,
          color,
          textAlign,
        },
        style,
      ])}
    >
      {content}
    </TextRN>
  );
};

export { Text };
