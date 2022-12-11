import { Component } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, user } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {


  title = 'angular-firebase';
  public data: any = []
  constructor(public firestore: Firestore) {
    this.getData()
  }


  addData(value: any) {
    const dbInstance = collection(this.firestore, 'users');
    // utile pour l'enregistrement et pour l'état de l'authentification
    const auth=getAuth()

    let newUser: any = {
      uid: "",
      email: "user.email!",
      // emailVerified: user.emailVerified,
      createdAt: new Date(),
      favorites : []
    };



    onAuthStateChanged(auth, (user) => {
      if (user) {

        newUser= {
          uid: user.uid,
          email: user.email!,
          // emailVerified: user.emailVerified,
          createdAt: new Date(),
          favorites : []
        };

      } else {
      }
    });

    createUserWithEmailAndPassword(auth, value.email, value.password).then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // pour que l'utilisateur créé dans firebase auth génère un utilisateur dans firestore avec un uid qui reprenne celui de firebase auth :
        newUser= {
          uid: user.uid,
          name:value.name,
          email: user.email!,
          // emailVerified: user.emailVerified,
          createdAt: new Date(),
          favorites : []
        };

        addDoc(dbInstance, newUser)

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

    addDoc(dbInstance, newUser)
      .then(() => {
        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }

  // updateData(id: string) {
  //   const dataToUpdate = doc(this.firestore, 'users', id);
  //   updateDoc(dataToUpdate, {
  //     name: 'Jeannet',
  //     email: 'jeannet.julie@gmail.com'
  //   })
  //     .then(() => {
  //       alert('Data updated');
  //       this.getData()
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }
}

