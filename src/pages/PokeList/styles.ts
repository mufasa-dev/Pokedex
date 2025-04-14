import styled from 'styled-components';
import { Modal } from "react-bootstrap";

export const PokemonList = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 70%;
  height: 100vh;
  padding-top: 50px;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.background};
  @media(max-width: 800px) {
    width: ${props => props.open ? '100%' : '0'};
  }
`;

export const PokemonDetails = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 30%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background2};
  padding-top: 60px;
  overflow-y: auto;
  color: ${props => props.theme.colors.text};

  @media(max-width: 800px) {
    width: ${props => props.open ? '100%' : '0'};
  }
`;

export const InputSearch = styled.input`
  border: 0;
  border-radius: 5px;
  width: 100%;
  font-size: 15px;
  padding: 0.7rem;
  background-color: ${props => props.theme.colors.background2};
  color: ${props => props.theme.colors.text};
  &::placeholder {
    color: rgba(255,255,255,0.8);
  }
`;

export const InputSelect = styled.select`
  border: 0;
  border-radius: 5px;
  width: 100%;
  font-size: 15px;
  padding: 0.7rem;
  background-color: ${props => props.theme.colors.background2};
  color: ${props => props.theme.colors.text};
`;

export const ButtonSearch = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  color: white;
  border: 0;
  transition: 300ms;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
  &:disabled {
    background-color: #343434;
  }
`;

export const ContainerNextPrev = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 5px;
`;

export const PrevNextButton = styled.div`
  border: 0;
  background-color: #FFCC00;
  color: white;
  width: 70px;
  text-align: center;
  border-radius: 10px;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;

  &:hover{
    background-color: #D5A100;
  }
`;

export const PokeNavBar = styled(Modal)`
  color: white;
  & .modal-content{
    background-color: ${props => props.theme.colors.header};
    border: 1px solid black;
  }

  & .modal-header{
    border-bottom: 0 !important;
  }

  & .modal-title{
    text-transform: capitalize;
  }

  & .modal-footer{
    border-top: 0 !important;
  }
`;

export const ButtonAddRem = styled.button`
  width: 100px;
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  color: white;
  border: 0;
  transition: 300ms;
  cursor: pointer;
  padding: 5px;
  position: initial;
  bottom: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  &:hover {
    background-color: ${props => props.theme.colors.buttonHover};
  }
  &:disabled {
    background-color: #343434;
  }
`;

export const PokeNameModal = styled.b`
  color: white;
`;

export const PokeNameModalHeader = styled(Modal.Title)`
  color: white;
`;