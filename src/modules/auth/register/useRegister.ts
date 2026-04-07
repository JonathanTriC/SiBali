import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { apiPostWithoutToken } from '@api';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { URL_PATH } from '@constants/url';
import { handlerSetItem, Keys } from '@constants';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;
type FormType = 'name' | 'email' | 'password';

const useRegister = () => {
  const { popScreen, resetNavigate, navigateScreen } = useNavigate();

  const { control, getValues, setError, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
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

  return { control, popScreen, handleSubmit, submitRegister, onSubmit };
};

export default useRegister;
