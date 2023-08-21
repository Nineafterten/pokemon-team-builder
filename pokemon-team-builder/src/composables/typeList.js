import { ref } from 'vue'

// TODO: consolidate this into one object?

export const typeList = ref([
  'normal',
  'grass',
  'water',
  'fire',
  'electric',
  'ground',
  'flying',
  'rock',
  'bug',
  'ghost',
  'poison',
  'fighting',
  'psychic',
  'ice',
  'dragon',
  'steel',
  'dark',
  'fairy'
])
export const bgColorMap = ref({
  normal: 'bg-zinc-200',
  grass: 'bg-green-600',
  water: 'bg-blue-600',
  fire: 'bg-orange-500',
  electric: 'bg-yellow-400',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  rock: 'bg-yellow-800',
  bug: 'bg-lime-400',
  ghost: 'bg-indigo-800',
  poison: 'bg-fuchsia-700',
  fighting: 'bg-red-800',
  psychic: 'bg-rose-700',
  ice: 'bg-cyan-300',
  dragon: 'bg-purple-700',
  steel: 'bg-slate-400',
  dark: 'bg-stone-700',
  fairy: 'bg-pink-300'
})
export const textColorMap = ref({
  normal: 'text-black',
  grass: 'text-white',
  water: 'text-white',
  fire: 'text-white',
  electric: 'text-black',
  ground: 'text-white',
  flying: 'text-white',
  rock: 'text-white',
  bug: 'text-black',
  ghost: 'text-white',
  poison: 'text-white',
  fighting: 'text-white',
  psychic: 'text-white',
  ice: 'text-black',
  dragon: 'text-white',
  steel: 'text-white',
  dark: 'text-white',
  fairy: 'text-black'
})
