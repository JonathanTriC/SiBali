import { useNavigate } from '@hooks';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup.object().shape({
  fullName: yup.string().required('Please enter your full name'),
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

const useRegister = () => {
  const { popScreen } = useNavigate();

  const { control, getValues, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {
    const { fullName, email, password } = getValues();
    console.log({ fullName, email, password });
  };

  return { control, popScreen, handleSubmit, onSubmit };
};

export default useRegister;
