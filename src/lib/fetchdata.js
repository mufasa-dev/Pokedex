import { request } from 'graphql-request'

export function fetchData(query, vars) {
    return request('https://graphql-pokeapi.graphcdn.app/', query, vars)    
}
