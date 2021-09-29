import './styles.css'
import React from 'react'
import { Button } from 'antd'

const SelectNumberOption = ({ handleSelect = () => undefined }) => {
  return (
    <div className="button-action-amount">
      <Button onClick={() => handleSelect(25)}>25%</Button>
      <Button onClick={() => handleSelect(50)}>50%</Button>
      <Button onClick={() => handleSelect(75)}>75%</Button>
      <Button onClick={() => handleSelect(100)}>100%</Button>
    </div>
  )
}

export default SelectNumberOption
