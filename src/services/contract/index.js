import { useStakingContract } from 'hooks/useContract'
import { STAKING_SMART_CONTRACT } from '../../constants'

export default class ContractStaking {
  constructor() {
    this.account = null
    this.contract = null

    this.getContract()
  }

  async getContract() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.contract = useStakingContract(STAKING_SMART_CONTRACT, false)
  }

  async getListPlanInfo() {
    const contract = await this.getContract()

    console.log('PERCENTS_DIVIDER', await contract.getPlanInfo(1))

    return {
      listPlan: [],
    }
  }
}
