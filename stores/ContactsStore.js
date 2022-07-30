import {decorate, observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ContactsStore {

    numbers = [];

    addNumber(number) {
        let newContact = {phone: number.phone}
        this.numbers.push(newContact);
    };

    deleteNumber(number) {
        const index = this.numbers.findIndex(item => item.phone === number.phone);
		this.numbers.splice(index, 1);
    };      
}

decorate(ContactsStore, {
    numbers: [observable, persist('list')],

    addNumber: action,
    deleteNumber: action
});
  
const hydrate = create({storage: AsyncStorage});
const contactsStore = new ContactsStore();
export default contactsStore;
hydrate('contactsStore', contactsStore);