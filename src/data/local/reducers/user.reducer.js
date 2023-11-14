import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { APIService } from '../../remote/services/api.services'
import { retrieveFromLocalStorage } from '../../../utils/constant'
import { showErrorToast } from '../../../utils/api-utils'

const initialState = {
  users: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  ...retrieveFromLocalStorage(['addFilesProfile']),
}

const saveToLocalStorage = (key, data) => {
  sessionStorage.setItem(key, data)
  // data;
}

export const addFiles = createAsyncThunk(
  'user/addFiles',
  async (userCredentials) => {
    const profile = await APIService.addFiles(userCredentials)
    const response = await profile.data
    const token = await profile.data.token
    saveToLocalStorage('addFilesProfile', JSON.stringify(response))
    saveToLocalStorage('token', JSON.stringify(token)) // Save the session in local storage
    return response
  }
)

export const sendFiles = createAsyncThunk(
  'user/sendFiles',
  async (userCredentials) => {
    const profile = await APIService.sendFiles(userCredentials)
    const response = await profile.data
    return response
  }
)

export const uploadedFiles = createAsyncThunk(
  'user/uploadedFiles',
  async (userCredentials) => {
    const profile = await APIService.uploadedFiles(userCredentials)
    const response = await profile.data
    return response
  }
)

export const fileUpload = createAsyncThunk(
  'user/fileUpload',
  async (userCredentials) => {
    const profile = await APIService.fileUpload(userCredentials)
    const response = await profile.data
    return response
  }
)

export const getUpload = createAsyncThunk('user/getUpload', async () => {
  const profile = await APIService.getUpload()
  const response = await profile.data
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFiles.pending, (state) => {
        state.loading = true
        state.users = null
        state.error = null
      })
      .addCase(addFiles.fulfilled, (state, action) => {
        console.log(action.payload.status_code)
        console.log(action.payload)
        if (action.payload.status_code === '0') {
          state.isAuthenticated = true
          state.users = action.payload
          state.token = action.payload.token
          state.addFilesProfile = action.payload
        } else if (action.payload.status_code === '1') {
          state.error = action.payload.message
          showErrorToast(action.payload.message)
        } else {
          state.error = action.payload.message
          showErrorToast(action.payload.message)
        }
        state.loading = false
      })
      .addCase(addFiles.rejected, (state, action) => {
        state.loading = false
        state.users = null
        state.error = showErrorToast(action.error.message)
      })
      .addCase(sendFiles.pending, (state) => {
        state.loading = true
        state.users = null
        state.error = null
      })
      .addCase(sendFiles.fulfilled, (state, action) => {
        console.log(action.payload.status_code)
        if (action.payload.status_code === '0') {
          state.users = action.payload
        } else if (action.payload.status_code === '1') {
          state.error = action.payload.message
          showErrorToast(action.payload.message)
        } else {
          state.error = action.payload.message
          showErrorToast(action.payload.message)
        }
        state.loading = false
      })
      .addCase(sendFiles.rejected, (state, action) => {
        state.loading = false
        state.users = null
        state.error = showErrorToast(action.error.message)
      })
      .addCase(uploadedFiles.pending, (state) => {
        state.loading = true
        state.users = null
        state.error = null
      })
      .addCase(uploadedFiles.fulfilled, (state, action) => {
        console.log(action.payload.status_code)
        if (action.payload.status_code === '0') {
          state.users = action.payload
        } else if (action.payload.status_code === '1') {
          state.error = action.payload.message
          // showErrorToast(action.payload.message);
        } else {
          state.error = action.payload.message
          //showErrorToast(action.payload.message);
        }
        state.loading = false
      })
      .addCase(uploadedFiles.rejected, (state, action) => {
        state.loading = false
        state.users = null
        state.error = showErrorToast(action.error.message)
      })
      .addCase(fileUpload.pending, (state) => {
        state.loading = true
        state.users = null
        state.error = null
      })
      .addCase(fileUpload.fulfilled, (state, action) => {
        console.log(action.payload.status_code)
        if (action.payload.status_code === '0') {
          state.users = action.payload
        } else if (action.payload.status_code === '1') {
          state.error = action.payload.message
          // showErrorToast(action.payload.message);
        } else {
          state.error = action.payload.message
          //showErrorToast(action.payload.message);
        }
        state.loading = false
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.loading = false
        state.users = null
        state.error = showErrorToast(action.error.message)
      })

      .addCase(getUpload.pending, (state) => {
        state.loading = true
        state.users = null
        state.error = null
      })
      .addCase(getUpload.fulfilled, (state, action) => {
        console.log(action.payload.status_code)
        if (action.payload.status_code === '0') {
          state.users = action.payload
        } else if (action.payload.status_code === '1') {
          state.error = action.payload.message
          // showErrorToast(action.payload.message);
        } else {
          state.error = action.payload.message
          //showErrorToast(action.payload.message);
        }
        state.loading = false
      })
      .addCase(getUpload.rejected, (state, action) => {
        state.loading = false
        state.users = null
        state.error = showErrorToast(action.error.message)
      })
  },
})

//export const { setCurrentPost } = userSlice.actions;
export const userReducer = userSlice.reducer
