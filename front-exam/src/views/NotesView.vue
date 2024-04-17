<script setup>
import { useNotesStore } from '@/stores/notes'
import NoteForm from '@/components/NoteForm.vue';
import { storeToRefs } from 'pinia';

const notesStore = useNotesStore()

const { notes } = storeToRefs(notesStore)

const deleteNote = (note) => {
  notesStore.deleteNote(note)
}


const toggleEditMode = (note) => {
  note.editMode = !note.editMode
  note.updatedTitle = note.title
  note.updatedContent = note.content
}

const updateNote = (note) => {
  console.log(note)
  const updatedNote = {
    id: note.id,
    title: note.updatedTitle,
    content: note.updatedContent
  }
  notesStore.updateNote(updatedNote)
  note.editMode = false
}

toggleEditMode(notes)
</script>

<template>
  <NoteForm />

  <div class="container mx-auto mt-8">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contenu
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="note in notes" :key="note.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="!note.editMode" class="text-sm text-gray-900">{{ note.title }}</div>
                    <input v-else v-model="note.updatedTitle" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="!note.editMode" class="text-sm text-gray-900">{{ note.content }}</div>
                    <textarea v-else v-model="note.updatedContent" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="toggleEditMode(note)" v-if="!note.editMode" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button @click="updateNote(note)" v-else class="text-green-600 hover:text-green-900">Submit</button>
                    <button @click="() => deleteNote(note)" class="text-red-600 hover:text-red-900 ml-4">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>