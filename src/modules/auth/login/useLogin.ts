import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

type FormData = yup.InferType<typeof formSchema>;

const useLogin = () => {
  const { navigateScreen } = useNavigate();

  const { control, formState, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    console.log({ email, password });
  };

  return { control, formState, navigateScreen, handleSubmit, onSubmit };
};

export default useLogin;
