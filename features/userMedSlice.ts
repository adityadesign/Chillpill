import { createSlice } from '@reduxjs/toolkit'

export interface details {
  medName: string,
  medType: string,
  person: string,
  image: string,
  upload: boolean,
  fromDate: string,
  toDate: string,
  time: string,
  dose: string,
  numberOfPills: string,
  beforeFood: boolean,
  notify: boolean
}

export interface CounterState {
  medicineDetails: details
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
    setMedicineDetails: (state, action) => {
      state.medicineDetails = { ...state.medicineDetails, ...action.payload }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMedicineDetails } = userMedSlice.actions

export default userMedSlice.reducer