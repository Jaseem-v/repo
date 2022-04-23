import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material'
import Scrollbar from 'src/components/Scrollbar'
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import CreateUser from './CreateUser';
type Props = {
    users: {
        name: string;
        phone: string;
        email: string;
        username: string;
        website: string;
    }[]
}


const TABLE_HEAD = ['Name', 'Phone', 'Email', 'Username', 'Website']


export default function ({ users }: Props) {

    return (

        <>
            <RoleBasedGuard roles={['Admin']}>
                <CreateUser />
            </RoleBasedGuard>
            <Scrollbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {
                                TABLE_HEAD.map((head, index) => (
                                    <TableCell key={index}>{head}</TableCell>
                                ))
                            }
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.website}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
        </>

    )
}