import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
    accessToken: "",
});

const app = express();
const port = 3008;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("soy el server");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            item: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "COP"
                },
            ],
            back_urls: {
                ssuccesss: "https://wwww.youtube.com/@onthecode",
                failure: "https://wwww.youtube.com/@onthecode",
                pending: "https://wwww.youtube.com/@onthecode",
            },
            auto_returns: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.id,
        })
    } catch (error) {
        console.log(error);
        res.log(`El servidor esta corriendo en el puerto ${port}`);
    }
});

