import { gql } from "@apollo/client";



export const ALL_USERS = gql`
query User($options: PageQueryOptions!){
  users(options:$options) {
    meta{
      totalCount
    }
    data {
      id
      name
      phone
      email
      username
      website
      company{
        name
      }
    }
  }
}
`


export const CREATE_USER = gql`
mutation($input: CreateUserInput!){
  createUser(input: $input) {
    id
  }
}`