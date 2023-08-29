<script setup>
  import { reactive, defineProps } from 'vue';
  import { typeList } from '../composables/typeList';
  import { regionList } from '../composables/regionList';
  import { usePokeBank } from '../stores/Pokebank.js';
  import TypePill from './Type-Pill.vue';
  const state = reactive({
      currentTeamList: []
  });
  const props = defineProps({
      teamSize: [Number, String],
      regionFilters: Array,
      typeFilters: Array
  });
  
  // if that didn't work, then fetch the data and store it
  if (!usePokeBank().getPokedex().length) {
    usePokeBank().fetchAllPokemon();
  }

  function capitalize(string) {
    if (!string) { return '' }
    const firstChar = string[0].toUpperCase();
    const remainder = string.slice(1);
    return firstChar + remainder;
  }

  function choosePokemonByType(type) {
    if (!type) {
      console.log(`No type filters set, returning all pokemon...`);
      return usePokeBank().getPokedex()[Math.floor(Math.random() * usePokeBank().getKnownPokemonCount())];
    } else {
      console.log(`Searching for ${type} element types...`);
      let typedPokemon = usePokeBank().getPokedex().filter(function(mon) {
        return mon.types[0]?.type?.name === type || mon.types[1]?.type?.name === type;
      });
      console.log(`Found these Pokemon:`, typedPokemon);
      return typedPokemon.length ? typedPokemon[Math.floor(Math.random() * typedPokemon.length)] : 0;
    }
  }

  function generateTeam() {
    let n;
    // use the filtered list if it's not empty; if it is empty, then use the full list
    let typeFiltersArray = props.typeFilters.length ? props.typeFilters : typeList;
    //let regionFiltersArray = props.regionFilters.length ? props.regionFilters : regionList;
    state.currentTeamList = [];
    // TODO: make the type filters pre-filter the list so we don't pick missing types
    // TODO: change this to do/while and increment when we're sure we found a matching type (they can turn off types)
    for (var a=0; a < Number(props.teamSize); a++) {
      n = Math.floor(Math.random() * typeFiltersArray.length);
      let newChoice = choosePokemonByType(typeFiltersArray[n]);
      let currentTeammate;
      // check if this pokemon is already on the team
      if (state.currentTeamList.length) {
        currentTeammate = state.currentTeamList.find(function(mon) { 
          return mon?.name === newChoice?.name;
        });
      }
      if (newChoice) {
        if (currentTeammate) {
          console.log(`Skipping ${ newChoice.name } - they are already on the team!`);
        } else {
          state.currentTeamList.push(newChoice);
        }
      }
    }
    console.log('Team generated:', state.currentTeamList);
  }
</script>

<template>
  <button class="bg-indigo-500 rounded-full py-2 px-4 mb-3 text-white" @click="generateTeam">Generate Pokemon Team</button>
  <div class="p-4 my-4 border-2 border-indigo-300">
    <p v-if="!state.currentTeamList.length">No team generated yet.</p>
    <ul v-else class="grid grid-cols-3 gap-2">
      <!-- make this a "slot" for a card? -->
      <li class="bg-indigo-100 p-3" v-for="(member, index) in state.currentTeamList" :key="`member-${index}`">
        <img class="float-right bg-white rounded-full" :src="member?.sprites?.front_default" />
        <h4 class="text-lg">{{ capitalize(member?.name) }}</h4> 
        <TypePill v-if="member?.types[0]" :type="member?.types[0].type.name" />
        <TypePill v-if="member?.types[1]" :type="member?.types[1].type.name" />
      </li>
    </ul>
  </div>
</template>