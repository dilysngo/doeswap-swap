import React from 'react'
import styled from 'styled-components'

// Bg only component
const BodyWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  // background-image: url(/));
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-attachment: fixed;
`
export default function WrapperContent({ children }: { children: React.ReactNode }) {
  return (
    <BodyWrapper>{children}</BodyWrapper>
  )
}
