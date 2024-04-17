<script setup>
import { useCurrentUserStore } from '@/stores/currentUser'

// Retrieve the user store
const currentUserStore = useCurrentUserStore()

// Access the current user's information
const currentUser = currentUserStore.user

// Function to update user information
const updateUserInformation = async () => {
  try {
    let newUsername = document.getElementById('username').value
    let newEmail = document.getElementById('email').value
    let newBio = document.getElementById('bio').value
    await currentUserStore.updateInfo({
      username: newUsername,
      email: newEmail,
      bio: newBio
    })
  } catch (error) {
    console.error('Error updating user information:', error)
  }
}
</script>


<template>
  <div class="min-h-screen bg-base-200">
    <div class="flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Profile</h1>

        <div class="flex flex-col w-full lg:flex-row">
          <div class="grid flex-grow h-32 card rounded-box place-items-center">
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body" >
                <h2 class="card-title">Informations</h2>
                <form>
                  <label class="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4 opacity-70"
                    >
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                      />
                    </svg>
                    <input id="username" type="text" class="grow" placeholder="Username" v-model="currentUser.username"/>
                  </label>
                  <label class="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4 opacity-70"
                    >
                      <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                      />
                      <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                      />
                    </svg>
                    <input id="email"type="text" class="grow" placeholder="email" v-model="currentUser.email" />
                  </label>
                  <textarea id="bio" class="textarea textarea-bordered" placeholder="Bio" v-model="currentUser.bio"></textarea>

                  <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="updateUserInformation">Modifier</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
