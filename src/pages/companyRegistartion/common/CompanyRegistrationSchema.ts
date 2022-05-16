import * as Yup from 'yup';


export const CompanyRegistrationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyName_ar: Yup.string().required('Company Name (AR) is required'),
    companyActivity: Yup.string().required('Company Activity is required'),
    companyActivity_ar: Yup.string().required('Company Activity (AR) is required'),
    companyCode: Yup.string().required('Company Code is required'),
    companyLicense: Yup.string().required('Company License (AR) is required'),
    emirate: Yup.string().required('Emirate is required'),
    fax: Yup.string().required('Fax is required'),
    area: Yup.string().required('Area is required'),
    area_ar: Yup.string().required('Area (AR) is required'),
    p_o_box: Yup.string().required('P.O is required'),
    email: Yup.string().required('Email is required'),
    docImage1: Yup.string().required('File is required'),
    docImage2: Yup.string().required('File is required'),
    docImage3: Yup.string().required('File is required'),
    docImage4: Yup.string().required('File is required'),
    docImage5: Yup.string().required('File is required'),
   
});
export const StaffListPopupSchema = Yup.object().shape({
    staffName: Yup.string().required('FirstName is required'),
});

