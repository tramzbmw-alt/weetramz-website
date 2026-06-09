import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Policy",
  description: "WeeTramz pickup, cancellation, inclement weather, and payment policies.",
};

export default function PolicyPage() {
  return (
    <>
      <PageHero title="Policy" />
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-gray max-w-none">

          <h2 className="text-xl font-black text-gray-900 mt-0">Pick-Ups</h2>
          <p className="text-gray-600 leading-relaxed">It is important that your child is ready at the scheduled pick-up time and location. This will help to ensure that your child(ren) will be transported to their destination in a timely manner. The driver will not leave the pickup location until your child has been accounted for. However, if a WeeTramz vehicle has not arrived within 10 minutes of the scheduled pick-up time, please call (866) 933-5938 to speak with a WeeTramz representative and you will be advised of the status of your pickup. If your child calls you, please call us before you run out to get them — we are most likely already in route. If your child has a mobile device, please save our number in your child's phone, as well as your own, to ensure the driver can be directly contacted in case of a change or an emergency. Please note that any same-day requests for pick-up, if accepted, may result in a higher rate.</p>

          <h2 className="text-xl font-black text-gray-900 mt-10">Inclement Weather Plan and Procedures</h2>
          <p className="text-gray-600 leading-relaxed">While we hope for very few interruptions to our transportation schedules, it does pay off for everyone to think ahead and be prepared in the event of inclement weather or an emergency situation. The safety of our riders and drivers will always be the top priority of WeeTramz.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Inclement Weather Policy.</strong> During inclement weather, WeeTramz will proceed with extreme caution. If it occurs after your child arrives at their scheduled pick-up location, we'll attempt to pick up your child and take them to the prearranged destination. If conditions worsen, the scheduled time may need to be changed for earlier pick up or the pickup may be canceled to ensure the safety of our riders and drivers. Parents must contact us, school, and prearrange destination to coordinate earlier pick-up times.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Prior Day Cancellation.</strong> If WeeTramz is notified at least 24 hours in advance of any school cancellation, WeeTramz will issue a 50% ride credit which will ensure that your child will maintain their designated spot.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Same Day Cancellation.</strong> If WeeTramz is notified on the same day that a school is closed due to inclement weather conditions, no refunds will be issued.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Notifications.</strong> Parents should notify WeeTramz of any potential closings and delays as soon as practically possible. If schools remain open and WeeTramz suspends services due to inclement weather conditions, a WeeTramz staff member will notify the parent as soon as practically possible and will issue a 50% ride credit.</p>
          <p className="text-gray-600 text-sm">All credits will be applied to the next monthly bill.</p>

          <h2 className="text-xl font-black text-gray-900 mt-10">No Shows / Cancellations and Sick Policy</h2>
          <p className="text-gray-600 leading-relaxed"><strong>No Shows/Cancellations.</strong> For the safety of your child, courtesy of the driver, and promptness of our schedules, it is extremely important that you advise us if your child will not be riding with us on any given day. Please provide advance notice of no less than 24 hours prior to any cancellation or schedule change. If cancellation notices are provided to WeeTramz within 24 hours prior to the change, WeeTramz will issue a 50% ride credit which will ensure your child will maintain their designated spot.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Emergencies.</strong> If there is an emergency, please notify WeeTramz no less than 2 hours in advance of the required change. Once reservations are made, routes are adjusted and drivers must be paid. No credits or rollovers will be allowed for emergency/same-day changes.</p>
          <p className="text-gray-600 leading-relaxed"><strong>Sick Days.</strong> If your child is sick and will not require transportation, an advance notice of at least 24 hours must be provided to WeeTramz in order to receive a 50% ride credit. No credits for same-day notifications.</p>
          <p className="text-gray-600 text-sm">All credits will be applied to the next monthly bill. All cancellations and schedule changes must be made by phone.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-gray-900">⚠️ PLEASE DO NOT EMAIL ANY CHANGES.</p>
            <p className="text-sm text-gray-700 mt-1">Failure to notify WeeTramz of a schedule change or a cancellation may result in a violation fee: 1st violation $25.00 · 2nd violation $30.00 · 3rd violation at the discretion of WeeTramz and could result in termination of services.</p>
          </div>

          <h2 className="text-xl font-black text-gray-900 mt-10">Payment Policy</h2>
          <p className="text-gray-600 leading-relaxed">WeeTramz is a prepaid service and all payments are due in advance for each rider. All services are billed monthly and payments will be due no later than the 25th day of each month. If services are not paid by the last day of the month a late charge of $25.00 will be applied. The payment schedule will be discussed at the initial consultation. Payments must be received before transportation services are rendered.</p>

        </div>
      </section>
      <CtaStrip />
    </>
  );
}
