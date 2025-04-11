import React from "react";

import {  Col } from "react-bootstrap";
import { ContainerBody, PokeImage, PokeName, ContainerPokeType, PokeType } from "./styles";

export const PokeCard = ({pokemon, select, click, hover}) => {
    return (
        <Col sm="4" xl="2" onMouseOver={hover}>
            <ContainerBody onClick={() => {click(pokemon.name)}} select={select}>
                <PokeName>{pokemon.name}</PokeName>
                <ContainerPokeType>
                    {pokemon.types && pokemon.types.map((ty) => {
                        return <PokeType>{ty.type.name}</PokeType>
                    })}
                </ContainerPokeType>
                <PokeImage src={ pokemon.sprites ? pokemon.sprites.front_default : pokemon.image } />
            </ContainerBody>
        </Col>
    )
}