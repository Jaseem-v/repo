import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination
} from '@mui/material'
import { useEffect, useState } from 'react'
import Scrollbar from 'src/components/Scrollbar'
import Loading from 'src/components/LoadingScreen'
import SkeletonPost from 'src/components/skelton/SkeletonPost'
import Toolbar from './Toolbar'
import TableNoData from './TableNoData'
import TableSkeleton from './TableSkeleton'

type TableHead = {
    _key: string,
    label: string,
    component?: ({ data }: any) => JSX.Element,
}

type props = {
    tableHead: TableHead[],
    dataSource?: (
        search: string,
        limit: number,
        page: number,
    ) => Promise<{
        data: any[],
        count: number,
    }>,
    demoData?: any[],
}

export default function DataTable({
    tableHead,
    dataSource,
    demoData
}: props) {


    const [data, setData] = useState<any[]>(demoData || [])
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!dataSource) return
        setLoading(true)
        dataSource(search, page + 1, limit)
            .then((data) => {
                setData(data.data)
                setCount(data.count)
                setLoading(false)
            })
            .catch((err) => {
                setError(true)
                setLoading(false)
            })
    }, [page, limit, search])


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Toolbar
                onSearch={(value) => setSearch(value)}
            />

            <Scrollbar>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHead.map((head) => (
                                    <TableCell key={head._key}>
                                        {head.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading ?
                                    <TableSkeleton noOfRows={5} /> :
                                    <>
                                        {
                                            data.length > 0 ?
                                                data.map((row, index) => (
                                                    <TableRow key={'id_1' + index}>
                                                        {tableHead.map((head, ind) => (
                                                            <TableCell key={'id_2' + index + ind}>
                                                                {head.component ? head.component({ data: row }) : row[head._key]}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                                : <TableNoData isNotFound />
                                        }
                                    </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component={'div'}
                    rowsPerPageOptions={[1, 5, 10]}
                    count={count || demoData?.length || 0}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Scrollbar>
        </>
    )
}