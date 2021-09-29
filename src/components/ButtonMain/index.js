import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  border-radius: 6px;
  padding: 2px 10px;
  text-align: center;
  cursor: pointer;
  border: none;
  outline: unset; 
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  font-size: ${(fontSize) => fontSize || "20px"};
  color: #fff;
  background: #954306;
`

const Index = ({ children, style, ...otherProps }) => {
  return (
    <>
      <ButtonWrapper type="button" style={{...style}} {...otherProps}>
        {children}
      </ButtonWrapper>
    </>
  )
}

export default Index
