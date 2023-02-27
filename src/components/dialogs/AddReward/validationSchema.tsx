import * as Yup from 'yup';

const userShema = Yup.object({
  email: Yup.string().required(),
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  image: Yup.string(),
});

export const validationSchema = Yup.object({
  from: userShema,
  to: userShema.typeError('Please select a person'),
  reward: Yup.number()
    .moreThan(0, 'Reward must be greater than 0')
    .max(1e9, 'The reward is too high'),
  message: Yup.string()
    .required('Please add a message')
    .min(20, 'Please come up with something meaningful')
    .max(10000, 'The message is too long'),
});
