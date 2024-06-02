// src/createUsers.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import bcrypt from 'bcryptjs';

export const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await addDoc(collection(db, 'users'), {
        username: username,
        password: hashedPassword
    });
};

// Ejemplo de creación de usuarios
 // createUser('marcel', 'MarcelG4349');
    // createUser('claudia', 'Onita12307');