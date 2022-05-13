import {
    Container,
    Stack,
} from '@mui/material';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import CompanyRegistrationForm from './CompanyRegitsrationForm';


// types
interface uploadedFileInterface {
    name?: string
}


export interface FormValidInputs {
    companyName: string;
    companyName_ar: string;
    companyActivity: string;
    companyActivity_ar: string;
    companyCode: string;
    companyLicense: string;
    passportNumber: string;
    emiratesID: string;
    EIDExpirydate: string;
    docImage: string;
    occupation_en: string,
    visaExpiryDate: string,
    passportExpiryDate: string,
    occupation_ar: string,
    phonenumber: string,
    email: string,
    nationality?: { code: string, label: string, phone: string }
}

const data = {
    Designation: ["Designation-1", "Designation-2", "Designation-3", "Designation-4", "Designation-5"],
    Company: ["Company-1", "Company-2", "Company-3", "Company-4", "Company-5"],
    Department: ["Department-1", "Department-2", "Department-3", "Department-4", "Department-5"],

}

export default function CompanyRegistration() {



    return (
        <div>

            <Page title="Company Registration">
                <Container maxWidth={"lg"}>
                    <Stack mb={5}>

                        <HeaderBreadcrumbs
                            heading="Company Registration"
                            links={[
                                { name: 'Company', href: "/dashboard/app" },

                                { name: "Company-Registration", href: "/dashboard/addnew", }
                            ]}
                        />

                    </Stack>

                    <CompanyRegistrationForm />
                </Container>
            </Page>

        </div >
    );
}
