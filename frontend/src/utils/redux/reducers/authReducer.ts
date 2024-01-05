import { UserDetails } from '@/@types/Auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: UserDetails | undefined
}

const initialState: AuthState = {
    user: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDetails | undefined>) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;