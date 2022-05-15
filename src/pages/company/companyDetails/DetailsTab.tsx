import * as React from 'react';
import useTabs from '../../../hooks/useTabs';
import Iconify from '../../../components/Iconify';
import { Box, Card, Tab, Tabs } from '@mui/material';
import { capitalCase } from 'change-case';
import { styled } from '@mui/material/styles';
import CompanyDetailsWithEditForm from './Details';
import TableComponent from 'src/pages/company/TableComponent';




export interface IAppProps {
}

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    marginBottom: "2.5rem",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
        paddingRight: theme.spacing(3),
    },
}));
type DetailsTabProps = {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setContractTab: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DetailsTab({ isEdit, setIsEdit, setContractTab }: DetailsTabProps) {

    const { currentTab, onChangeTab } = useTabs('Basic Details');

    const tableMokeData = [{
        Contract_Purpose: "Painting",
        employee_required: 25,
        reliever_count: 50,
        contract_no: "5",
        status: "in_progress",
    }]



    const PROFILE_TABS = [
        {
            value: 'Basic Details',
            // icon: <Iconify icon={'ic:round-account-box'} width={23} height={23} />,
            component: <CompanyDetailsWithEditForm isEdit={isEdit} setIsEdit={setIsEdit} />,
        },
        {
            value: 'Contract Details',
            // icon: <Iconify icon={'clarity:contract-solid'} width={23} height={23} />,
            component: <TableComponent
                title="Contracts"
                tableData={tableMokeData}
                tableLabels={[
                    { id: 'Contract_Purpose', label: 'Contract Purpose' },
                    { id: 'contract_no', label: 'Contract No' },
                    { id: 'employee_required', label: 'Employee Required' },
                    { id: 'reliever_count', label: 'Reliever Count' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                ]}
            />
            ,
        },

    ];

    React.useEffect(() => {
        if (currentTab === "Contract Details") {
            setContractTab(true)
        } else {
            setContractTab(false)
        }

        return () => {

        }
    }, [currentTab])

    return (
        <div>


            <TabsWrapperStyle>
                <Tabs
                    allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"
                    value={currentTab}
                    onChange={onChangeTab}
                    style={{ background: "rgb(244, 246, 248)", paddingLeft: "1rem", width:"100%" , borderRadius:"8px"}}
                >
                    {PROFILE_TABS.map((tab) => (
                        <Tab
                            disableRipple
                            key={tab.value}
                            value={tab.value}
                            // icon={tab.icon}
                            label={capitalCase(tab.value)}
                            style={{ fontSize: "1rem" }}
                        />
                    ))}
                </Tabs>
            </TabsWrapperStyle>

            {PROFILE_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}


        </div>
    );
}
