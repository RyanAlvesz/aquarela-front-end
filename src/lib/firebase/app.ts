import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage, StorageReference } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA9J6I39jSK3mineUok6Vn7-2tnCp1xMpc",
    authDomain: "tcc-aquarela.firebaseapp.com",
    projectId: "tcc-aquarela",
    storageBucket: "tcc-aquarela.appspot.com",
    messagingSenderId: "343096271931",
    appId: "1:343096271931:web:5336ae530e8ef4e386281e"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export const uploadImage = async (file: File, storagePath: string): Promise<string | undefined> => {
  let url: string | undefined;
  const storageRef: StorageReference = ref(storage, `${storagePath}/${file.name}`);
  
  await uploadBytes(storageRef, file)
    .then(async (snapshot) => {
      url = await getDownloadURL(snapshot.ref);
    });

  return url;
};