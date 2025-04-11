import gql from "graphql-tag";

export const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            sprites {
                front_default
            }
            species {
                name
            }
            held_items {
                item{
                    name
                }
            }
            order
            height
            weight
            forms {
                name
            }
            location_area_encounters
            stats {
                stat {
                    name
                }
                base_stat
                effort
            }
            abilities {
            ability {
                name
            }
            }
            moves {
                move {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            message
            status
        }
    }
`