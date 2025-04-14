import React, { useState } from "react";

import {  Col, Container, Row, ProgressBar } from "react-bootstrap";
import { ContainerBody, PokeImage, PokeName, ContainerPokeType, PokeType, NavDetailsContainer, BtnNavDetailsContainer, ButtonAddRem, BackButton } from "./styles";

export const PokeDetails = ({pokemon, pokedex, click, closeScreen}) => {
    const [tabSelected, setTabSelected] = useState('about');
    return (
        <ContainerBody>
            <BackButton onClick={closeScreen}>Back</BackButton>
            <PokeName>{pokemon.name}</PokeName>
            <ContainerPokeType>
                {pokemon && pokemon.types.map((ty, i) => {
                    return <PokeType key={i}>{ty.type.name}</PokeType>
                })}
            </ContainerPokeType>
            <PokeImage src={ pokemon.sprites ? pokemon.sprites.front_default : pokemon.image } />
            <NavDetailsContainer>
                <BtnNavDetailsContainer select={tabSelected === 'about'} onClick={() => setTabSelected('about')}>
                    About
                </BtnNavDetailsContainer>
                <BtnNavDetailsContainer select={tabSelected === 'status'} onClick={() => setTabSelected('status')}>
                    Base Status
                </BtnNavDetailsContainer>
            </NavDetailsContainer>
            {tabSelected === 'about' &&
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <b>Species</b>
                        </Col>
                        <Col xs={6} md={8}>
                            <span>{pokemon.species.name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <b>Height</b>
                        </Col>
                        <Col xs={6} md={8}>
                            <span>{pokemon.height}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <b>Weight</b>
                        </Col>
                        <Col xs={6} md={8}>
                            <span>{pokemon.weight}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <b>Abilities</b>
                        </Col>
                        <Col xs={6} md={8}>
                            {pokemon.abilities && pokemon.abilities.map((abil, i) => {
                                return <span>{abil.ability.name} <br /></span>;
                            })}
                        </Col>
                    </Row>
                </Container>
            }
            {tabSelected === 'status' &&
                <Container>
                    {pokemon.stats.map((stat, i) => {
                        return <Row key={i}>
                        <Col xs={6} md={5}>
                            <b>{stat.stat.name}</b>
                        </Col>
                        <Col xs={6} md={7}>
                            <ProgressBar striped variant={100 / 100 * stat.base_stat < 50 ? "danger" : "success"} now={100 / (stat.base_stat > 99 ? 150 : 100) * stat.base_stat} label={stat.base_stat}/>
                        </Col>
                    </Row>
                    }) }
                </Container>
            }
            {pokedex ?
                <ButtonAddRem onClick={() => {click(pokemon)}}>Remove</ButtonAddRem>
                :
                <ButtonAddRem onClick={() => {click(pokemon)}}>Add to the team</ButtonAddRem>}
        </ContainerBody>
    )
}