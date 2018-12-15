export const LOAD_DATA = 'LOAD_DATA';

export default function loadData(user) {
  return { type: LOAD_DATA, payload: user };
}
