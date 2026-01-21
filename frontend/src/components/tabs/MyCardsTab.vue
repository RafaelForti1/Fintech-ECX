<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import CreditCard from '@/components/CreditCard.vue'
import { PlusCircle } from 'lucide-vue-next'

const authStore = useAuthStore()

const creditCards = [
  { id: 1, name: authStore.user?.name || 'User Name', number: '4532 1234 5678 9012', expiry: '12/28', type: 'visa' },
  { id: 2, name: authStore.user?.name || 'User Name', number: '5412 7512 3412 3456', expiry: '09/26', type: 'mastercard' },
  { id: 3, name: authStore.user?.name || 'User Name', number: '4242 4242 4242 4242', expiry: '01/30', type: 'visa' }
] as const

</script>

<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">My Cards</h1>
        <p class="text-gray-500 mt-1">Manage your physical and virtual cards.</p>
      </div>
      <button class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-all">
        <PlusCircle class="h-5 w-5 mr-2" />
        Add New Card
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="card in creditCards" :key="card.id" class="transform transition-all hover:-translate-y-1">
            <CreditCard v-bind="card" />
            
            <div class="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
                <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-500">Status</span>
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
                </div>
                 <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-500">Monthly Limit</span>
                    <span class="font-medium text-gray-900">R$ 10.000,00</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-indigo-600 h-2 rounded-full" style="width: 45%"></div>
                </div>
                 <div class="flex justify-between items-center text-xs text-gray-400">
                    <span>Used: R$ 4.500,00</span>
                    <span>Remaining: R$ 5.500,00</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
