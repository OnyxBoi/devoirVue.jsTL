<script setup>
import { useNotesStore } from '@/stores/notes'
  import { ref } from 'vue'

  // Retrieve the notes store
  const notesStore = useNotesStore()

  // Declare variables for title and content
  const title = ref('')
  const content = ref('')

  // Function to add a note
  const addNote = () => {
    try {
      title.value = document.getElementById("title").value
      content.value = document.getElementById("content").value
      notesStore.createNote({
        title: title.value,
        content: content.value
      })
      // Clear the input fields after adding the note
      title.value = ''
      content.value = ''
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

</script>

<template>
  <div class="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="addNote" id="addNoteForm" class="space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">Ajouter une nouvelle note</h2>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
        <input
          v-model="title"
          type="text"
          id="title"
          name="title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Contenu</label>
        <textarea
          v-model="content"
          id="content"
          name="content"
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ajouter
        </button>
      </div>
    </form>
  </div>
</template>
