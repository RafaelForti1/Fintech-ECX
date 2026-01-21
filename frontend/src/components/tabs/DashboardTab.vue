<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useAuthStore } from '@/stores/auth'
import TransactionList from '@/components/TransactionList.vue'
import CreditCard from '@/components/CreditCard.vue'
import ExpenseChart from '@/components/ExpenseChart.vue'
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Send
} from 'lucide-vue-next'

const transactionStore = useTransactionStore()
const authStore = useAuthStore()

const emit = defineEmits(['open-modal'])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

// Calculate Income/Expense for Chart
const income = computed(() => {
  return transactionStore.transactions
    .filter(t => t.type === 'deposit' || t.type === 'transfer_in')
    .reduce((acc, t) => acc + t.amount, 0)
})

const expense = computed(() => {
  return transactionStore.transactions
    .filter(t => t.type === 'withdraw' || t.type === 'transfer_out')
    .reduce((acc, t) => acc + t.amount, 0)
})

// Mock Credit Card Data
const creditCards = [
  { id: 1, name: authStore.user?.name || 'User Name', number: '4532 1234 5678 9012', expiry: '12/28', type: 'visa' },
  { id: 2, name: authStore.user?.name || 'User Name', number: '5412 7512 3412 3456', expiry: '09/26', type: 'mastercard' }
] as const

</script>

<template>
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- Welcome Section -->
        <div>
        <h1 class="text-2xl font-bold text-gray-800">Overview</h1>
        <p class="text-gray-500 mt-1">Here's what's happening with your wallet today.</p>
        </div>

        <!-- Quick Stats & Actions Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Balance Card -->
        <div class="lg:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl shadow-lg p-8 text-white relative overflow-hidden">
            <div class="relative z-10">
            <h2 class="text-indigo-100 font-medium text-sm uppercase tracking-wider">Total Balance</h2>
            <div class="text-5xl font-bold mt-4 tracking-tight">{{ formatCurrency(transactionStore.balance) }}</div>
            
            <div class="mt-10 flex flex-wrap gap-4">
                <button @click="$emit('open-modal', 'deposit')" class="flex items-center bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-50 transition-all transform hover:-translate-y-1">
                <ArrowUpCircle class="h-5 w-5 mr-2" />
                Deposit
                </button>
                <button @click="$emit('open-modal', 'withdraw')" class="flex items-center bg-indigo-800/50 text-white px-6 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-indigo-800/70 transition-all">
                <ArrowDownCircle class="h-5 w-5 mr-2" />
                Withdraw
                </button>
                <button @click="$emit('open-modal', 'transfer')" class="flex items-center bg-indigo-800/50 text-white px-6 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-indigo-800/70 transition-all">
                <Send class="h-5 w-5 mr-2" />
                Transfer
                </button>
            </div>
            </div>
            
            <!-- Decorative Circles -->
            <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
        </div>

        <!-- Expense Chart -->
        <div class="bg-white rounded-3xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100">
            <h3 class="text-lg font-bold text-gray-800 mb-4 self-start">Money Flow</h3>
            <ExpenseChart v-if="income > 0 || expense > 0" :income="income" :expense="expense" />
            <div v-else class="text-gray-400 text-sm py-10">No data to display</div>
        </div>

        </div>

        <!-- Cards & Transactions Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- My Cards -->
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-800">My Cards</h3>
                <button class="text-indigo-600 text-sm font-semibold hover:text-indigo-700">+ Add New</button>
            </div>
            <div class="space-y-4">
                <CreditCard v-for="card in creditCards" :key="card.id" v-bind="card" />
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="lg:col-span-2 space-y-6">
                <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-800">Recent Transactions</h3>
                <button class="text-indigo-600 text-sm font-semibold hover:text-indigo-700">View All</button>
            </div>
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <TransactionList 
                    :transactions="transactionStore.recentTransactions" 
                    :loading="transactionStore.isLoading" 
                />
            </div>
        </div>

        </div>
    </div>
</template>