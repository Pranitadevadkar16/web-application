import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  address: Yup.string().required('Address is required'),
  photo: Yup.string().url('Must be a valid URL').nullable(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});