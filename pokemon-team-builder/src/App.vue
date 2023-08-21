<script>
  import Pokedex from './components/Pokedex-Container.vue';
  import { typeList } from './composables/typeList';
  import { regionList } from './composables/regionList';
  export default {
    data: () => ({
      teamSize: 6,
      regionFilters: [],
      isAllTypesChecked: false,
      typeFilters: [],
      typeList: typeList,
      regionList: regionList
    }),
    components: {
      Pokedex
    },
    methods: {
      capitalize: function(string) {
        if (!string) { return '' }
        const firstChar = string[0].toUpperCase();
        const remainder = string.slice(1);
        return firstChar + remainder;
      },
      toggleAllTypeFilters: function() {
        this.isAllTypesChecked = !this.isAllTypesChecked;
        this.typeFilters = [];
        if (this.isAllTypesChecked) {
          for (var key in this.typeList) {
            this.typeFilters.push(this.typeList[key]);
          }
        }
      },
      updateIsAllTypesChecked: function() {
        // watch for the 'check all' indicator
        if (this.typeFilters.length === this.typeList.length) {
          this.isAllTypesChecked = true;
        } else {
          this.isAllTypesChecked = false;
        }
      }
    }
  }

/* NOTES
  1 - ensure caching and or do local storage (endpoint spamming right now for testing)
  2 - add Tailwind CSS for styling?
  3 - add 'ban' option for pokemon user doesn't like (exclusion list)
  4 - sort/filter by element type
  5 - sort/fiter by region
  6 - add exclusions for duplicates/evolutions of same type (add a "allow evolutions" toggle)
  7 - add "limit to mega evolutions" option?
  8 - build display of team
  9 - allow "save" teams; up to 10 teams generated?
  10 - utility for things like "capitalize" so not repeating methods

*/
</script>

<template>
  <header class="container">
    <h1 class="text-3xl text-gray-700 font-bold mb-5">Pokemon Team Builder</h1>
  </header>
  <main class="text-gray-500 text-lg">
    <div class="p-4 my-4 border-2 border-slate-300">
      <h2>Team Size</h2>
      <select v-model="teamSize">
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </div>
    <div class="p-4 my-4 border-2 border-slate-300">
      <h2>Element Types</h2>
      <label><b><input type="checkbox" @click="toggleAllTypeFilters" v-model="isAllTypesChecked" />Toggle All Types</b></label>
      <ol class="grid grid-cols-6 gap-2">
        <li v-for="(type, index) in typeList" :key="`type-${index}`">
          <label>
            <input 
              type="checkbox" 
              :value="type" 
              v-model="typeFilters" 
              checked="{{ isAllTypesChecked }}"
              @change="updateIsAllTypesChecked" 
            />{{ this.capitalize(type) }}
          </label>
        </li>
      </ol>
    </div>
    <div class="p-4 my-4 border-2 border-slate-300">
      <h2>Native Regions</h2>
      <ol class="grid grid-cols-6 gap-2">
        <li v-for="(region, index) in regionList" :key="`region-${index}`"><label><input type="checkbox" />{{ this.capitalize(region) }}</label></li>
      </ol>
    </div>
  </main>
  <Suspense>
    <Pokedex 
      :team-size="teamSize" 
      :region-filters="regionFilters" 
      :type-filters="typeFilters"
    />
    <!-- add spinning pokeball icon here? -->
    <template v-slot:fallback>
      Loading Pokedex...
    </template>
  </Suspense>
</template>

<style scoped>
</style>
