import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// Configure Axios base URL
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/v1'

export interface Transaction {
  id: number
  type: 'deposit' | 'withdraw' | 'transfer_in' | 'transfer_out'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

export const useTransactionStore = defineStore('transaction', () => {
  const balance = ref(0)
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const error = ref(null)

  // Mock data for initial state
  const mockTransactions: Transaction[] = [
    { id: 1, type: 'deposit', amount: 5000.00, description: 'Initial Deposit', date: '2023-10-25', status: 'completed' },
    { id: 2, type: 'withdraw', amount: 200.00, description: 'ATM Withdrawal', date: '2023-10-26', status: 'completed' },
    { id: 3, type: 'transfer_out', amount: 150.50, description: 'Payment to John', date: '2023-10-27', status: 'completed' },
    { id: 4, type: 'transfer_in', amount: 1000.00, description: 'Freelance Work', date: '2023-10-28', status: 'completed' },
    { id: 5, type: 'withdraw', amount: 50.00, description: 'Spotify Subscription', date: '2023-10-29', status: 'completed' },
  ]

  async function fetchAccountData() {
    isLoading.value = true
    error.value = null
    try {
      // MOCK MODE: Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      balance.value = 5599.50
      transactions.value = mockTransactions
      
    } catch (err: any) {
      error.value = 'Failed to fetch account data (Mock)'
    } finally {
      isLoading.value = false
    }
  }

  async function createTransaction(transactionData: any) {
    isLoading.value = true
    error.value = null
    try {
        // MOCK MODE: Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newTransaction: Transaction = {
            id: Math.floor(Math.random() * 10000),
            type: transactionData.type,
            amount: parseFloat(transactionData.amount),
            description: transactionData.description || transactionData.type,
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        }

        if (transactionData.type === 'deposit') {
            balance.value += newTransaction.amount
        } else {
            if (balance.value < newTransaction.amount) {
                throw new Error("Insufficient funds")
            }
            balance.value -= newTransaction.amount
        }
        
        transactions.value.unshift(newTransaction)

    } catch (err: any) {
        error.value = err.message || 'Failed to process transaction (Mock)'
        throw err 
    } finally {
        isLoading.value = false
    }
  }

  const recentTransactions = computed(() => {
    return transactions.value.slice(0, 5)
  })

  return {
    balance,
    transactions,
    recentTransactions,
    isLoading,
    error,
    fetchAccountData,
    createTransaction
  }
})
