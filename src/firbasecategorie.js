import firebase from './firebase';

const db = firebase.ref('/categorie');
let categories = [];



class firbasecategorie {
  
    addCategory = (categorie) => {
    db.push(categorie);
  };
 
  getAll() {
    return db;
  }

  get(key) {
    return db.child(key);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }
 
}

export default new firbasecategorie();