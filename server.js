const express = require("express");
const app = express();


const stripe = require("stripe")("sk_test_51JZmYCFTKFTNoa67EWCWz2X5GY5M29u5GWyZPtpdxoQup9QotxFaytuMEZDopargmSCkmfqjrftdUruHJYq3siI300uZQXUiJ0");

app.use(express.static("public"));
app.use(express.json());

// place holder calculator
const calculateOrderAmount = items => {
    return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
    const {items} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd"
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.listen(4242, () => console.log("listening on 4242"));