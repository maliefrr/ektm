import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import mahasiswaService from './mahasiswaServices'

const initialState = {
    mahasiswa: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
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

// Get user goals
export const getMahasiswa = createAsyncThunk(
  'mahasiswa/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      return await mahasiswaService.getMahasiswaData(token)
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

export const mahasiswaSlice = createSlice({
  name: 'mahasiswa',
  initialState,
  reducers: {
    reset: (state) => initialState,
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
      .addCase(getMahasiswa.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMahasiswa.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.mahasiswa = action.payload
      })
      .addCase(getMahasiswa.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
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

export const { reset } = mahasiswaSlice.actions
export default mahasiswaSlice.reducer