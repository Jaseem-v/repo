import { GET_ALL_USERS } from 'src/graphql/User'
import { client } from './client'


export async function getAllUsers(search: string, page: number, limit: number) {

    try {
        const { data } = await client.query({
            query: GET_ALL_USERS,
            variables: {
                options: {
                    search: {
                        q: search
                    },
                    paginate: {
                        page,
                        limit
                    }
                }
            }
        })

        return Promise.resolve({
            data: data.users.data,
            count: data.users.meta.totalCount
        })

    } catch (error) {
        return Promise.reject(error)
    }
}