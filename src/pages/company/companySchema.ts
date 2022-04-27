import * as Yup from 'yup';


export const companySchema = Yup.object().shape({
    name_ar: Yup.string().required('Name Arabic is required'),
    name_en: Yup.string().required('Name English is required'),
})