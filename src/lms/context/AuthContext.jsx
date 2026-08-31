import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userObj) {
    if (!userObj || !userObj.uid) return null;
    try {
      const docRef = doc(db, "profiles", userObj.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setProfile(data);
        return data;
      } else {
        // Auto-repair missing profile
        const newProfile = {
          id: userObj.uid,
          email: userObj.email || "",
          name: userObj.displayName || "User",
          role: "intern",
          created_at: new Date().toISOString()
        };
        await setDoc(docRef, newProfile);
        setProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
    return null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signUp({ email, password, name }) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    
    // Create profile document
    const profileData = {
      id: newUser.uid,
      email: email,
      name: name,
      role: "intern",
      created_at: new Date().toISOString()
    };
    
    await setDoc(doc(db, "profiles", newUser.uid), profileData);
    setProfile(profileData);
    
    return newUser;
  }

  async function signIn({ email, password }) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setProfile(null);
  }

  async function updateProfile(updates) {
    if (!user) return;
    const docRef = doc(db, "profiles", user.uid);
    await updateDoc(docRef, updates);
    setProfile((prev) => ({ ...prev, ...updates }));
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
