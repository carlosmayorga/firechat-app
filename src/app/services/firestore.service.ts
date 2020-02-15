import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { ChatMessage } from '../interfaces/chat-message.intf';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private chatsCollection: AngularFirestoreCollection<ChatMessage>;


  constructor(private firestore: AngularFirestore,
              public angularFireAuth: AngularFireAuth) {
              }


  login(socialLogin) {
    console.log(`Login with ${socialLogin}`);
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  getMessages() {
    this.chatsCollection = this.firestore.collection<ChatMessage>('chats'
    , ref => ref.orderBy('date', 'desc').limit(5));

    return this.chatsCollection.valueChanges();
  }

  sendMessage(message: ChatMessage) {
    return this.chatsCollection.add(message);
  }
}
