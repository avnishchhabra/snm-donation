import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const { razorpay_payment_id, razorpay_signature, orderId } = await req.json();
  const signature = generatedSignature(orderId, razorpay_payment_id);
  if (signature !== razorpay_signature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret: any = process.env.RAZORPAY_KEY_SECRET;
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};
