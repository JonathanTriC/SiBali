import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text, TextField } from '@components';
import useLogin from './useLogin';
import { Logo } from '@assets/images';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';

const LoginScreen: React.FC = () => {
  const { control, formState, navigateScreen, handleSubmit, onSubmit } =
    useLogin();

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        {/* Title */}
        <View style={globalStyles.gap10}>
          <Text
            text="Plan Your Escape"
            type="bold-xl"
            textAlign="center"
            color={Colors.primary.base}
          />
          <Text
            text="Your Personalized Journey in Bali."
            type="regular-base"
            textAlign="center"
            color={Colors.primary.base}
          />
        </View>

        {/* Form */}
        <View style={[globalStyles.gap20, { marginVertical: 60 }]}>
          <Controller
            control={control}
            name={'email'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <TextField
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
              text="Forgot Password"
              type="bold-base"
              color={Colors.primary.base}
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={[globalStyles.gap10, { width: '100%' }]}>
          <View>
            <Button
              isDisabled={!formState.isValid}
              label="Log In"
              icon="chevron-right"
              action={handleSubmit(onSubmit)}
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
        </View>

        {/* TNC */}
        <TouchableOpacity style={styles.termsConditionContainer}>
          <Text
            text={'By continuing, you agree to our Terms\n& Privacy Policy'}
            type="regular-base"
            textAlign="center"
            color={Colors.primary.base}
            style={{ textDecorationLine: 'underline' }}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { LoginScreen };
