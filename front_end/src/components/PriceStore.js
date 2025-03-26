import { create } from "zustand";
import axios from "axios";

const BasePrice = 6.67;

export const usePriceStore = create((set) => ({
  price: 6.47,
  updatePrice: async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/trade/trades");
      let TotalSupply = 0;
      let TotalDemand = 0;

      response.data.forEach((data) => {
        if (data.tradeType === "sell") {
          TotalSupply += data.energy;
        } else {
          TotalDemand += data.energy;
        }
      });

      const updatedPrice = BasePrice + (1.1 * (TotalDemand - TotalSupply)) / TotalDemand;
      set({ price: updatedPrice < BasePrice ? BasePrice : updatedPrice });
    } catch (error) {
      console.error("Error fetching trade data:", error);
    }
  },
}));
