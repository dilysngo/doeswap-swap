import React from 'react'
import styled from 'styled-components'
// import { useGetTokenListFromApi } from '../state/lists/hooks'
// import { ENV_ORGANIZATION, ENV_REPOS, ENV_FILENAME } from '../constants'

const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  min-height: calc(100vh - 150px);

  background-image: url('/images/trade-bg.jpeg');
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;

  @media only screen and (max-height: 750px) {
    min-height: 670px;
  }
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
// const organization = ENV_ORGANIZATION
// const repos = ENV_REPOS
// const filename = ENV_FILENAME
// const query = '?recursive=1'

export default function AppBody({ children }: { children: React.ReactNode }) {
  // useGetTokenListFromApi({ organization, repos, filename, query })

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}
