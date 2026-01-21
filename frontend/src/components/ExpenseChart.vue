<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  income: number
  expense: number
}>()

const data = computed(() => ({
  labels: ['Income', 'Expenses'],
  datasets: [
    {
      backgroundColor: ['#10B981', '#EF4444'],
      data: [props.income, props.expense]
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  }
}
</script>

<template>
  <div class="h-64 w-full flex flex-col items-center justify-center">
    <Doughnut :data="data" :options="options" />
  </div>
</template>
