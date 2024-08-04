import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "@/prisma";
import { HttpStatusCode } from "axios";

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY || "",
//   key_secret: process.env.RAZORPAY_APT_SECRET,
// });

export async function POST(req: any, res: any) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    email,
    name,
    district_city,
    flat_door_building,
    pan_num,
    phone,
    pincode,
    road_street_sector,
    state_ut,
    uidai,
    village_area_locality,
    voter_id_passport,
    orderId,
  } = await req.json();
  console.log("razorpay_order_id", razorpay_order_id);
  console.log("razorpay_payment_id", razorpay_payment_id);
  console.log("razorpay_signature", razorpay_signature);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "DTPDl0NF93rrENshbPXkySgI")
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  console.log("isAuthentic", isAuthentic);
  if (isAuthentic) {
    const createdRes = await prisma.donation.create({
      data: {
        amount,
        district_city,
        email,
        flat_door_building,
        name,
        pan_num,
        phone,
        pincode,
        road_street_sector,
        state_ut,
        uidai,
        village_area_locality,
        voter_id_passport,
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });
    return NextResponse.json(createdRes, {
      status: HttpStatusCode.Ok,
    });
  } else {
    return NextResponse.json(
      {
        message: "payment verification fail",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
