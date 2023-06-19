import { createSlice } from "@reduxjs/toolkit";

//parte de user del store(redux)
const initialState = { items: [], total: 0 };

export const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const foundItem = state.items.find((item) => item.id === payload.item.id)

      if (foundItem) {
        foundItem.quantity += 1
      } else {
        payload.item.quantity = 1
        state.items.push(payload.item);
      }
      state.total += payload.item.price
      // state.total = state.total + payload.item.price //
    },
    removeItem: (state, { payload }) => {
      const foundItem = state.items.find((item) => item.id === payload.item.id)
      if (foundItem.quantity > 1) {
        foundItem.quantity -= 1
      } else {
        state.items = state.items.filter((item) => item.id !== payload.item.id)

      }
      state.total -= payload.item.price

    },
    // id del producto a cambiar, la nueva cantidad {id, newQuantity}
    changeQuantity: (state, { payload }) => {

      const foundItem = state.items.find((item) => item.id === payload.id)
      // eliminar del carrito
      if (payload.newQuantity === 0) {

        // resto al total el precio del producto * la cantidad que hubiera
        state.total = state.total - (foundItem.quantity * foundItem.price)

        // elimino el producto del array
        state.items = state.items.filter((item) => item.id !== payload.id)
      } else { // cambiar la cantidad ya sea a mas o menos quantity

        // resto al total el precio del producto * la cantidad que hubiera
        state.total = state.total - (foundItem.quantity * foundItem.price)
        // sumo al total el precio del producto * la nueva cantidad
        state.total = state.total + (payload.newQuantity * foundItem.price)
        foundItem.quantity = payload.newQuantity

      }

    },
    cleanCart: (state) => {
      state.items = [];
      state.total = 0;
    }

  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, changeQuantity, cleanCart } = cartSlices.actions;

export default cartSlices.reducer;
