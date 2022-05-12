import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import CreateUser from './CreateUser';
import DataTable from 'src/components/DataTable';
import { getAllUsers } from 'src/service/get';
import Label from 'src/components/Label'


const customLabel = ({ data }: any) => {
    return <Label color="primary">{data.website} </Label>
}

export default function () {

    const TableHead = [
        { _key: 'name', label: 'Name', },
        { _key: 'email', label: 'Email', },
        { _key: 'phone', label: 'Phone', },
        { _key: 'username', label: 'Username', },
        { _key: 'website', label: 'Website', component: customLabel },
    ]

    return (

        <>
            <RoleBasedGuard roles={['Admin']}>
                <CreateUser />
            </RoleBasedGuard>
            <DataTable
                tableHead={TableHead}
                dataSource={getAllUsers}
                // demoData={demoData}
                tabNavValues={[
                    { label: 'NE', value: 'NE' },
                    { label: 'LIKE', value: 'LIKE' },
                ]}
            />

          
        </>

    )
}




const demoData = [
    {
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "phone": "1-770-736-8031 x56442",
        "username": "Bret",
        "website": "hildegard.org",
        "__typename": "User"
    },
    {
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "phone": "010-692-6593 x09125",
        "username": "Antonette",
        "website": "anastasia.net",
        "__typename": "User"
    },
    {
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "phone": "1-463-123-4447",
        "username": "Samantha",
        "website": "ramiro.info",
        "__typename": "User"
    },
    {
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "phone": "493-170-9623 x156",
        "username": "Karianne",
        "website": "kale.biz",
        "__typename": "User"
    },
    {
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "phone": "(254)954-1289",
        "username": "Kamren",
        "website": "demarco.info",
        "__typename": "User"
    }
]