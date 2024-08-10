import { instance } from "@/razorpay/instance";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";

export async function GET(req: NextRequest) {
  console.log("req", req);
  return NextResponse.json(
    {
      data: "test",
    },
    {
      status: HttpStatusCode.Ok,
    }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const amount = body;
  const recAmount = amount;
  console.log("recAmount", recAmount);

  try {
    const payment_capture = 1;
    const amount = recAmount * 100;
    const currency = "INR";

    const options = {
      amount: amount.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    const order = await instance.orders.create(options);
    console.log("order created server!!", order);
    return NextResponse.json(order.id, {
      status: HttpStatusCode.Ok,
    });
  } catch (err) {
    console.log("error creating order...", err);
    return NextResponse.json(
      {
        data: "something wrong....",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
