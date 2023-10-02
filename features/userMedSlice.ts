import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  medicineDetails: object
}

const initialState: CounterState = {
  medicineDetails: {
    medName: '',
    medType: '',
    person: '',
    image: '',
    upload: false,
    fromDate: '',
    toDate: '',
    time: '',
    dose: '',
    numberOfPills: '',
    beforeFood: false,
    notify: true
  },
}

export const userMedSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setMedicineDetails: (state, action) =>{
      state.medicineDetails = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMedicineDetails } = userMedSlice.actions

export default userMedSlice.reducer