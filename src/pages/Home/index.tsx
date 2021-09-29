import React from 'react'
import ModalNew from 'components/ModalNew'
import Footer from 'components/Footer'
import HeaderHome from './components/HeaderHome'
import Content from './components/Content'

const DashboardPage = () => {
  return (
    <>
      <HeaderHome /> 
      <Content />
      <Footer />
      <ModalNew /> 
    </>
  ) 
}

export default DashboardPage
