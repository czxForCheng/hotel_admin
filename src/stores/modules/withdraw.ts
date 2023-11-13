import { processWithdrawal } from '@/api/finance/withdraw'
import { defineStore } from 'pinia'
interface WithdrawSate {
    withdrawNumber: number
}

const useWithdrawStore = defineStore({
    id: 'withdraw',
    state: (): WithdrawSate => {
        return {
            withdrawNumber: 0
        }
    },
    actions: {
        getWithdraeNumber() {
            return new Promise((resolve, reject) => {
                processWithdrawal({}).then(res => {
                    this.withdrawNumber = res.msgNum
                    resolve(res.msgNum)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default useWithdrawStore
