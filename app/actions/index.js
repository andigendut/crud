export const ADD_SISWA = 'ADD_SISWA'
export const FETCH_SINGLE = 'FETCH_SINGLE'
export const UPDATE_SISWA = 'UPDATE_SISWA'
export const LOAD_STORED = 'LOAD_STORED'
export const DELETE_SISWA = 'DELETE_SISWA'

export function addSiswa(newSiswa) {
  return {
    type: ADD_SISWA,
    payload: newSiswa
  }
}

export function updateSiswa(updatedSiswa) {
  return {
    type: UPDATE_SISWA,
    payload: updatedSiswa
  }
}

export function deleteSiswa(siswaId) {
  return {
    type: DELETE_SISWA,
    payload: siswaId
  }
}
