import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text, TextField } from '@components';
import { styles } from './styles';
import { Colors } from '@constants/colors';
import useRegister from './useRegister';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { BlobAuth } from '@assets/images';
import { globalStyles } from '@constants/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';

const RegisterScreen: React.FC = () => {
  const { control, popScreen, handleSubmit, onSubmit } = useRegister();

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.blobContainer}>
          <BlobAuth width={140} height={140} />
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => popScreen()}
          >
            <MaterialDesignIcons
              name="chevron-left"
              size={24}
              color={Colors.primary.base}
            />
          </TouchableOpacity>

          <View style={globalStyles.flex1}>
            <Text
              text="Sign Up"
              type="bold-lg"
              textAlign="center"
              color={Colors.primary.base}
            />
          </View>
          <View style={styles.rightHeader} />
        </View>

        <View style={styles.personalizeBadge}>
          <MaterialDesignIcons
            name="creation-outline"
            size={16}
            color={Colors.primary.base}
          />
          <Text
            text="Personalize your trip"
            type="bold-base"
            color={Colors.primary.base}
          />
        </View>

        <View style={globalStyles.gap10}>
          <Text>
            <Text
              text={'Customize your\n'}
              type="bold-2xl"
              color={Colors.neutral.base}
            />
            <Text
              text="Bali Experience"
              type="bold-2xl"
              color={Colors.primary.base}
            />
          </Text>

          <Text
            text={
              'Create a profile so we can curate the perfect\nitinerary based on your unique interests.'
            }
            type="regular-base"
            color={Colors.primary.base}
          />
        </View>

        {/* Form */}
        <View style={[globalStyles.gap20, { marginVertical: 30 }]}>
          <Controller
            control={control}
            name={'fullName'}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                label="Full Name"
                placeholder="e.g Si Bali"
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
                placeholder="e.g example@mail.com"
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
                placeholder="Password"
                subLabel="Must be at least 8 characters"
                subLabelStyle={{ fontWeight: 'bold' }}
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
            <Button
              label="Start My Profile"
              icon="chevron-right"
              action={handleSubmit(onSubmit)}
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

export { RegisterScreen };
