import gql from "graphql-tag";

export const GET_TYPES = gql`
    query types {
        types {
            count
            next
            previous
            results {
            url
            name
            }
        }
    }
`