import api from "../../api/axios";

export const fetchPizzas = async () => {
  const res = await api.get("/pizzas");
  return res.data.data;
};

export const fetchPizzaById = async (id) => {
  const res = await api.get(`/pizzas/${id}`);
  return res.data.data;
};