import '../styles.css'
import React from 'react'
import { Button } from 'antd'
import heartIcon from 'assets/images/heart-icon.png'

const HottestItem = ({ item }) => { 
  // const dispatch = useDispatch()

  return (
    <div className="hottest-wrapper">
      <img className="hottest-bg" src={item.image} alt="" />
      <Button className="hottest-action">
        {item.btnName}
      </Button>
      <div className="hottest-footer">
        <div className="hottest-footer-position">
          <div className="hottest-footer-content">
            <div className="token-balance">
              <img className="token-logo" src={item.tokenLogo} alt="" />
              <span>{item.balance}</span>
            </div>
            <div className="heart-likes">
              <img src={heartIcon} alt="" />
              <span>{item.heartCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HottestItem
