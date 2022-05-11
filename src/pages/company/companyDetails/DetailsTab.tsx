import * as React from 'react';
import useTabs from '../../../hooks/useTabs';
import Iconify from '../../../components/Iconify';
import { Box, Card, Tab, Tabs } from '@mui/material';
import { capitalCase } from 'change-case';
import { styled } from '@mui/material/styles';
import CompanyDetailsWithEditForm from './Details';
import { CompanyContext, CompanyContextType } from '../CompanyContext';
import TableComponent from 'src/components/TableComponent';




export interface IAppProps {
}

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
        paddingRight: theme.spacing(3),
    },
}));
type editProps = {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DetailsTab({ isEdit, setIsEdit }: editProps) {



    const { currentTab, onChangeTab } = useTabs('Basic Details');

    console.log(isEdit);

    const tableFakaData = [{
        Contract_Purpose: "Painting",
        employee_required: 25,
        reliever_count: 50,
        contract_no: "5",
        status: "in_progress",
    }]



    const PROFILE_TABS = [
        {
            value: 'Basic Details',
            icon: <Iconify icon={'ic:round-account-box'} width={23} height={23} />,
            component: <CompanyDetailsWithEditForm isEdit={isEdit} setIsEdit={setIsEdit} />,
        },
        {
            value: 'Contract Details',
            icon: <Iconify icon={'clarity:contract-solid'} width={23} height={23} />,
            component: <TableComponent
                title="Contracts"
                tableData={tableFakaData}
                tableLabels={[
                    { id: 'Contract_Purpose', label: 'Contract Purpose' },
                    { id: 'contract_no', label: 'contract no' },
                    { id: 'employee_required', label: 'Employee Required' },
                    { id: 'reliever_count', label: 'Reliever Count' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                ]}
            />
            ,
        },

    ];
    return (
        <div>
            <Card
                sx={{
                    mb: 3,
                    height: "auto",
                    padding: "1rem 2rem"
                }}
            >

                <TabsWrapperStyle>
                    <Tabs
                        allowScrollButtonsMobile
                        variant="scrollable"
                        scrollButtons="auto"
                        value={currentTab}
                        onChange={onChangeTab}
                    >
                        {PROFILE_TABS.map((tab) => (
                            <Tab
                                disableRipple
                                key={tab.value}
                                value={tab.value}
                                icon={tab.icon}
                                label={capitalCase(tab.value)}
                                style={{ fontSize: "1rem" }}
                            />
                        ))}
                    </Tabs>
                </TabsWrapperStyle>
            </Card>

            {PROFILE_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
        </div>
    );
}
