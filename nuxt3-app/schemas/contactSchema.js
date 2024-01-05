import * as Yup from 'yup'

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  title: Yup.string().required('Title is required'),
  profilePicture: Yup.string(),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required. Enter a valid email.'),
})

export default contactSchema
