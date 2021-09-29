import { createReducer, nanoid } from '@reduxjs/toolkit'
import {
  addPopup,
  setShowModalNew,
  setAccountToState,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
  setOpenModalStake,
} from './actions'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  blockNumber: { [chainId: number]: number }
  showModalNew: boolean
  account: any
  popupList: PopupList
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  modalOverview: any
}

const initialState: ApplicationState = {
  blockNumber: {},
  showModalNew: true,
  account: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
  modalOverview: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setAccountToState, (state, action) => {
      state.account = action.payload
    })
    .addCase(setShowModalNew, (state, action) => {
      state.showModalNew = action.payload?.status
    })
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(setOpenModalStake, (state, action) => {
      state.modalOverview = action.payload
    })
)
