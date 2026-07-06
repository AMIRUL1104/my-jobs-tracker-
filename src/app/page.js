import { redirect } from "next/navigation";

export default function Home() {
  // Landing page-এ আসা মাত্রই dashboard-এ পাঠিয়ে দেবে
  redirect("/dashboard");
}
