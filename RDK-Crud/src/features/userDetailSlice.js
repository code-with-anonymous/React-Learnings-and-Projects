import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://67a30e39409de5ed52573610.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const user = await response.json();
      console.log("user created", user);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (_, { rejectWithValue }) => {
    console.log("fetchingUsers");
    const response = await fetch(
      "https://67a30e39409de5ed52573610.mockapi.io/crud",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const users = await response.json();
      console.log("users fetched", users);
      return users;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://67a30e39409de5ed52573610.mockapi.io/crud/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const user = await response.json();
      console.log("User updated", user);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://67a30e39409de5ed52573610.mockapi.io/crud/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const user = await response.json();
      console.log("user deleted", user);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An unknown error occurred";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Export the reducer correctly
export default userDetailSlice.reducer;
