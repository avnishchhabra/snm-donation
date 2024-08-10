import dynamic from "next/dynamic";
const DonationForm = dynamic(() => import("@/components/DonationForm"), {
  ssr: false,
});

export default function Home() {
  return <DonationForm />;
}
