import { defineStore } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  getters: {},

  actions: {
    getAllNotes() {
      const { token, user } = storeToRefs(useCurrentUserStore())

      return fetch(`http://localhost:3000/users/${user.value.id}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch notes')
          }
          return response.json()
        })
        .then(notes => {
          this.notes = notes
        })
        .catch(error => {
          console.error('Error fetching notes:', error)
        })
    },
    createNote(note) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      // Make sure user and token are available
      if (!user.value.id || !token.value) {
        throw new Error('User ID or token is missing')
      }

      fetch(`http://localhost:3000/users/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.value
        },
        body: JSON.stringify({
          userId: user.value.id,
          title: note.title,
          content: note.content
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to create note')
          }
          return response.json()
        })
        .then(data => {
          console.log('Note created successfully:', data)
          // Optionally, update local state with the newly created note
          this.notes.push(data)
        })
        .catch(error => {
          console.error('Error creating note:', error)
        })
    },
    updateNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête PATCH pour mettre à jour une note
    },
    deleteNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête DELETE pour supprimer une note
    }
  },

  persist: true
})
