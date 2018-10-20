import { goto } from '../../__sapper__/client'
import { Store } from 'svelte/store'

class ClientStore extends Store {
  logout() {
    fetch('logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      this.set({ user: null });
      goto('/')
    })
  }
}

export default new ClientStore()
