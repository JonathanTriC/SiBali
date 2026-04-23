/* eslint-disable react-native/no-inline-styles */
import { Text } from '@components/text';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { ReactNode } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('screen');

interface BottomModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleComponent?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  iconStyle?: TextStyle;
  rightComponent?: ReactNode;
  scrollable?: boolean;
  useScrollView?: boolean;
  useKeyboardAvoidingView?: boolean;
  keyboardAvoidingStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
  onScroll?: () => void;
  onPressClose?: (() => void) | null;
}

export const BottomModal = React.memo(
  ({
    isVisible,
    title,
    titleStyle,
    titleComponent,
    children,
    headerStyle,
    style,
    contentStyle,
    containerStyle,
    iconStyle,
    rightComponent,
    scrollable = true,
    useScrollView = true,
    useKeyboardAvoidingView = false,
    keyboardAvoidingStyle,
    keyboardVerticalOffset,
    onScroll,
    onPressClose,
  }: BottomModalProps) => {
    const insets = useSafeAreaInsets();

    const ContentWrapper = useScrollView
      ? useKeyboardAvoidingView
        ? ScrollView
        : KeyboardAwareScrollView
      : View;

    return (
      <View>
        <ReactNativeModal
          statusBarTranslucent
          isVisible={isVisible}
          onBackdropPress={onPressClose ?? undefined}
          style={styles.bottomModalWrapper}
        >
          <KeyboardAvoidingView
            enabled={useKeyboardAvoidingView}
            // behavior="position"
            style={[
              keyboardAvoidingStyle,
              {
                backgroundColor: Colors.white,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
            ]}
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          >
            <View
              style={[
                styles.container,
                {
                  maxHeight:
                    Platform.OS === 'ios' ? height - insets.top : height * 0.85,
                  paddingBottom: insets.bottom === 0 ? 20 : insets.bottom,
                },
                style,
              ]}
            >
              <View style={[styles.headerRow, headerStyle]}>
                <View style={styles.titleRow}>
                  {onPressClose && (
                    <TouchableOpacity onPress={onPressClose}>
                      <MaterialDesignIcons
                        name="close"
                        size={24}
                        color={Colors.neutral.base}
                        style={iconStyle}
                      />
                    </TouchableOpacity>
                  )}
                  {title && (
                    <Text style={[styles.title, titleStyle]} text={title} />
                  )}
                  {titleComponent && <View>{titleComponent}</View>}
                </View>

                {rightComponent && <View>{rightComponent}</View>}
              </View>
              <ContentWrapper
                style={StyleSheet.flatten([
                  styles.content,
                  containerStyle,
                  contentStyle,
                ])}
                scrollEnabled={useScrollView && scrollable}
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View>{children}</View>
              </ContentWrapper>
            </View>
          </KeyboardAvoidingView>
        </ReactNativeModal>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  bottomModalWrapper: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    // padding: 20,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral.base,
    flex: 1,
  },
  content: {
    backgroundColor: Colors.white,
  },
});
