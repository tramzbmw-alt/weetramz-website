import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your RDU Airport Shuttle | WeeTramz",
  description: "Book your private van to or from RDU airport. Fares start at $65 with instant fare calculator, up to 14 passengers, all luggage included. Serving Raleigh, Durham, Cary and the Research Triangle.",
};

export default function ShuttleBookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
