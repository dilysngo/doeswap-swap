import 'assets/css/global.css'
import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import useGetProfileAccount from 'hooks/useGetProfileAccount'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
// import Home from './Home'
import Swap from './Swap'
import Pool from './Pool'
import AddLiquidity from './AddLiquidity'
import RemoveLiquidity from './RemoveLiquidity'

import Menu from '../components/Menu'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;

  img[alt='hot'] {
    position: relative;
  }

  div[title='Bunny'] {
    display: none;
  }
`
// Bg overview all page
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // padding: 32px 16px 10px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
`

const Marginer = styled.div`
  margin-top: 0rem;
`

const cacheLanguage = 'soupSwapLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  useGetProfileAccount()

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(cacheLanguage)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}>
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      {/* <Route exact strict path="/" component={Home} /> */}
                      <Route exact strict path="/swap" component={Swap} />
                      {/* <Route exact strict path="/find" component={PoolFinder} /> */}
                      <Route exact strict path="/pool" component={Pool} />
                      <Route exact path="/add" component={AddLiquidity} />
                      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                      {/* Redirection: These old routes are still used in the code base */}
                      <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                      <Route component={RedirectPathToSwapOnly} />
                    </Switch>
                  </Web3ReactManager>
                  <Marginer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
