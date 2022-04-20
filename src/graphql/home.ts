import { gql } from "@apollo/client";



export const ALL_USERS = gql`
query{
  users {
    data {
      name
      phone
      email
      username
      website
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