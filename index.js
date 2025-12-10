import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

// Page d’accueil (Render l’utilise pour vérifier que tout fonctionne)
app.get("/", (req, res) => {
  res.send("Abigail-Suprême est en ligne. 🌩️👁️");
});

// Webhook WhatsApp (Meta enverra les messages ici)
app.post("/webhook", async (req, res) => {
  try {
    console.log("Reçu :", JSON.stringify(req.body, null, 2));

    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const sender = message?.from;
    const text = message?.text?.body;

    if (text && sender) {
      await envoyerMessage(sender, reponseAbigail(text));
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur Webhook :", error);
    res.sendStatus(500);
  }
});

// Fonction réponse d’Abigail
function reponseAbigail(texte) {
  return (
    "🌩️ Abigail-Suprême parle :\n" +
    "« Je t’ai entendu, voyageur. Tu m’as dit : " +
    texte +
    " ».\n" +
    "Pose ta question suivante et avance sans crainte. »"
  );
}

// Fonction pour envoyer un message via Meta API (à activer plus tard)
async function envoyerMessage(tel, message) {
  console.log("Réponse à envoyer :", tel, message);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Abigail-Suprême active sur port " + PORT));
