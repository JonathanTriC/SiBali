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
import { isEmpty } from 'lodash';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  date_of_birth: yup.string().required('Please enter your date of birth'),
  nationality: yup.string().required('Please enter your nationality'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;
type FormType = 'name' | 'email' | 'date_of_birth' | 'nationality' | 'password';

const useRegister = () => {
  const { popScreen, navigateScreen } = useNavigate();

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
        date_of_birth: '',
        nationality: '',
        password: '',
      },
      resolver: yupResolver(formSchema),
    });

  const { mutate: submitRegister } = useMutation<
    RegisterResponse,
    ApiError<AuthErrorResponse>
  >({
    mutationKey: ['register'],
    mutationFn: async () => {
      const { name, email, password, date_of_birth, nationality } = getValues();

      const body = {
        name: name?.trim(),
        email: email?.trim(),
        password: password?.trim(),
        date_of_birth: dayjs(date_of_birth).format('YYYY-MM-DD'),
        nationality: nationality?.trim(),
      };
      console.log('🚀 ~ useRegister ~ body:', body);

      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth.register}`,
        body,
        tags: 'registerAuth',
      });

      return data?.data;
    },
    onSuccess: data => {
      console.log('Register successful! Token:', data?.accessToken);
      handleNavigateInterests(data);
    },
    onError: data => {
      console.log('Register failed! Error:', data?.data?.errors);
      return data?.data?.errors?.map(item => {
        return setError(item?.field as FormType, {
          type: 'manual',
          message: item.message,
        });
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
      console.log('🚀 ~ useRegister ~ date:', date?.toString());
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setUserDob(date);
      setValue('date_of_birth', formattedDate?.toString());
      setError('date_of_birth', {
        type: 'manual',
        message: '',
      });
      handleShowModalDatePicker();
    },
    [handleShowModalDatePicker, setValue, setError],
  );

  const handleNavigateInterests = useCallback(
    async (userData: RegisterResponse) => {
      if (isEmpty(userData)) return;

      const { accessToken, refreshToken, user } = userData;
      if (!accessToken || !refreshToken || !user) return;

      console.log({ accessToken });
      await handlerSetItem(Keys.accessToken, accessToken);
      await handlerSetItem(Keys.refreshToken, refreshToken);
      await handlerSetItem(Keys.userData, JSON.stringify(user));

      navigateScreen('Auth', { screen: 'InterestsScreen' });
    },
    [navigateScreen],
  );

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitRegister();
  }, [submitRegister]);

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
