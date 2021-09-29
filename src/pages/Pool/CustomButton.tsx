import React, { ReactNode } from "react";
import styled from "styled-components";

interface CustomButtonProps {
  children?: ReactNode
}

const StyleContainer = styled.div`
  text-align: center;

  a {
    // max-width: 300px;
    // width: 100%;

    :hover {
      color: white;
    }
  }
`

const CustomButton = ({ children }: CustomButtonProps) => {
  return (
    <StyleContainer>
      {children}
    </StyleContainer>
  )
}

export default CustomButton;