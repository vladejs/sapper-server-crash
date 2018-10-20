import * as sapper from '../__sapper__/client.js';
import store from './client/store';

sapper.start({
	target: document.querySelector('#sapper'),
	store: data => {
		store.set(data)
		window.store = store._state
		return store;
	}
});
