<template>
  <div>
    <div class="flex flex-wrap items-center justify-between mb-2">
      <div v-if="searchPlaceholder" class="flex-1">
        <input v-model="localSearch" :placeholder="searchPlaceholder" class="rounded px-3 py-2 w-full max-w-xs text-black bg-gray-200 border border-gray-300" />
      </div>
      <slot name="filters"></slot>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-600">
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th v-for="col in columns" :key="col.key" @click="col.sortable !== false && sortBy(col.key)" :class="['px-6 py-3 text-left cursor-pointer select-none', sortKey === col.key ? 'bg-yellow-700 text-white' : 'text-gray-200']">
              {{ col.label }}
              <span v-if="sortKey === col.key">
                <svg v-if="sortOrder === 'asc'" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
                <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item[idKey]" class="border-t">
            <td v-for="col in columns" :key="col.key" class="px-4 py-2 border-b border-gray-700">
              <slot :name="`cell-${col.key}`" :item="item">
                {{ formatCell(item, col) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div v-if="totalPages > 1" class="mt-4 flex justify-between items-center">
      <div class="text-gray-200">
        Página {{ currentPage }} de {{ totalPages }}
      </div>
      <div>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="bg-gray-700 text-white rounded px-4 py-2 mr-2">Anterior</button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="bg-gray-700 text-white rounded px-4 py-2">Próxima</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
const props = defineProps({
  items: { type: Array, required: true },
  columns: { type: Array, required: true },
  idKey: { type: String, default: 'id' },
  searchPlaceholder: { type: String, default: '' },
  searchKeys: { type: Array, default: () => [] },
  itemsPerPage: { type: Number, default: 50 },
  customSort: { type: Function },
  customFilter: { type: Function },
});
const emit = defineEmits(['update:search']);
const localSearch = ref('');
const sortKey = ref(props.columns[0]?.key || '');
const sortOrder = ref('asc');
const currentPage = ref(1);

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const filteredItems = computed(() => {
  let arr = props.items;
  if (props.customFilter) {
    arr = props.customFilter(arr, localSearch.value);
  } else if (localSearch.value && props.searchKeys.length) {
    const t = localSearch.value.toLowerCase();
    arr = arr.filter(item => props.searchKeys.some(k => (item[k] || '').toString().toLowerCase().includes(t)));
  }
  return arr;
});

const sortedItems = computed(() => {
  let arr = filteredItems.value.slice();
  if (props.customSort) {
    arr = props.customSort(arr, sortKey.value, sortOrder.value);
  } else if (sortKey.value) {
    arr.sort((a, b) => {
      let aVal, bVal;
      if (sortKey.value === 'categoria') {
        aVal = a.categoria_maquina?.nome_categoria || '';
        bVal = b.categoria_maquina?.nome_categoria || '';
      } else {
        aVal = a[sortKey.value] ?? '';
        bVal = b[sortKey.value] ?? '';
      }
      if (aVal === bVal) return 0;
      if (sortOrder.value === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }
  return arr;
});

const totalPages = computed(() => Math.ceil(sortedItems.value.length / props.itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return sortedItems.value.slice(start, start + props.itemsPerPage);
});

function goToPage(p) {
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p;
  }
}

watch([filteredItems], () => {
  if (currentPage.value > totalPages.value) currentPage.value = 1;
});

function formatCell(item, col) {
  if (col.format) return col.format(item[col.key], item);
  return item[col.key] ?? '-';
}
</script>
