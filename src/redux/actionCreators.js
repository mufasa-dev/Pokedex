import { createActions } from 'reduxsauce'

export const {
    Types,
    Creators
} = createActions({
    //Pokemon
    addPokemon: ['poke'],
    rmPokemon: ['poke'],
})

export default Creators