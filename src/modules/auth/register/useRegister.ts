import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { apiPostWithoutToken } from '@api';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { URL_PATH } from '@constants/url';
import { COUNTRIES, handlerSetItem, Keys } from '@constants';
import dayjs from 'dayjs';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  dob: yup.string().required('Please enter your dob'),
  nationality: yup.string().required('Please enter your nationality'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;
type FormType = 'name' | 'email' | 'password';

const useRegister = () => {
  const { popScreen, resetNavigate, navigateScreen } = useNavigate();

  const [userDob, setUserDob] = useState<Date>(new Date());
  const [filteredCountries, setFilteredCountries] =
    useState<CountriesList[]>(COUNTRIES);
  const [searchCountryQuery, setSearchCountryQuery] = useState<string>('');
  const [isShownModalDatePicker, setIsShowModalDatePicker] =
    useState<boolean>(false);
  const [isShownModalNationality, setIsShowModalNationality] =
    useState<boolean>(false);

  const { control, setValue, getValues, setError, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        name: '',
        email: '',
        dob: '',
        nationality: '',
        password: '',
      },
      resolver: yupResolver(formSchema),
    });

  const { mutate: submitRegister } = useMutation<
    RegisterResponse,
    ApiError<AuthErrorResponse[]>
  >({
    mutationKey: ['register'],
    mutationFn: async () => {
      const { name, email, password } = getValues();

      const body = {
        name: name?.trim(),
        email: email?.trim(),
        password: password?.trim(),
      };

      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth.register}`,
        body,
        tags: 'registerAuth',
      });

      return data?.data;
    },
    onSuccess: data => {
      console.log('Register successful! Token:', data.token);
      handleNavigateHome(data.token ?? '');
    },
    onError: data => {
      console.log('Register failed! Error:', data?.message);
      setError(data?.errors?.[0]?.field as FormType, {
        type: 'manual',
        message: data?.errors?.[0].message,
      });
    },
  });

  const searchCountry = (query: string) => {
    return COUNTRIES.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const onSelectCountry = (country: CountriesList) => {
    setValue('nationality', country?.name ?? '');
    setSearchCountryQuery('');
    setError('nationality', {});
    handleShowModalNationality();
  };

  const handleShowModalDatePicker = useCallback(() => {
    setIsShowModalDatePicker(prevState => !prevState);
  }, []);

  const handleShowModalNationality = useCallback(() => {
    setIsShowModalNationality(prevState => !prevState);
  }, []);

  const handleSetUserDob = useCallback(
    (date: Date) => {
      console.log('🚀 ~ useRegister ~ date:', date);
      const formattedDate = dayjs(date).format('DD MMMM YYYY');
      setUserDob(date);
      setValue('dob', formattedDate?.toString());
      handleShowModalDatePicker();
    },
    [handleShowModalDatePicker, setValue],
  );

  const handleNavigateInterests = useCallback(() => {
    navigateScreen('Auth', { screen: 'InterestsScreen' });
  }, [navigateScreen]);

  const handleNavigateHome = useCallback(
    async (token: string) => {
      if (!token) return;
      console.log({ token });
      await handlerSetItem(Keys.userToken, token);

      resetNavigate('Main', { screen: 'HomeScreen' });
    },
    [resetNavigate],
  );

  // const onSubmit = useCallback(() => {
  //   Keyboard.dismiss();
  //   submitRegister();
  // }, [submitRegister]);

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    handleNavigateInterests();
  }, [handleNavigateInterests]);

  useEffect(() => {
    setFilteredCountries(searchCountry(searchCountryQuery));
  }, [searchCountryQuery]);

  return {
    control,
    userDob,
    filteredCountries,
    isShownModalDatePicker,
    isShownModalNationality,
    popScreen,
    setSearchCountryQuery,
    onSelectCountry,
    handleSetUserDob,
    handleShowModalDatePicker,
    handleShowModalNationality,
    handleSubmit,
    submitRegister,
    onSubmit,
  };
};

export default useRegister;
