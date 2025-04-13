import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isLoading: false,
    data: [{
        id: 25,
        name: "pikachu",
        held_items: [
          {
            item: {
              name: "oran-berry"
            }
          },
          {
            item: {
              name: "light-ball"
            }
          }
        ],
        sprites: {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
          front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
        },
        species: {
          name: "pikachu"
        },
        order: 35,
        height: 4,
        weight: 60,
        forms: [
          {
            name: "pikachu"
          }
        ],
        location_area_encounters: "https://pokeapi.co/api/v2/pokemon/25/encounters",
        stats: [
          {
            stat: {
              name: "hp"
            },
            base_stat: 35,
            effort: 0
          },
          {
            stat: {
              name: "attack"
            },
            base_stat: 55,
            effort: 0
          },
          {
            stat: {
              name: "defense"
            },
            base_stat: 40,
            effort: 0
          },
          {
            stat: {
              name: "special-attack"
            },
            base_stat: 50,
            effort: 0
          },
          {
            stat: {
              name: "special-defense"
            },
            base_stat: 50,
            effort: 0
          },
          {
            stat: {
              name: "speed"
            },
            base_stat: 90,
            effort: 2
          }
        ],
        abilities: [
          {
            ability: {
              name: "static"
            }
          },
          {
            ability: {
              name: "lightning-rod"
            }
          }
        ],
        types: [
          {
            type: {
              name: "electric"
            }
          }
        ],
        message: "",
        status: true
      }],
    error: false,
    errorMessage: ''
}

export const addPokemon = (state = INITIAL_STATE, action) => {
    console.log('action', action)
    let {data} = state
    data.push(action.poke);

    return {
        ...state,
        data
    }
}

export const rmPokemon = (state = INITIAL_STATE, action: any) => {
    let {data} = state
    if(data.some(h => h.id === action.poke.id)){
        data = data.filter(h => h.id !== action.poke.id)
    }

    return {
        ...state,
        data
    }
}


export const HANDLERS = {
    [Types.ADD_POKEMON]: addPokemon,
    [Types.RM_POKEMON]: rmPokemon,
}

export default createReducer(INITIAL_STATE, HANDLERS)