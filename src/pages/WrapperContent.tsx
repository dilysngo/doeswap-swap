import React from 'react'
import styled from 'styled-components'

import BgIMG from 'assets/images/background/bg.png'

// Bg only component
const BodyWrapper = styled.div`
  width: 100%;
  background-image: url(${BgIMG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  background-attachment: fixed;
`
export default function WrapperContent({ children }: { children: React.ReactNode }) {
  return (
    <BodyWrapper>{children}</BodyWrapper>
  )
}
