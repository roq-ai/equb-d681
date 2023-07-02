import * as yup from 'yup';

export const financeSharingValidationSchema = yup.object().shape({
  customer_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
