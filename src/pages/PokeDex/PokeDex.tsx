import React, { useEffect, useState } from "react";

import {useDispatch, useSelector} from "react-redux"
import ActionCreators from '../../redux/actionCreators'
import { connect } from "react-redux";

import { GET_POKEMON } from "../../graphql/get-pokemon";
import { Container, Row, Col } from "react-bootstrap";
import { InputSearch, InputSelect, ButtonSearch, PokemonDetails, PokemonList, ContainerNextPrev, PrevNextButton } from "./styles";
import { PokeCard } from "../../components/PokeCard/PokeCard";
import { fetchData } from "../../lib/fetchdata";
import { GET_TYPES } from "../../graphql/get-types";
import { PokeNav } from "../../components/PokeNav/PokeNav";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import ReactAudioPlayer from 'react-audio-player';

let read: ReactAudioPlayer;
let cursor: ReactAudioPlayer;

const PokeDex = () => {
    const dispatch = useDispatch()
    const pokemons = useSelector((state: any) => state.pokemons)
    //const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [limit, setLimit] = useState(24);
    const [offset, setOffset] = useState(0);
    const [name, setName] = useState('');
    const [types, setTypes] = useState<Type[]>([]);
    const [type, setType] = useState('');
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        initial();
        getTypes();
    }, [])

    const initial = () => {

    }

    const getTypes = () => {
        fetchData(GET_TYPES, { })
        .then((res => {
            setTypes(res ? res.types.results : [])
        }))
    }

    const detailsPokemon = (nam:string) => {
        let poke = pokemons.data.find(x => x.name == nam);
        setPokemon(poke)
        read.audioEl.current.src = require('../../assets/audios/click.mp3');
        setOpenDetail(true);
    }

    const cursorSound = (poke) => {
        cursor.audioEl.current.src = require('../../assets/audios/cursor.mp3');
    }

    const rmToPokeDex = (poke) => {
        setPokemon(null)
        dispatch(ActionCreators.rmPokemon(poke))
        read.audioEl.current.src = require('../../assets/audios/add.mp3');
        setOpenDetail(false);
    }

    // const { data : { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    //     variables : { limit: 24, offset: 0}
    // });

    return (
        <div>
            <PokemonList open={!openDetail}>
            <Container className="mt-5">
                <Row className="mt-3 mb-3">
                    <Col sm="4">
                        <InputSelect value={type} onChange={e =>  setType(e.target.value)} >
                            <option value="">...</option>
                            {types && types.map((ty, i) => {
                                return <option key={i} value={ty.name}>{ty.name}</option>
                            })}
                        </InputSelect>
                    </Col>
                    <Col sm="4">
                        <InputSearch placeholder="Name" value={name} onChange={e => setName(e.target.value)}  />
                    </Col>
                </Row>
                <Row>
                {pokemons && pokemons.data && pokemons.data.map((poke, i) => {
                    if(type !== '' && !poke.types.find(x => x.type.name === type) ) {
                        return undefined;
                    }
                    if(name !== '' && !poke.name.includes(name) ) {
                        return undefined;
                    }
                    return <PokeCard key={i} pokemon={poke} click={(n) => {detailsPokemon(n)}} select={poke.name === pokemon?.name} hover={cursorSound}/>
                })}
                </Row>
            </Container>
            </PokemonList>
            <PokemonDetails open={openDetail}>
                <Container>
                    {pokemon && pokemon.name && <PokeDetails pokemon={pokemon} pokedex={true} click={rmToPokeDex} closeScreen={() => setOpenDetail(false)} />}
                </Container>
            </PokemonDetails>
            <div className="d-none">
                <ReactAudioPlayer
                    ref={(element) => { if (element != null) cursor = element; }}
                    autoPlay
                    controls
                    className="audioPlayerInvisible"
                />
                <ReactAudioPlayer
                    ref={(element) => { if (element != null) read = element; }}
                    autoPlay
                    controls
                    className="audioPlayerInvisible"
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getMessageIndex: () => dispatch(ActionCreators.getMessageIndexRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeDex)