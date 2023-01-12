import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userServices'

const initialState = {
    users: [],
    userIsError: false,
    userIsSuccess: false,
    userIsLoading: false,
    userMessage: '',
}

// Create new goal
// export const createGoal = createAsyncThunk(
//   'goals/create',
//   async (goalData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await goalService.createGoal(goalData, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// Get user
export const getUser = createAsyncThunk(
  'user/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      return await userService.getUserData(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
// export const deleteGoal = createAsyncThunk(
//   'goals/delete',
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await goalService.deleteGoal(id, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(createGoal.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(createGoal.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals.push(action.payload)
    //   })
    //   .addCase(createGoal.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
      .addCase(getUser.pending, (state) => {
        state.userIsLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userIsLoading = false
        state.userIsSuccess = true
        state.users = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userIsLoading = false
        state.userIsError = true
        state.userMessage = action.payload
      })
    //   .addCase(deleteGoal.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(deleteGoal.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals = state.goals.filter(
    //       (goal) => goal._id !== action.payload.id
    //     )
    //   })
    //   .addCase(deleteGoal.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
  },
})

export const { userReset } = userSlice.actions
export default userSlice.reducer