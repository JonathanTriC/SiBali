/* eslint-disable react-native/no-inline-styles */
import {
  BottomModal,
  Button,
  LoadingModal,
  Text,
  TextField,
} from '@components';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import useEditProfile from './useEditProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import Emoji from 'react-native-emoji';
import dayjs from 'dayjs';
import { screenHeight } from '@constants';

const EditProfileScreen: React.FC = () => {
  const {
    control,
    userDob,
    filteredCountries,
    isShownModalDatePicker,
    isShownModalNationality,
    isLoadingEditProfile,
    popScreen,
    setSearchCountryQuery,
    onSelectCountry,
    handleSetUserDob,
    handleShowModalDatePicker,
    handleShowModalNationality,
    handleSubmit,
    onSubmit,
  } = useEditProfile();

  const renderItemCountry = ({ item }: { item: CountriesList }) => {
    return (
      <TouchableOpacity onPress={() => onSelectCountry(item)}>
        <View style={styles.countryItem}>
          <Emoji
            name={item?.image ?? ''}
            style={{ fontSize: 18 }}
            allowFontScaling={false}
          />
          <Text>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.screen}>
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
            text="Edit Profile"
            type="bold-lg"
            textAlign="center"
            color={Colors.neutral.base}
          />
        </View>
        <View style={styles.rightHeader} />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Title */}
          <View style={globalStyles.gap8}>
            <Text
              text="Edit your Profile"
              type="bold-2xl"
              color={Colors.neutral.base}
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
                  disabled={true}
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
              name={'date_of_birth'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  editable={false}
                  label="Date of Birth"
                  placeholder="DD MMMM YYYYY"
                  leftIcon="calendar-outline"
                  onPress={handleShowModalDatePicker}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value ? dayjs(value)?.format('DD MMMM YYYY') : ''}
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'nationality'}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  editable={false}
                  label="Nationality"
                  placeholder="Choose your nationality"
                  leftIcon="card-account-details-outline"
                  onPress={handleShowModalNationality}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={error?.message}
                />
              )}
            />
          </View>

          {/* Button */}
          <View
            style={[globalStyles.gap10, { width: '100%', marginBottom: 20 }]}
          >
            <View>
              <Button label="Save Profile" action={handleSubmit(onSubmit)} />
            </View>
          </View>

          <DatePicker
            modal
            mode="date"
            open={isShownModalDatePicker}
            date={userDob}
            onConfirm={handleSetUserDob}
            onCancel={handleShowModalDatePicker}
          />

          <BottomModal
            useKeyboardAvoidingView
            isVisible={isShownModalNationality}
            title="Select Your Nationality"
            style={{ height: screenHeight / 2.5 }}
            onPressClose={handleShowModalNationality}
            scrollable={false}
            useScrollView={false}
          >
            <View>
              <View style={{ marginBottom: 20 }}>
                <TextField
                  placeholder={'Search Country'}
                  onChangeText={text => {
                    setSearchCountryQuery(text);
                  }}
                />
              </View>
              <FlatList
                data={filteredCountries}
                ListEmptyComponent={<Text text="No Data" />}
                ItemSeparatorComponent={renderSeparator}
                renderItem={renderItemCountry}
                fadingEdgeLength={20}
                keyExtractor={item => `${item?.code}~${item?.dialCode}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
              />
            </View>
          </BottomModal>
        </View>
      </KeyboardAwareScrollView>

      <LoadingModal isVisible={isLoadingEditProfile} />
    </View>
  );
};

export { EditProfileScreen };
