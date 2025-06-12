import { create } from "zustand";
import axios from "axios";

const BasePrice = 6.67;

export const usePriceStore = create((set) => ({
  price: BasePrice,
  updatePrice: async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/trade/list");

      let TotalSupply = 0;
      let TotalDemand = 0;

      response.data.forEach((data) => {
        if (data.tradeType === "sell") {
          TotalSupply += data.energy;
        } else if (data.tradeType === "buy") {
          TotalDemand += data.energy;
        }
      });

      let updatedPrice = BasePrice;

      // Avoid division by zero or NaN
      if (TotalDemand > 0) {
        const delta = (1.1 * (TotalDemand - TotalSupply)) / TotalDemand;
        updatedPrice = BasePrice + delta;
        if (updatedPrice < BasePrice) updatedPrice = BasePrice;
      }

      set({ price: updatedPrice });
    } catch (error) {
      console.error("Error fetching trade data:", error);
      set({ price: BasePrice }); // fallback to base price on error
    }
  },
}));
