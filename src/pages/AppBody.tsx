import React from 'react'
import styled from 'styled-components'
import { Card } from 'horaswap-libs-uikit'

// import LogoVertical from 'assets/images/flan-logo-vertical.png'
import { useGetTokenListFromApi } from '../state/lists/hooks'
import { ENV_ORGANIZATION, ENV_REPOS, ENV_FILENAME } from '../constants'

const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;
`
// const Header = styled.div`
//   width: 100%;
//   text-align: center;
//   padding: 20px;

//   img {
//     width: 100%;
//     max-width: 155px;
//   }
// `
export const BodyWrapper = styled(Card)`
  position: relative;
  z-index: 5;
  border-radius: 10px;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.25);
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
const organization = ENV_ORGANIZATION
const repos = ENV_REPOS
const filename = ENV_FILENAME
const query = '?recursive=1'

export default function AppBody({ children }: { children: React.ReactNode }) {
  useGetTokenListFromApi({ organization, repos, filename, query })

  return (
    <Wrapper>
      {/* <Header>
        <img src={LogoVertical} alt="" />
      </Header> */}
      <BodyWrapper>{children}</BodyWrapper>
    </Wrapper>
  )
}
