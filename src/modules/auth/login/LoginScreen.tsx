/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, LoadingModal, Text, TextField } from '@components';
import { Logo } from '@assets/images';
import { Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { Colors } from '@constants/colors/Colors';
import { globalStyles } from '@constants/globalStyles';
import useLogin from './useLogin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen: React.FC = () => {
  const {
    control,
    formState,
    isLoadingLogin,
    navigateScreen,
    handleSubmit,
    onSubmit,
  } = useLogin();

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#005B8C', '#083344']}
            start={{ x: 0.85, y: 0.85 }}
            end={{ x: 0.15, y: 0.15 }}
            style={styles.headerBackground}
          />
          <View style={styles.gap40}>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <View style={styles.gap8}>
              <Text
                text="Plan Your Escape"
                type="bold-2xl"
                color={Colors.white}
                textAlign="center"
              />
              <Text
                text="Your Personalized Journey in Bali."
                type="regular-base"
                color={Colors.white}
                textAlign="center"
              />
            </View>
          </View>
        </View>

        <View style={styles.container}>
          {/* Form */}
          <View style={[globalStyles.gap20]}>
            <Controller
              control={control}
              name={'email'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  label="Email"
                  placeholder="Email Address"
                  leftIcon="email-outline"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="email-address"
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'password'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  secure
                  label="Password"
                  placeholder="Password"
                  leftIcon="lock"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  returnKeyType="done"
                  errorMessage={error?.message}
                />
              )}
            />

            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Text
                text="Forgot Password?"
                type="bold-base"
                color={Colors.primary.base}
              />
            </TouchableOpacity>
          </View>

          {/* Button */}
          <View style={[globalStyles.gap20, { width: '100%' }]}>
            <View>
              <Button
                isDisabled={!formState.isValid}
                label="Log In"
                action={handleSubmit(onSubmit)}
              />
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: Colors.neutral.secondaryDark,
                }}
              />
              <Text
                text="or"
                type="regular-base"
                color={Colors.neutral.secondary}
              />
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: Colors.neutral.secondaryDark,
                }}
              />
            </View>
            <View>
              <Button
                label="Create Account"
                primaryLight
                action={() =>
                  navigateScreen('Auth', { screen: 'RegisterScreen' })
                }
              />
            </View>

            <View style={[globalStyles.gap20, { marginBottom: 20 }]}>
              <View>
                <Text textAlign="center">
                  <Text
                    text="By creating an account, you agree to our "
                    type="regular-base"
                    color={Colors.neutral.secondary}
                  />
                  <Text
                    text="Terms"
                    type="regular-lg"
                    color={Colors.primary.base}
                    onPress={() => {}}
                  />
                  <Text
                    text=" and "
                    type="regular-base"
                    color={Colors.neutral.secondary}
                  />
                  <Text
                    text="Privacy Policy"
                    type="regular-lg"
                    color={Colors.primary.base}
                    onPress={() => {}}
                  />
                </Text>
              </View>

              {/* Copyright */}
              <Text
                text="© 2026 BINUS University. All rights reserved."
                type="regular-sm"
                color={Colors.neutral.secondary}
                textAlign="center"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <LoadingModal isVisible={isLoadingLogin} />
    </View>
  );
};

export { LoginScreen };
