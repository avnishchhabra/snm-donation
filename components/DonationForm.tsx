"use client";

import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const createOrderId = async (amount: any) => {
  const data = await axios.post(`/api/order`, amount);
  return data.data;
};

export default function DonationForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const { amount, email, phone } = values;
    const orderId = await createOrderId(amount);
    console.log("orderId!!", orderId);

    const key = process.env.RAZORPAY_KEY_ID;
    const options = {
      key: key,
      currency: "INR",
      amount: amount,
      order_id: orderId,
      description: "Understanding RazorPay Integration",
      modal: {
        ondismiss: function () {
          console.log("dismissed");
          setLoading(false);
          // setIsLoading(false);
        },
      },
      handler: async function (response: any) {
        console.log("handler!!!", response);

        const data = await axios.post(`/api/paymentverify`, {
          // ...values,
          orderId: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });

        setLoading(false);

        if (data.data?.isOk) {
          router.push(`payment-success?orderId=${orderId}&amount=${amount}`);
        }
        // const res = await data.json();
        console.log("verify data!!", data);
      },
      prefill: {
        email,
        contact: phone,
      },
    };
    const myWindow: any = window;
    const paymentObject = new myWindow.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      console.log("payment.failed", response);
      return;
      // router.push(`payment-fail`);
    });
    paymentObject.open();
    // const orderres = await instance.payments.fetch("pay_OiMxcOffNkpmTC");
    // console.log("orderres", orderres);
  };
  const initialValues = {
    // amount: 100,
    // phone: 9306467463,
    // email: "avnish@gmail.com",
    // name: "avnish",
    // pan_num: "bmzpc9208l",
    // flat_door_building: "sample falt",
    // road_street_sector: "test road",
    // village_area_locality: "test village",
    // district_city: "test city",
    // state_ut: "test state",
    // pincode: "136135",
    // uidai: "test uidai",
    // voter_id_passport: "test id",
    // remarks: "test remarks",
  };

  const handleDonate = () => {
    console.log("handleDonate");
    form.submit();
  };
  return (
    <div style={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
      <Form
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{
          borderRadius: "6px",
          backgroundColor: "white",
          padding: "12px",
        }}
      >
        <Form.Item
          name="amount"
          label="Enter amount to pay"
          rules={[
            {
              required: true,
              message: "Amount is required!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Customer Phone"
          rules={[
            {
              required: true,
              message: "Mobile Number is required!",
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Customer Email"
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pan_num"
          label="PAN No."
          rules={[
            {
              required: true,
              message: "PAN number is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="flat_door_building"
          label="Flat/ Door/ Building"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="road_street_sector"
          label="Road / Street / Block / Sector"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="village_area_locality"
          label="Village / Area / Locality"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="district_city"
          label="District / City"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state_ut"
          label="State /UT"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pin Code"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="uidai"
          label="Unique Identification Number issued by UIDAI"
          rules={[
            {
              required: true,
              message: "This is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="voter_id_passport"
          label="Voter ID No. / Passport No. (optional)"
        >
          <Input />
        </Form.Item>
        <Form.Item name="remarks" label="Remarks (optional)">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            onClick={handleDonate}
            style={{ width: "100%" }}
          >
            Donate now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
