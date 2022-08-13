/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

var config = {
  apiKey: "AIzaSyDCZiVgjs0keFspzEsO3cWHlF-0qrFd9SA",
    authDomain: "watersaviors-e5efa.firebaseapp.com",
    databaseURL: "https://watersaviors-e5efa-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "watersaviors-e5efa",
    storageBucket: "watersaviors-e5efa.appspot.com",
    messagingSenderId: "454377391909",
    appId: "1:454377391909:web:1565199148e0afc6ed7ccc",
    measurementId: "G-6WSKVLW4HN"
};
firebase.initializeApp(config);


// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID =
    '454377391909-v81i98dfkae18ltq7h7eussvcmi98su0.apps.googleusercontent.com';
    
const db = firebase.firestore();

const WaterCalculation = {
  Kitchen: 60,
  Bathroom: 20
} //Litre per day
