/* eslint-disable react-native/no-inline-styles */
import { FC, useState } from 'react';
import {
  Platform,
  Pressable,
  ReturnKeyTypeOptions,
  Text,
  View,
} from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import { screenWidth } from '@constants/functional';

export type TextFieldProps = {
  required?: boolean;
  label?: string;
  labelColor?: string;
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  icon?: any;
  leftIcon?: any;
  rightIcon?: any;
  iconColor?: string;
  onPressIcon?: () => void;
  errorMessage?: string;
  errorMessageStyle?: any;
  successMessage?: string;
  successMessageStyle?: any;
  value?: any;
  onChangeText: (text: string) => void;
  onBlur?: (text: any) => void;
  onFocus?: (text: any) => void;
  maxLength?: any;
  leftOnPressIcon?: any;
  leftIconColor?: any;
  disabled?: any;
  inputMode?: TextInputProps['inputMode'];
  top?: number;
  bottom?: number;
  isNotOutline?: boolean;
  secure?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  ref?: any;
  keyboardType?: TextInputProps['keyboardType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  returnKeyType?: ReturnKeyTypeOptions;
  inputTextStyle?: any;
  borderRadius?: any;
  multiline?: any;
  maskEntry?: any;
  placeholderTextColor?: any;
  onPress?: TextInputProps['onPressOut'];
  subLabel?: string;
  subLabelStyle?: any;
  editable?: boolean;
  onEndEditing?: TextInputProps['onEndEditing'];
  disabledRightIcon?: boolean;
  defaultValue?: string;
  testID?: string;
  customRightText?: React.JSX.Element;
};

const TextField: FC<TextFieldProps> = ({
  required,
  label,
  labelColor,
  error,
  placeholder,
  leftIcon,
  rightIcon,
  iconColor = Colors.primary.light2,
  onPressIcon,
  errorMessage,
  errorMessageStyle,
  successMessage,
  successMessageStyle,
  value,
  maxLength,
  onChangeText,
  top = 0,
  bottom = 0,
  isNotOutline,
  secure,
  leftOnPressIcon,
  leftIconColor = Colors.primary.light2,
  disabled,
  inputMode,
  borderColor,
  backgroundColor,
  keyboardType,
  returnKeyType,
  onBlur,
  onFocus,
  onSubmitEditing,
  inputTextStyle,
  borderRadius = 30,
  multiline,
  editable,
  maskEntry = false,
  placeholderTextColor = Colors.primary.light2,
  onEndEditing,
  subLabelStyle,
  disabledRightIcon,
  defaultValue,
  testID,
  customRightText,
  ...props
}) => {
  const [isMaskEntry, setMaskEntry] = useState(maskEntry);
  return (
    <View
      style={{
        marginTop: top,
        marginBottom: bottom,
        gap: 8,
        width: screenWidth - 40,
      }}
    >
      {label && (
        <Text
          style={{
            color: labelColor ?? Colors.neutral.base,
            letterSpacing: 0.25,
            lineHeight: 22,
          }}
        >
          {label}
          {required && <Text style={{ color: Colors.danger.base }}>*</Text>}
        </Text>
      )}
      <Pressable onPress={props.onPress}>
        <TextInput
          textColor={Colors.primary.base}
          testID={testID}
          multiline={multiline ?? false}
          disabled={disabled}
          // onPressOut={props.onPress}
          onEndEditing={onEndEditing}
          mode="outlined"
          inputMode={inputMode}
          secureTextEntry={secure && !isMaskEntry}
          activeOutlineColor={Colors.primary.base}
          editable={editable}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType ? keyboardType : 'default'}
          submitBehavior="blurAndSubmit"
          onBlur={onBlur}
          onFocus={onFocus}
          style={{
            color: Colors.white,
            fontWeight: Platform.OS === 'android' ? 'bold' : '600',
            fontSize: 14,
            textAlignVertical: 'top',
            borderColor: borderColor ? borderColor : 'transparent',
            backgroundColor: backgroundColor
              ? backgroundColor
              : isNotOutline
              ? Colors.neutral.base
              : disabled
              ? Colors.neutral.disabled
              : Colors.primary.light,
            ...inputTextStyle,
          }}
          outlineStyle={{
            borderRadius: borderRadius ?? 12,
            borderColor: errorMessage
              ? Colors.danger.base
              : successMessage
              ? Colors.success.base
              : Colors.primary.base,
            borderWidth: errorMessage || successMessage ? 1 : 1,
          }}
          error={error}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          right={
            rightIcon ? (
              <TextInput.Icon
                icon={rightIcon}
                onPress={onPressIcon}
                color={() => iconColor}
                disabled={disabledRightIcon ?? disabled}
                size={24}
              />
            ) : secure ? (
              <TextInput.Icon
                icon={isMaskEntry ? 'eye' : 'eye-off'}
                onPress={() => {
                  setMaskEntry(!isMaskEntry);
                }}
                color={() => iconColor}
                size={20}
              />
            ) : (
              customRightText
            )
          }
          left={
            leftIcon ? (
              <TextInput.Icon
                icon={leftIcon}
                onPress={leftOnPressIcon}
                color={() => leftIconColor}
                size={20}
              />
            ) : null
          }
          onChangeText={text => onChangeText?.(text)}
          value={value}
          maxLength={maxLength}
          {...props}
          autoCapitalize={'none'}
          defaultValue={defaultValue}
        />

        {props.subLabel && (
          <Text style={[styles.subLabel, subLabelStyle && subLabelStyle]}>
            {props.subLabel}
          </Text>
        )}

        {errorMessage ? (
          <Text style={[styles.errorHelperText, errorMessageStyle]}>
            {errorMessage}
          </Text>
        ) : null}

        {successMessage ? (
          <Text style={[styles.successHelperText, successMessageStyle]}>
            {successMessage}
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
};

export { TextField };
