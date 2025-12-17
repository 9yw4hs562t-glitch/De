const express = require("express");
const app = express();

app.use(express.json());

let orders = [];
let livreurs = [
  { id: "l1", name: "Livreur 1", available: true },
  { id: "l2", name: "Livreur 2", available: true }
];

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.post("/order", (req, res) => {
  const order = {
    id: orders.length + 1,
    clientId: req.body.clientId,
    restaurantId: req.body.restaurantId,
    status: "en_attente_livreur"
  };
  orders.push(order);
  res.json(order);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/order/:id/accept", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).send("Commande introuvable");
  order.status = "en_livraison";
  order.livreurId = req.body.livreurId;
  res.json(order);
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});