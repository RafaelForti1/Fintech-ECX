<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  number: string
  expiry: string
  type: 'visa' | 'mastercard'
}>()

const backgroundClass = computed(() => {
  return props.type === 'visa' 
    ? 'bg-gradient-to-br from-blue-600 to-blue-800'
    : 'bg-gradient-to-br from-purple-600 to-indigo-800'
})

const formattedNumber = computed(() => {
  return props.number.replace(/(\d{4})/g, '$1 ').trim()
})
</script>

<template>
  <div 
    class="relative w-full h-48 rounded-2xl p-6 text-white shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300"
    :class="backgroundClass"
  >
    <!-- Background Patterns -->
    <div class="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
    <div class="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>

    <div class="flex flex-col justify-between h-full relative z-10">
      <div class="flex justify-between items-start">
        <div class="text-xs opacity-75 font-mono">Debit Card</div>
        <div class="font-bold italic text-xl">{{ type === 'visa' ? 'VISA' : 'Mastercard' }}</div>
      </div>

      <div class="mt-4">
        <div class="flex items-center space-x-2 mb-2">
            <div class="w-10 h-6 bg-yellow-400 rounded-md opacity-80 flex items-center justify-center">
                <div class="w-6 h-4 border border-black opacity-20 rounded-sm"></div>
            </div>
            <div class="text-2xl font-mono tracking-widest drop-shadow-md">
            {{ formattedNumber }}
            </div>
        </div>
      </div>

      <div class="flex justify-between items-end">
        <div>
          <div class="text-xs opacity-75 uppercase">Card Holder</div>
          <div class="font-medium tracking-wide">{{ name }}</div>
        </div>
        <div>
          <div class="text-xs opacity-75 uppercase">Expires</div>
          <div class="font-medium tracking-wide">{{ expiry }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
