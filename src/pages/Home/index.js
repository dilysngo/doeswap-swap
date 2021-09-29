/* eslint-disable global-require */
import './styles.css'
import React from 'react'
import { Col, Row } from 'antd' 
 
import logo from 'assets/images/logo/logo-dark.svg'
import hotestImg1 from 'assets/images/homeAssets/hottest-1.png'
import hotestImg2 from 'assets/images/homeAssets/hottest-2.png'
import hotestImg3 from 'assets/images/homeAssets/hottest-3.png'
import hotestImg4 from 'assets/images/homeAssets/hottest-4.png'
import hotestImg5 from 'assets/images/homeAssets/hottest-5.png'
import hotestImg6 from 'assets/images/homeAssets/hottest-6.png'
import hotestImg7 from 'assets/images/homeAssets/hottest-7.png'
import hotestImg8 from 'assets/images/homeAssets/hottest-8.png'
import hotestImg9 from 'assets/images/homeAssets/hottest-9.png'
import hotestImg10 from 'assets/images/homeAssets/hottest-10.png'
import hotestImg11 from 'assets/images/homeAssets/hottest-11.png'
import hotestImg12 from 'assets/images/homeAssets/hottest-12.png'

import useI18n from 'hooks/useI18n'
import QuestionHelper from 'components/QuestionHelper'
import ModalNew from 'components/ModalNew'
import Footer from 'components/Footer'
import { MUTIL_VOLUME } from 'constants/index'
import HottestItem from './components/HottestItem'
import HeaderHome from './components/HeaderHome'
import TokenStats from './components/TokenStats'

const DashboardPage = () => {
  const innerWith = window.innerWidth
  const T = useI18n()
  // const { account } = useWeb3React()
  // const { login, logout } = useAuth()
  // const { onPresentConnectModal } = useWalletModal(login, logout, account)

  // const handleUnlockWallet = () => {
  //   onPresentConnectModal()
  // }

  const data = [
    {
      title: 'Your HORA balance',
      logo,
      description: 'Locked',
    },
    {
      title: 'Pending harvest',
      logo,
      description: '0.000',
    },
    {
      title: 'HORA price',
      logo: null,
      description: '$0.04',
    },
    {
      title: 'HORA  Market Cap',
      logo: null,
      description: '$400,000,000',
    },
    {
      title: 'HORA in circulation',
      logo,
      description: '107,057,462',
    },
    {
      title: 'Total supply',
      logo,
      description: '10,000,000,000',
    },
    {
      title: 'TVL',
      logo: null,
      description: '$75,124,413',
    },
    {
      title: 'Volume(24hrs)',
      logo: null,
      description: `$${(1760000 * MUTIL_VOLUME).toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`,
    },
  ]
  const data2 = [
    {
      title: 'Minted NFT',
      logo: null,
      description: '81,052',
    },
    {
      title: 'Your HORA balance',
      logo: null,
      description: '214,426',
    },
    {
      title: 'NFT Trading Vol',
      logo,
      description: '257,096,457',
    },
    {
      title: 'HORA locked by NFT',
      logo,
      description: '5,214,021',
    },
  ]
  const data3 = [
    {
      image: hotestImg1,
      btnName: 'Waiting', // Approve vote
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg2, 
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg3,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg4,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg5,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg6,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg7,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg8,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg9,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg10,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
    {
      image: hotestImg11,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000', 
      heartCount: 10,
    },
    {
      image: hotestImg12,
      btnName: 'Waiting',
      tokenLogo: logo,
      balance: '40,000',
      heartCount: 10,
    },
  ]
  return (
    <>
      <div className="dashboard-container">
        <HeaderHome />
        <div className="dashboard-body">
          <Row gutter={30} style={{ marginTop: '30px' }}>
            <Col lg={16} xs={24}>
              <TokenStats data={data} width={innerWith < 768 ? '50%' : '25%'} />
            </Col>
            <Col lg={8} xs={24}>
              <TokenStats data={data2} width="50%" />
            </Col>
          </Row>
          <Row gutter={[25, 25]}>
            <Col span={24}>
              <div className="hottest-title-outside">
                <h2>Hottest Artworks in 2 weeks</h2>
                <QuestionHelper text={T(null, 'Hottest Artworks')} />
              </div>
            </Col>
            {data3.map((ele, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col xs={12} sm={8} md={6} key={`hottest-${index}`}>
                <HottestItem item={ele} />
              </Col>
            ))}
          </Row>
        </div>
        <Footer />
      </div>
      <ModalNew />
    </>
  )
}

export default DashboardPage
