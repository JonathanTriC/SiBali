import { apiPut } from '@api';
import {
  COUNTRIES,
  handlerGetAndParseJSON,
  handlerSetItem,
  Keys,
  showErrorToast,
} from '@constants';
import { URL_PATH } from '@constants/url';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@hooks';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  date_of_birth: yup.string().required('Please enter your date of birth'),
  nationality: yup.string().required('Please enter your nationality'),
});

type FormData = yup.InferType<typeof formSchema>;

const useEditProfile = () => {
  const { popScreen } = useNavigate();

  const [userData, setUserData] = useState<User | null>(null);

  const [userDob, setUserDob] = useState<Date>(
    userData?.date_of_birth ? new Date(userData.date_of_birth) : new Date(),
  );
  const [filteredCountries, setFilteredCountries] =
    useState<CountriesList[]>(COUNTRIES);
  const [searchCountryQuery, setSearchCountryQuery] = useState<string>('');
  const [isShownModalDatePicker, setIsShowModalDatePicker] =
    useState<boolean>(false);
  const [isShownModalNationality, setIsShowModalNationality] =
    useState<boolean>(false);

  const handleGetUserData = async () => {
    const data = await handlerGetAndParseJSON<User>(Keys.userData);
    return setUserData(data);
  };

  const { control, setValue, setError, getValues, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        name: userData?.name ?? '',
        email: userData?.email ?? '',
        date_of_birth: userData?.date_of_birth ?? '',
        nationality: userData?.nationality ?? '',
      },
      resolver: yupResolver(formSchema),
    });

  const { mutate: submitEditProfile, isPending: isLoadingEditProfile } =
    useMutation<EditProfile, ApiError<AuthErrorResponse>>({
      mutationKey: ['edit-profile'],
      mutationFn: async () => {
        const { name, date_of_birth, nationality } = getValues();

        const body = {
          name: name?.trim(),
          date_of_birth: dayjs(date_of_birth).format('YYYY-MM-DD'),
          nationality: nationality?.trim(),
        };
        console.log('🚀 ~ useEditProfile ~ body:', body);

        const data = await apiPut({
          url: `${URL_PATH.users.profile}`,
          body,
        });

        return data?.data;
      },
      onSuccess: data => {
        console.log('🚀 ~ useEditProfile ~ data:', data);
        handleNavigate(data ?? {});
      },
      onError: data => {
        console.log('Register failed! Error:', data?.data);
        return showErrorToast(data?.data?.message ?? '', 'top');
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

  const handleNavigate = useCallback(
    async (data: EditProfile) => {
      console.log('🚀 ~ useEditProfile ~ data:', data);
      if (isEmpty(data)) return;

      await handlerSetItem(Keys.userData, JSON.stringify(data));

      popScreen();
    },
    [popScreen],
  );

  const handleShowModalDatePicker = useCallback(() => {
    setIsShowModalDatePicker(prevState => !prevState);
  }, []);

  const handleShowModalNationality = useCallback(() => {
    setIsShowModalNationality(prevState => !prevState);
  }, []);

  const handleSetUserDob = useCallback(
    (date: Date) => {
      console.log('🚀 ~ useEditProfile ~ date:', date?.toString());
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

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitEditProfile();
  }, [submitEditProfile]);

  useEffect(() => {
    setFilteredCountries(searchCountry(searchCountryQuery));
  }, [searchCountryQuery]);

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name ?? '');
      setValue('email', userData.email ?? '');
      setValue('date_of_birth', userData.date_of_birth ?? '');
      setValue('nationality', userData.nationality ?? '');
    }
  }, [userData, setValue]);

  useEffect(() => {
    handleGetUserData();
  }, []);

  return {
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
  };
};

export default useEditProfile;
