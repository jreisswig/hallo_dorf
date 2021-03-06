import React from 'react'
import Searchgreen from '../../images/Searchgreen.svg'
import styled from 'styled-components/macro'

export default function Searchbar({ onInput, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      <InputWrapper>
        <Searchicon>
          <img src={Searchgreen} alt="Searchicon" height="13px" width="13px" />
        </Searchicon>
        <Label htmlFor="search"></Label>
        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Suchen in Seestermühe"
          onInput={onInput}
        ></Input>
      </InputWrapper>
      <StyledSubmit
        id="search"
        type="submit"
        name="search"
        value="Suchen"
      ></StyledSubmit>
    </Form>
  )
}
const Form = styled.form`
  display: flex;
  justify-content: center;
  background-color: #f3f7f6;
  height: 40px;
  position: sticky;
  top: -17px;
  z-index: 2;
`
const Label = styled.label`
  display: none;
`
const InputWrapper = styled.div`
  display: flex;
  background: white;
  border: none;
  border-radius: 5px;
  width: 80%;
  margin: 6px;
  padding: 5px 5px 5px 8px;
`
const Searchicon = styled.div`
  width: 10%;
  padding-top: 2px;
`
const Input = styled.input`
  border: none;
  color: #7d7b7b;
  font-size: 1rem;
  margin-left: 5px;
  background: none;
`
const StyledSubmit = styled.input`
  background: #7aaca2;
  border: none;
  margin: 6px;
  width: 20%;
  font-size: 1rem;
  border-radius: 3px;
  color: white;
  padding: 6px 9px 9px 9px;
  font-size: 1rem;
`
