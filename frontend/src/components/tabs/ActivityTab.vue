<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import TransactionList from '@/components/TransactionList.vue'
import { Search, Filter } from 'lucide-vue-next'

const transactionStore = useTransactionStore()
const searchQuery = ref('')
const filterType = ref('all')

const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = filterType.value === 'all' || t.type === filterType.value
    return matchesSearch && matchesType
  })
})
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Activity</h1>
      <p class="text-gray-500 mt-1">View your complete transaction history.</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Toolbar -->
      <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="relative max-w-md w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search transactions..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
        </div>
        
        <div class="flex items-center space-x-2">
           <Filter class="h-5 w-5 text-gray-400" />
           <select v-model="filterType" class="border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
             <option value="all">All Transactions</option>
             <option value="deposit">Deposits</option>
             <option value="withdraw">Withdrawals</option>
             <option value="transfer_in">Received</option>
             <option value="transfer_out">Sent</option>
           </select>
        </div>
      </div>

      <TransactionList 
        :transactions="filteredTransactions" 
        :loading="transactionStore.isLoading" 
      />
    </div>
  </div>
</template>
