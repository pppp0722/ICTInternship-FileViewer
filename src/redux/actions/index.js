export const SET_DIR = "SET_DIR";

export function setDir(dir) {
  return {
    type: SET_DIR,
    payload: dir,
  };
}