import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '@/router'

// Configure Axios base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = computed(() => !!token.value)
  const isLoading = ref(false)
  const error = ref(null)

  // Set default auth header if token exists
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  async function login(credentials: any) {
    isLoading.value = true
    error.value = null
    try {
      // MOCK MODE: Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: 'Mock User',
        role: 'user'
      }
      
      const mockToken = 'mock-jwt-token-123456'
      
      token.value = mockToken
      user.value = mockUser
      
      localStorage.setItem('token', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      await router.push('/dashboard')
    } catch (err: any) {
      error.value = 'Failed to login (Mock)'
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: any) {
    isLoading.value = true
    error.value = null
    try {
      // MOCK MODE: Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockUser = {
        id: 2,
        email: userData.email,
        name: userData.name,
        role: 'user'
      }
      
      const mockToken = 'mock-jwt-token-new-user'
      
      token.value = mockToken
      user.value = mockUser
      
      localStorage.setItem('token', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      await router.push('/dashboard')
    } catch (err: any) {
      error.value = 'Failed to register (Mock)'
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout
  }
})
