import React, { useEffect, useState } from "react";

import {useDispatch} from "react-redux"
import ActionCreators from '../../redux/actionCreators'
import { connect } from "react-redux";

import { GET_POKEMONS } from "../../graphql/get-pokemons";
import { GET_POKEMON } from "../../graphql/get-pokemon";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { InputSearch, ButtonAddRem, PokeNavBar, ButtonSearch, PokemonDetails, PokemonList, ContainerNextPrev, PrevNextButton, PokeNameModal, PokeNameModalHeader } from "./styles";
import { PokeCard } from "../../components/PokeCard/PokeCard";
import { fetchData } from "../../lib/fetchdata";
import { PokeDetails } from "../../components/PokeDetails/PokeDetails";
import ReactAudioPlayer from 'react-audio-player';

let read: ReactAudioPlayer;
let cursor: ReactAudioPlayer;

const PokeList = () => {
    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [limit, setLimit] = useState(24);
    const [offset, setOffset] = useState(0);
    const [modalAddPoke, setModalAddPoke] = useState(false);
    const [name, setName] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        initial();
    }, [])

    const initial = () => {
        fetchData(GET_POKEMONS, { limit: limit, offset: 0})
        .then((res => {
            setPokemons(res ? res.pokemons.results : []);
            setOffset(0);
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
            let list: any[] = []
            if(res && res.pokemon){
                list.push(res.pokemon)
                setPokemon(res.pokemon)
            }else{
                setPokemon(null)
            }
            setPokemons(list)
        }))
        .catch(err => {
            setPokemons([])
            setPokemon(null)
        })
    }

    const cursorSound = (poke) => {
        cursor.audioEl.current.src = require('../../assets/audios/cursor.mp3');
    }

    const addToPokeDex = (poke: Pokemon | null) => {
        if (poke == null) return;
        poke.name = name;
        setPokemon(null);
        dispatch(ActionCreators.addPokemon(poke))
        read.audioEl.current.src = require('../../assets/audios/recruit.mp3');
        setOpenDetail(false);
        setModalAddPoke(false)
    }

    return (
        <div>
            <PokemonList open={!openDetail}>
            <Container className="mt-5">
                <Row className="mt-3 mb-3">
                    <Col sm="8">
                        <InputSearch placeholder="Name" value={nameSearch} onChange={e => setNameSearch(e.target.value)} />
                    </Col>
                    <Col sm="4">
                        <ButtonSearch onClick={searchName} >
                            Search
                        </ButtonSearch>
                    </Col>
                </Row>
                <Row>
                {pokemons && pokemons.map((poke, i) => {
                    return <PokeCard key={i} pokemon={poke} click={(n) => {detailsPokemon(n)}} select={poke?.name === pokemon?.name} hover={cursorSound}/>
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
                    {pokemon && pokemon.name && <PokeDetails pokemon={pokemon} pokedex={false} click={() => {
                        setModalAddPoke(true);
                        setName(pokemon.name);
                    }} closeScreen={() => setOpenDetail(false)} />}
                </Container>
            </PokemonDetails>
            <PokeNavBar show={modalAddPoke} onHide={() => setModalAddPoke(false)} centered>
                <Modal.Header closeButton>
                <PokeNameModalHeader>{pokemon?.name}</PokeNameModalHeader>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm="4">
                                <img src={pokemon?.sprites ? pokemon?.sprites.front_default : pokemon?.image} alt="" />
                            </Col>
                            <Col>
                                <PokeNameModal>Name:</PokeNameModal>
                                <InputSearch type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <ButtonAddRem variant="primary" onClick={() => addToPokeDex(pokemon)}>
                    Add
                </ButtonAddRem>
                </Modal.Footer>
            </PokeNavBar>
            <div className="d-none">
                <ReactAudioPlayer
                    ref={(element) => { if (element != null) read = element; }}
                    autoPlay
                    controls
                    className="audioPlayerInvisible"
                />
                <ReactAudioPlayer
                    ref={(element) => { if (element != null)  cursor = element; }}
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