<script>
  import Pokedex from './components/Pokedex-Container.vue';
  import { capitalize } from './composables/capitalize';
  import { typeList } from './composables/typeList';
  import { regionList } from './composables/regionList';
  import { bgColorMap, textColorMap } from './composables/typeList';
  export default {
    data: () => ({
      teamSize: 6,
      regionFilters: [],
      isAllTypesChecked: false,
      typeFilters: [],
      capitalize: capitalize,
      typeList: typeList,
      regionList: regionList,
      bgColorMap: bgColorMap,
      textColorMap: textColorMap
    }),
    components: {
      Pokedex
    },
    methods: {
      
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
  - ensure caching and or do local storage (endpoint spamming right now for testing)
  - add 'ban' option for pokemon user doesn't like (exclusion list)
  - fiter by region
  - add exclusions for duplicates/evolutions of same type (add a "allow evolutions" toggle)
  - add "limit to mega evolutions" option?
  - build display of team
  - allow "save" teams; up to 10 teams generated?
*/
</script>

<template>
  <header>
    <h1 class="text-3xl text-gray-700 font-bold mb-5">Pokemon Team Builder</h1>
  </header>
  <main class="text-gray-500 text-lg">
    <div class="my-4 border-2 border-slate-300">
      <h2 class="text-lg mb-2 bg-slate-200 px-2 py-2">Team Size</h2>
      <select v-model="teamSize">
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </div>
    <div class="my-4 border-2 border-slate-300">
      <h3 class="py-2 px-3 float-right">
        <input type="checkbox" @click="toggleAllTypeFilters" v-model="isAllTypesChecked" /> Toggle All Types
      </h3>
      <h2 class="text-lg mb-2 bg-slate-200 px-2 py-2">Element Types</h2>
      <ol class="m-3 grid grid-cols-6 gap-2">
        <li v-for="(type, index) in typeList" :key="`type-${index}`">
          <label :class="`type-filter-pill rounded-full py-1 px-2 ${bgColorMap[type]} ${textColorMap[type]}`">
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
    <div class="my-4 border-2 border-slate-300">
      <h2 class="text-lg mb-2 bg-slate-200 px-2 py-2">Native Regions</h2>
      <ol class="m-3 grid grid-cols-6 gap-2">
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
  .type-filter-pill input {
    margin-right: 5px;
  }
  .type-filter-pill:hover {
    cursor: pointer;
  }
</style>
