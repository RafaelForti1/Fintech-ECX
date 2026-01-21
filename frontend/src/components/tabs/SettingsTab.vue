<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { User, Bell, Lock, Shield } from 'lucide-vue-next'

const authStore = useAuthStore()

const form = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  notifications: true,
  twoFactor: false
})

const saveSettings = () => {
  alert('Settings saved! (Mock)')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Settings</h1>
      <p class="text-gray-500 mt-1">Manage your account preferences and security.</p>
    </div>

    <div class="space-y-6">
      <!-- Profile Section -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div class="flex items-center space-x-4 mb-6">
          <div class="p-3 bg-indigo-50 rounded-full text-indigo-600">
            <User class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-800">Profile Information</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="form.name" type="text" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled>
            <p class="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div class="flex items-center space-x-4 mb-6">
          <div class="p-3 bg-yellow-50 rounded-full text-yellow-600">
            <Bell class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-800">Notifications</h2>
        </div>

        <div class="flex items-center justify-between">
          <div>
             <h3 class="font-medium text-gray-900">Email Notifications</h3>
             <p class="text-sm text-gray-500">Receive emails about your account activity.</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="form.notifications" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      <!-- Security -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div class="flex items-center space-x-4 mb-6">
          <div class="p-3 bg-red-50 rounded-full text-red-600">
            <Shield class="h-6 w-6" />
          </div>
          <h2 class="text-lg font-bold text-gray-800">Security</h2>
        </div>

        <div class="space-y-6">
           <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Two-Factor Authentication</h3>
              <p class="text-sm text-gray-500">Add an extra layer of security to your account.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.twoFactor" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          
          <div class="border-t border-gray-100 pt-6">
             <button class="flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                <Lock class="h-4 w-4 mr-2" />
                Change Password
             </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="saveSettings" class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
          Save Changes
        </button>
      </div>

    </div>
  </div>
</template>
