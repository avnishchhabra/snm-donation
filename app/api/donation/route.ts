import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
  key_id: "rzp_test_dYuz7VqNuZhuCz",
  key_secret: "DTPDl0NF93rrENshbPXkySgI",
});

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
  console.log("body", body);
  const { amount: recAmount } = body;

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
    console.log("order!!", order);
    return NextResponse.json(order, {
      status: HttpStatusCode.Ok,
    });
  } catch (err) {
    console.log("error", err);
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
