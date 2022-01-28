import React, { useEffect, useState } from "react";

import {useDispatch, useSelector} from "react-redux"
import ActionCreators from '../../redux/actionCreators'
import { connect } from "react-redux";

import { GET_POKEMONS } from "../../graphql/get-pokemons";
import { GET_POKEMON } from "../../graphql/get-pokemon";
import { Container, Row, Col } from "react-bootstrap";
import { InputSearch, InputSelect, ButtonSearch, PokemonDetails, PokemonList, ContainerNextPrev, PrevNextButton } from "./styles";
import { PokeCard } from "../../components/PokeCard/PokeCard";
import { fetchData } from "../../lib/fetchdata";
import { GET_TYPES } from "../../graphql/get-types";
import { PokeNav } from "../../components/PokeNav/PokeNav";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import ReactAudioPlayer from 'react-audio-player';

let read = {};

const PokeList = () => {
    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState({});
    const [limit, setLimit] = useState(24);
    const [offset, setOffset] = useState(0);
    const [name, setName] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        initial();
        getTypes();
    }, [])

    const initial = () => {
        
        fetchData(GET_POKEMONS, { limit: limit, offset: 0})
        .then((res => {
            setPokemons(res ? res.pokemons.results : []);
            setOffset(0);
        }))
    }

    const getTypes = () => {
         fetchData(GET_TYPES, { })
         .then((res => {
             setTypes(res ? res.types.results : [])
         }))
    }

    const next = () => {
        setOffset(offset + 24)
        fetchData(GET_POKEMONS, { limit: limit, offset: offset + 24})
        .then((res => setPokemons(res ? res.pokemons.results : [])))
    }

    const prev = () => {
        if(offset < 24) return;
        setOffset(offset - 24)
        fetchData(GET_POKEMONS, { limit: limit, offset: offset -24})
        .then((res => setPokemons(res ? res.pokemons.results : [])))
    }

    const detailsPokemon = (nam) => {
        read.audioEl.current.src = require('../../assets/audios/click.mp3');
        fetchData(GET_POKEMON, { name: nam.toLocaleLowerCase()})
        .then((res => {
            setPokemon(res ? res.pokemon : {})
        }))
        .catch(err => setPokemons([]))
        setOpenDetail(true)
    }

    const searchName = () => {
        if(!name){
            initial();
            return;
        }
        fetchData(GET_POKEMON, { name: name.toLocaleLowerCase()})
        .then((res => {
            let list = []
            if(res && res.pokemon){
                list.push(res.pokemon)
                setPokemon(res.pokemon)
            }else{
                setPokemon({})
            }
            setPokemons(list)
        }))
        .catch(err => {
            setPokemons([])
            setPokemon({})
        })
    }

    const cursorSound = (poke) => {
        read.audioEl.current.src = require('../../assets/audios/cursor.mp3');
    }
    
    const addToPokeDex = (poke) => {
        setPokemon({})
        dispatch(ActionCreators.addPokemon(poke))
        read.audioEl.current.src = require('../../assets/audios/recruit.mp3');
        setOpenDetail(false);
    }

    // const { data : { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
    //     variables : { limit: 24, offset: 0}
    // });
    
    return (
        <div>
            <PokemonList open={!openDetail}>
            <Container mt="5">
                
                <Row className="mt-3 mb-3">
                    {/* <Col sm="4">
                        <InputSelect value={type} onChange={e =>  setType(e.target.value)} disabled>
                            <option value="">...</option>
                            {types && types.map((ty, i) => {
                                return <option key={i} value={ty.name}>{ty.name}</option>
                            })}
                        </InputSelect>
                    </Col> */}
                    <Col sm="8">
                        <InputSearch placeholder="Name" value={name} onChange={e => setName(e.target.value)} disabled={type != ''} />
                    </Col>
                    <Col sm="4">
                        <ButtonSearch onClick={searchName} disabled={type != ''}>
                            Search
                        </ButtonSearch>
                    </Col>
                </Row>
                <Row>
                {pokemons && pokemons.map((poke, i) => {
                    return <PokeCard key={i} pokemon={poke} click={(n) => {detailsPokemon(n)}} select={poke.name == pokemon.name} hover={cursorSound}/>
                })}
                </Row>
                <ContainerNextPrev>
                    <PrevNextButton onClick={prev}>
                        Prev
                    </PrevNextButton>
                    <PrevNextButton onClick={next}>
                        Next
                    </PrevNextButton>
                </ContainerNextPrev>
            </Container>
            </PokemonList>
            <PokemonDetails open={openDetail}>
                <Container>
                    {pokemon && pokemon.name && <PokeDetails pokemon={pokemon} click={addToPokeDex} closeScreen={() => setOpenDetail(false)} />}
                </Container>
            </PokemonDetails>
            <div className="d-none">
                <ReactAudioPlayer
                    ref={(element) => { read = element; }}
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

export default connect(mapStateToProps, mapDispatchToProps)(PokeList)