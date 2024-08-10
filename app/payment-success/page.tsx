import dynamic from "next/dynamic";
const PaymentSuccess = dynamic(() => import("@/components/PaymentSuccess"), {
  ssr: false,
});

export default function page() {
  return <PaymentSuccess />;
}
