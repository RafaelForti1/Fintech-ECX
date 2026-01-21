<script setup lang="ts">
import { ref, computed } from 'vue'
import { XIcon } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  type: 'deposit' | 'withdraw' | 'transfer' | null
}>()

const emit = defineEmits(['close', 'submit'])

const amount = ref('')
const description = ref('')
const targetEmail = ref('') // For transfers

const title = computed(() => {
  switch (props.type) {
    case 'deposit': return 'Deposit Funds'
    case 'withdraw': return 'Withdraw Funds'
    case 'transfer': return 'Transfer Money'
    default: return ''
  }
})

const handleSubmit = () => {
  if (!amount.value) return
  
  emit('submit', {
    type: props.type === 'transfer' ? 'transfer_out' : props.type,
    amount: parseFloat(amount.value),
    description: description.value,
    target_email: targetEmail.value
  })
  
  // Reset form
  amount.value = ''
  description.value = ''
  targetEmail.value = ''
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ title }}
                </h3>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
                  <XIcon class="h-6 w-6" />
                </button>
              </div>
              
              <div class="mt-2 space-y-4">
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input type="number" name="amount" id="amount" v-model="amount" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.00" step="0.01" min="0.01" required>
                  </div>
                </div>

                <div v-if="props.type === 'transfer'">
                   <label for="target" class="block text-sm font-medium text-gray-700">Target User (Email)</label>
                   <input type="email" name="target" id="target" v-model="targetEmail" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 border px-3" placeholder="user@example.com">
                </div>

                <div>
                   <label for="description" class="block text-sm font-medium text-gray-700">Description (Optional)</label>
                   <input type="text" name="description" id="description" v-model="description" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 border px-3" placeholder="Payment for...">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="handleSubmit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
            Confirm
          </button>
          <button type="button" @click="$emit('close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
