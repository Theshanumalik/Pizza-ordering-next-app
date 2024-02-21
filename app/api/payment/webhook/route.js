import Order from "@/model/Order";
import Offer from "@/model/Offer";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;
  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("stripe error");
    console.log(e);
    return Response.json(e, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const offerId = event?.data?.object?.metadata?.offerId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paymentStatus: "paid" });
      if (offerId) {
        await Offer.updateOne({ _id: offerId }, { $inc: { useCount: 1 } });
      }
    }
  }

  return Response.json("ok", { status: 200 });
}
