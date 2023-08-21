<script setup>
  import { reactive, defineProps } from "vue";
  const state = reactive({
      currentTeamList: [],
      pokedex: []
  });
  const props = defineProps({
      teamSize: [Number, String],
      regionFilters: Array,
      typeFilters: Array,
      regionList: String,
      typeList: String
  });
  async function fetchPokemon() {
      const initialRecord = {count: 50}; // for debugging until we get the caching stored
      //const initialRecord = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1', { cache: "force-cache" }).then((response) => response.json())
      // get the full list by the current total count
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${initialRecord.count}`, { cache: "force-cache" })
        .then(response => response.json())
        .then(response => {
          response.results.forEach((pokemon) => {
            // get the details for each pokemon so we can sort/filter by type, region, etc.
            fetch(`${pokemon.url}`, { cache: "force-cache" })
              .then(details => details.json())              
              .then((details) => {
                state.pokedex.push(Object.assign( {}, pokemon, details));
            })
          })
        })
        .catch((err) => {
          console.error(err);
        })

        return state.pokedex;
  }
  fetchPokemon();

  function capitalize(string) {
    if (!string) { return '' }
    const firstChar = string[0].toUpperCase();
    const remainder = string.slice(1);
    return firstChar + remainder;
  }
  function choosePokemonByType(type) {
    console.log(`looking for ${type} types`);
    const typedPokemon = state.pokedex.filter(function(mon) {
      return mon.types[0]?.type?.name === type || mon.types[1]?.type?.name === type;
    });
    console.log(`found these for ${type} types`, typedPokemon);
    return typedPokemon.length ? typedPokemon[Math.floor(Math.random() * typedPokemon.length)] : {};
  }
  // TODO: Probably supposed to be a component with a slot? Need to research...
  function createTypeBadges(types) {
    types = Array.isArray(types) ? types : [];
    let template = '';
    types.forEach(function(type) {
      template += `<span class="type_${type.type.name}">${type.type.name}</span>`;
    })
    return template;
  }
  function generateTeam() {
    let n;
    // use the filtered list if it's not empty; if it is empty, then use the full list
    let typeFiltersArray = props.typeFilters.length ? props.typeFilters : props.typeList.split(',');
    //let regionFiltersArray = props.regionFilters.length ? props.regionFilters : props.regionList.split(',');
    state.currentTeamList = [];
    // TODO: make the type filters pre-filter the list so we don't pick missing types
    // TODO: change this to do/while and increment when we're sure we found a matching type (they can turn off types)
    for(var a=0; a < Number(props.teamSize); a++) {
      n = Math.floor(Math.random() * typeFiltersArray.length);
      let newChoice = choosePokemonByType(typeFiltersArray[n]);
      let currentTeammate = state.currentTeamList.find(function(mon) { return mon.name === newChoice.name });
      if (newChoice) {
        if (currentTeammate) {
          console.log(`Skipping ${ newChoice.name} - they are already on the team!`);
        } else {
          state.currentTeamList.push(newChoice);
        }
      }
    }
    console.log('chosen team', state.currentTeamList);
  }
</script>

<template>
  <button class="bg-indigo-500 rounded-full py-2 px-4 mb-3 text-white" @click="generateTeam">Generate Pokemon Team</button>
  <div class="p-4 my-4 border-2 border-indigo-300">
    <p v-if="!state.currentTeamList.length">No team generated yet.</p>
    <ul v-else>
      <!-- make this a "slot" for a card? -->
      <li v-for="(member, index) in state.currentTeamList" :key="`member-${index}`">{{ capitalize(member?.name) }} {{ createTypeBadges(member?.types) }}  <img class="sprite-image" :src="member?.sprites?.front_default" /></li>
    </ul>
  </div>
</template>