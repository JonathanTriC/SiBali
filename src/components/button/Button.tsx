import { Colors } from '@constants/colors';
import MaterialDesignIcons, {
  MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type ButtonProps = {
  label?: string;
  icon?: MaterialDesignIconsIconName;
  color?: string;
  background?: string;
  action?: () => void;
  top?: number;
  iconLeft?: MaterialDesignIconsIconName;
  bottom?: number;
  borderWidth?: number;
  borderColor?: string;
  isDisabled?: boolean;
  style?: TouchableOpacityProps['style'];
  outline?: boolean;
  danger?: boolean;
  success?: boolean;
  primaryLight?: boolean;
  fontSize?: number;
  customDisabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  padding?: ViewStyle['padding'];
  margin?: ViewStyle['margin'];
  children?: React.ReactNode;
};

const Button = ({
  label,
  icon,
  color = Colors.white,
  background = Colors.primary.base,
  action,
  top = 0,
  bottom = 0,
  isDisabled = false,
  outline = false,
  style = {},
  danger = false,
  success = false,
  primaryLight = false,
  fontSize = 16,
  borderColor = 'transparent',
  borderWidth = 0,
  customDisabled = false,
  iconLeft,
  textStyle,
  testID,
  padding,
  children,
}: ButtonProps) => {
  return (
    <Pressable
      testID={testID}
      disabled={customDisabled || isDisabled}
      onPress={action}
      style={({ pressed }) => [
        styleProps(
          isDisabled,
          top,
          bottom,
          background,
          color,
          outline,
          danger,
          success,
          primaryLight,
          fontSize,
          borderColor,
          borderWidth,
          pressed,
          padding,
        ).container,
        style,
      ]}
    >
      {iconLeft && (
        <MaterialDesignIcons
          name={iconLeft}
          size={fontSize + 6}
          color={
            primaryLight
              ? Colors.primary.base
              : danger
              ? Colors.danger.base
              : success
              ? Colors.white
              : color
          }
        />
      )}

      {children ? (
        children
      ) : (
        <Text
          allowFontScaling={false}
          style={[
            styleProps(
              isDisabled,
              top,
              bottom,
              background,
              color,
              outline,
              danger,
              success,
              primaryLight,
              fontSize,
              borderColor,
              borderWidth,
            ).text,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}

      {icon && (
        <MaterialDesignIcons
          name={icon}
          size={fontSize + 6}
          color={
            primaryLight
              ? Colors.primary.base
              : danger
              ? Colors.danger.base
              : success
              ? Colors.white
              : color
          }
        />
      )}
    </Pressable>
  );
};

const styleProps = (
  isDisabled: boolean,
  top: number,
  bottom: number,
  background: string,
  color: string,
  outline: boolean,
  danger: boolean,
  success: boolean,
  primaryLight: boolean,
  fontSize: number,
  borderColor: string,
  borderWidth: number,
  pressed?: boolean,
  padding?: ViewStyle['padding'],
) =>
  StyleSheet.create({
    container: {
      padding: padding,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 16,
      backgroundColor: isDisabled
        ? Colors.primary.disabled
        : danger
        ? Colors.danger.base
        : success
        ? Colors.success.base
        : primaryLight
        ? Colors.white
        : outline
        ? Colors.white
        : background,
      borderColor: outline ? Colors.primary.base : borderColor,
      marginTop: top,
      marginBottom: bottom,
      borderWidth: outline ? 2 : borderWidth ? borderWidth : 0,
      paddingVertical: 16,
      opacity: pressed ? 0.5 : 1,
    },
    text: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize,
      fontWeight: '600',
      fontFamily: 'Mulish-Bold',
      color:
        primaryLight || outline
          ? Colors.primary.base
          : danger
          ? Colors.danger.base
          : success
          ? Colors.white
          : color,
    },
  });

export { Button };
