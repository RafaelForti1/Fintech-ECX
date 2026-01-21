<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transaction'
import TransactionModal from '@/components/TransactionModal.vue'
import DashboardTab from '@/components/tabs/DashboardTab.vue'
import MyCardsTab from '@/components/tabs/MyCardsTab.vue'
import ActivityTab from '@/components/tabs/ActivityTab.vue'
import SettingsTab from '@/components/tabs/SettingsTab.vue'

import { 
  Wallet, 
  LogOut, 
  LayoutDashboard,
  CreditCard as CreditCardIcon,
  Activity,
  Settings,
  Bell
} from 'lucide-vue-next'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const isModalOpen = ref(false)
const modalType = ref<'deposit' | 'withdraw' | 'transfer' | null>(null)

const activeTab = ref('Dashboard')
const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, component: DashboardTab },
  { name: 'My Cards', icon: CreditCardIcon, component: MyCardsTab },
  { name: 'Activity', icon: Activity, component: ActivityTab },
  { name: 'Settings', icon: Settings, component: SettingsTab },
]

const currentTabComponent = computed(() => {
    return menuItems.find(i => i.name === activeTab.value)?.component || DashboardTab
})

onMounted(() => {
  transactionStore.fetchAccountData()
})

const openModal = (type: 'deposit' | 'withdraw' | 'transfer') => {
  modalType.value = type
  isModalOpen.value = true
}

const handleTransactionSubmit = async (data: any) => {
  try {
    await transactionStore.createTransaction(data)
    isModalOpen.value = false
  } catch (error) {
    alert("Transaction failed: " + error)
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-50 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-xl hidden md:flex flex-col z-10">
      <div class="h-16 flex items-center px-8 border-b border-gray-100">
        <Wallet class="h-8 w-8 text-indigo-600" />
        <span class="ml-3 text-2xl font-bold text-gray-800 tracking-tight">EcxWallet</span>
      </div>
      
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a v-for="item in menuItems" 
           :key="item.name"
           href="#" 
           @click.prevent="activeTab = item.name"
           class="flex items-center px-4 py-3 text-gray-600 rounded-xl transition-all duration-200 group"
           :class="activeTab === item.name ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' : 'hover:bg-gray-50 hover:text-gray-900'"
        >
          <component :is="item.icon" 
            class="h-5 w-5 mr-3 transition-colors"
            :class="activeTab === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'" 
          />
          {{ item.name }}
        </a>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button @click="authStore.logout" class="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
          <LogOut class="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header -->
      <header class="bg-white shadow-sm h-16 flex justify-between items-center px-6 md:px-8 z-10">
        <div class="flex items-center md:hidden">
            <Wallet class="h-8 w-8 text-indigo-600" />
        </div>
        <div class="flex items-center space-x-4 ml-auto">
          <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 relative">
            <Bell class="h-6 w-6" />
            <span class="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div class="flex items-center pl-4 border-l border-gray-200">
             <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {{ authStore.user?.name?.charAt(0) || 'U' }}
             </div>
             <span class="ml-3 text-sm font-medium text-gray-700 hidden sm:block">{{ authStore.user?.name || 'User' }}</span>
          </div>
        </div>
      </header>

      <!-- Scrollable Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
        
        <component :is="currentTabComponent" @open-modal="openModal" />

      </main>
    </div>

    <!-- Modal -->
    <TransactionModal 
      :isOpen="isModalOpen"
      :type="modalType"
      @close="isModalOpen = false"
      @submit="handleTransactionSubmit"
    />
  </div>
</template>
