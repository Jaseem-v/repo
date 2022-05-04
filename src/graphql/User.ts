import { gql } from "@apollo/client";

export const ALL_USERS = gql`
query User($orderBy: [UserOrderByInput!],$skip: Float,$take: Float,$where: UserWhereInput){
  _usersMeta{
    count
  }
  users(orderBy:$orderBy,skip:$skip,take:$take,where:$where){
    id
    avatar
    firstName
    lastName
    roles
    username
    jobRole
    status
    varified
    company{
      name
    }
  }
}
`;

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
