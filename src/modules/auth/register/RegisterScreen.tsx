/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text, TextField } from '@components';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import useRegister from './useRegister';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles } from '@constants/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';

const RegisterScreen: React.FC = () => {
  const { control, popScreen, handleSubmit, onSubmit } = useRegister();

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => popScreen()}>
            <MaterialDesignIcons
              name="arrow-left"
              size={24}
              color={Colors.neutral.base}
            />
          </TouchableOpacity>

          <View style={globalStyles.flex1}>
            <Text
              text="Sign Up"
              type="bold-lg"
              textAlign="center"
              color={Colors.neutral.base}
            />
          </View>
          <View style={styles.rightHeader} />
        </View>

        <View style={styles.container}>
          {/* Title */}
          <View style={globalStyles.gap8}>
            <Text
              text="Create your account"
              type="bold-2xl"
              color={Colors.neutral.base}
            />
            <Text
              text={'Join SIBALI to discover your perfect Bali\nadventure'}
              type="regular-lg"
              color={Colors.neutral.secondary}
            />
          </View>

          {/* Form */}
          <View style={[globalStyles.gap20, { marginVertical: 30 }]}>
            <Controller
              control={control}
              name={'name'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  label="Full Name"
                  placeholder="Enter your full name"
                  leftIcon="account-outline"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'email'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  label="Email Address"
                  placeholder="Enter your email"
                  leftIcon="email-outline"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
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
                  label="Create Password"
                  placeholder="Create a password"
                  subLabel="Must be at least 8 characters"
                  leftIcon="lock"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
          </View>

          {/* Button */}
          <View style={[globalStyles.gap10, { width: '100%' }]}>
            <View>
              <Button label="Create Account" action={handleSubmit(onSubmit)} />
            </View>
          </View>

          {/* TNC */}
          <View style={styles.termsConditionContainer}>
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
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { RegisterScreen };
