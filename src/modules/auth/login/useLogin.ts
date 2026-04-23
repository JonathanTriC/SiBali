import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { URL_PATH } from '@constants/url';
import { apiPostWithoutToken } from '@api';
import { useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { handlerSetItem, Keys } from '@constants';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;
type FormType = 'email' | 'password';

const useLogin = () => {
  const { navigateScreen, resetNavigate } = useNavigate();

  const { control, formState, getValues, setError, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: yupResolver(formSchema),
    });

  const {
    mutate: submitLogin,
    status,
    isPending,
  } = useMutation<LoginResponse, ApiError<AuthErrorResponse[]>>({
    mutationKey: ['login'],
    mutationFn: async () => {
      const { email, password } = getValues();

      const body = {
        email: email?.trim(),
        password: password?.trim(),
      };

      const data = await apiPostWithoutToken({
        url: `${URL_PATH.auth.login}`,
        body,
        tags: 'loginAuth',
      });

      console.log('🚀 ~ useLogin ~ data:', data);
      return data?.data;
    },
    onSuccess: data => {
      console.log('Login successful! Token:', data.accessToken);
      handleNavigateHome(data?.accessToken ?? '');
    },
    onError: data => {
      console.log('Login failed! Error:', data?.message);
      setError(data?.errors?.[0]?.field as FormType, {
        type: 'manual',
        message: data?.errors?.[0].message,
      });
    },
  });

  const handleNavigateHome = useCallback(
    async (token: string) => {
      if (!token) return;
      console.log({ token });
      await handlerSetItem(Keys.userToken, token);

      resetNavigate('Main', { screen: 'HomeScreen' });
    },
    [resetNavigate],
  );

  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitLogin();
  }, [submitLogin]);

  useEffect(() => {
    console.log('status:', status);
  }, [status]);

  return {
    control,
    formState,
    isPending,
    navigateScreen,
    handleSubmit,
    onSubmit,
  };
};

export default useLogin;
