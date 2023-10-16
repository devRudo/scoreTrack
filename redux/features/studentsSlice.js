import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

//State slice
export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      // console.log(action.payload);
      const students = [...action.payload.data];
      const sortedStudents =
        students?.sort((a, b) => {
          let valueA;
          let valueB;
          if (action.payload.sortBy === "name") {
            valueA = a.firstName.toUpperCase();
            valueB = b.firstName.toUpperCase();
          } else {
            valueA = a.scoreInPercentage;
            valueB = b.scoreInPercentage;
          }
          if (
            action.payload.sortBy === "name" ||
            action.payload.sortBy === "ascPercentage"
          ) {
            if (valueA < valueB) {
              return -1;
            }
            if (valueA > valueB) {
              return 1;
            }
          } else {
            if (valueA > valueB) {
              return -1;
            }
            if (valueA < valueB) {
              return 1;
            }
          }
          return 0;
        }) || [];
      state.students = sortedStudents;
    },
    updateStudents: (state, action) => {
      const updatedStudents = state.students.map((std) => {
        if (std.id === action.payload.studentId) {
          return {
            ...std,
            [action.payload.key]: action.payload.value,
          };
        } else return std;
      });
      state.students = updatedStudents;
    },
  },
});

export const { setStudents, updateStudents } = studentsSlice.actions;

export default studentsSlice.reducer;
