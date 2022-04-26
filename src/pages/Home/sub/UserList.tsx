import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Skeleton
} from '@mui/material'
import Scrollbar from 'src/components/Scrollbar'
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
// import SkeletonPost from 'src/components/skelton/SkeletonPost';
import CreateUser from './CreateUser';

type Props = {
    users: {
        name: string;
        phone: string;
        email: string;
        username: string;
        website: string;
    }[],
    loading: boolean
}


const TABLE_HEAD = ['Name', 'Phone', 'Email', 'Username', 'Website']


export default function ({ users, loading }: Props) {

    // simple array generated to get loading rows

    let loadingArray: number[] = []
    for (let i = 0; i < 10; i++) {
        loadingArray.push(i);
    }


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
                            {loading ?
                                loadingArray.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{<Skeleton variant="text" height={20} />}</TableCell>
                                        <TableCell>{<Skeleton variant="text" height={20} />}</TableCell>
                                        <TableCell>{<Skeleton variant="text" height={20} />}</TableCell>
                                        <TableCell>{<Skeleton variant="text" height={20} />}</TableCell>
                                        <TableCell>{<Skeleton variant="text" height={20} />}</TableCell>
                                    </TableRow>
                                ))
                                :
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