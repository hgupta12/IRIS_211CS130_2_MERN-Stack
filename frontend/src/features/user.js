import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    id:"",
    name:"",
    roll:"",
    role:"",
    email:"",
    yearOfPassing:"",
    branch:"",
    status:""
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email, token ,roll,role,status,branch,yearOfPassing} = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.roll = roll;
      state.role = role;
      state.status = status;
      state.branch = branch;
      state.yearOfPassing = yearOfPassing;
      state.token = token;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, name, email, token,roll,role,branch,yearOfPassing,status })
      );
    },
    reset(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          id,
          name,
          email,
          token,
          roll,
          role,
          status,
          branch,
          yearOfPassing,
        } = action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.roll = roll;
        state.role = role;
        state.status = status;
        state.branch = branch;
        state.yearOfPassing = yearOfPassing;
        state.token = token;
        localStorage.setItem(
          "user",
          JSON.stringify({
            id,
            name,
            email,
            token,
            roll,
            role,
            branch,
            yearOfPassing,
            status,
          })
        );
      })
      .addCase(loginUser.rejected, (_, action) => {
        alert(action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const {
          id,
          name,
          email,
          token,
          roll,
          role,
          status,
          branch,
          yearOfPassing,
        } = action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.roll = roll;
        state.role = role;
        state.status = status;
        state.branch = branch;
        state.yearOfPassing = yearOfPassing;
        state.token = token;
        localStorage.setItem(
          "user",
          JSON.stringify({
            id,
            name,
            email,
            token,
            roll,
            role,
            branch,
            yearOfPassing,
            status,
          })
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        alert(action.payload);
      });
  },
});

export const selectUser = (state) => state.user;

export const { setUser, reset } = userSlice.actions;

export default userSlice.reducer;

