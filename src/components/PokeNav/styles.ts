import styled from 'styled-components';
import {  Navbar } from "react-bootstrap";

export const PokeNavBar = styled(Navbar)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 2;
  background-color: ${props => props.theme.colors.header} !important;
`;

export const HeroImage = styled.img`
  width: 50px;
  margin-bottom: -11px;
`;