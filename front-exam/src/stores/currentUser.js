import { defineStore } from 'pinia'
import router from '@/router'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: {},
    token: null
  }),

  getters: {},

  actions: {
    async inscription(username, email, password) {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        })

        if (!response.ok) {
          throw new Error('Failed to create user')
        }

        const data = await response.json()

        router.push('/login')
      } catch (error) {
        console.error('Error creating user:', error)
        // Optionally, you can show an error message to the user
      }
    },
    login(email, password) {
      // ici on fait une requête POST pour se connecter
    },
    setCurrentUser(data) {
      this.user = data.user
      this.token = data.token
    },
    updateInfo(data) {
      // exemple de requete avec le token
      fetch('http://localhost:3000/users/' + this.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        },
        body: JSON.stringify({
          // ici on envoie les données à mettre à jour
        })
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      this.user = {}
      this.token = null
    }
  },

  persist: true
})
