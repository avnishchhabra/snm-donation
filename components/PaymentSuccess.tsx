"use client";

import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const amount = params.get("amount");
  console.log("params", orderId, amount);
  return (
    <Result
      status="success"
      title="Contribution Successfull!"
      subTitle={`Thank you for your contribution of Rs. ${amount} . Your order id is ${orderId}`}
      extra={[
        <Button type="primary" key="console" onClick={goHome}>
          Go Home
        </Button>,
        <Button key="buy">Donate more</Button>,
      ]}
    />
  );
};

export default PaymentSuccess;
