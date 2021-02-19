import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem{
      ... on User {
        id
        email
        name
        # TODO: query the card once we have it
      }
    }
  }
`;

export function useUser(){
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log('data', data)
  return data?.authenticatedItem;
} 