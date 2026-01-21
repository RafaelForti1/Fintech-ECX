<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '@/stores/transaction'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-vue-next'

const props = defineProps<{
  transactions: Transaction[]
  loading?: boolean
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
</script>

<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
    </div>
    <ul role="list" class="divide-y divide-gray-200">
      <li v-if="loading" class="px-4 py-4 sm:px-6 text-center text-gray-500">
        Loading transactions...
      </li>
      <li v-else-if="transactions.length === 0" class="px-4 py-4 sm:px-6 text-center text-gray-500">
        No transactions found.
      </li>
      <li v-for="transaction in transactions" :key="transaction.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" 
                 :class="{
                   'bg-green-100': transaction.type === 'deposit' || transaction.type === 'transfer_in',
                   'bg-red-100': transaction.type === 'withdraw' || transaction.type === 'transfer_out'
                 }">
               <ArrowUpIcon v-if="transaction.type === 'deposit' || transaction.type === 'transfer_in'" class="h-6 w-6 text-green-600" />
               <ArrowDownIcon v-else class="h-6 w-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ transaction.description }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(transaction.date) }}
              </p>
            </div>
          </div>
          <div class="ml-2 flex-shrink-0 flex flex-col items-end">
            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
               :class="{
                 'text-green-800': transaction.type === 'deposit' || transaction.type === 'transfer_in',
                 'text-red-800': transaction.type === 'withdraw' || transaction.type === 'transfer_out'
               }">
              {{ transaction.type === 'deposit' || transaction.type === 'transfer_in' ? '+' : '-' }}
              {{ formatCurrency(transaction.amount) }}
            </p>
            <p class="text-xs text-gray-400 mt-1 capitalize">{{ transaction.type.replace('_', ' ') }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
