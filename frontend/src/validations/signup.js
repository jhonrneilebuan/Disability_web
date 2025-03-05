import * as Yup from 'yup';

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string().required('Role is required'),
  agreedToPrivacy: Yup.boolean().oneOf([true], 'You must agree to the privacy policy'),
});

export default SignUpValidationSchema;