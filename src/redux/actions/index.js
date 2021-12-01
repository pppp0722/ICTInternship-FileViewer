export const SET_MENU = "SET_MENU";
export const SET_DIR = "SET_DIR";


export function setMenu(menu) {
  return {
    type: SET_MENU,
    payload: menu,
  };
}

export function setDir(dir) {
    return {
      type: SET_DIR,
      payload: dir,
    };
  }