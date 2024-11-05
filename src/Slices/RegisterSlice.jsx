import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase.config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async ({ email, password }, thunkAPI) => {
    const auth = getAuth();
    try {
      // Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered with UID:", user.uid);

      // Add user data to Firestore (excluding password)
      await setDoc(doc(db, 'users', user.uid), { email, uid: user.uid });
      console.log("User data successfully added to Firestore.");

      return { id: user.uid, email };
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
