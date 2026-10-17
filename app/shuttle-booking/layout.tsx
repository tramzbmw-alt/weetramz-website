import type { Metadata } from "next";
import { SHOW_RDU_SHUTTLE } from "@/lib/constants";

export const metadata: Metadata = SHOW_RDU_SHUTTLE
  ? {
      title: "Book Your RDU Airport Shuttle | WeeTramz",
      description: "Book your private van to or from RDU airport. Fares start at $65 with instant fare calculator, up to 14 passengers, all luggage included. Serving Raleigh, Durham, Cary and the Research Triangle.",
    }
  : {
      title: "WeeTramz — Children's & Group Transportation",
      description: "Safe, reliable door-to-door transportation for kids serving the Research Triangle and surrounding areas.",
      robots: { index: false, follow: false },
    };

export default function ShuttleBookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
