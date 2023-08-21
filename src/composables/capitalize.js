import { ref } from 'vue'
export const capitalize = ref(function (string) {
  if (!string) {
    return ''
  }
  const firstChar = string[0].toUpperCase()
  const remainder = string.slice(1)
  return firstChar + remainder
})
