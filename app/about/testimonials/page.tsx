import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "Read what WeeTramz families are saying about our child transportation services.",
};

const testimonials = [
  {
    name: "Kindergarten Parent, Apex Elementary",
    quote: "This is my first time using a transportation service. My son just started Kindergarten and I was very wary about using a transportation service. However, after meeting Mr. Travis and Ms. Teresa, I felt confident that I was doing the right thing. My son and I both felt very comfortable and have been delighted with the quality of service received so far.",
  },
  {
    name: "Parent at Hill Learning Center",
    quote: "WeeTramz was recommended to me by Hill Learning Center. I am so glad I made that call. WeeTramz has been exceptional in helping me with transportation for my daughter. My initial contact with the company was easy and quick. I love the initial meet and greet so my child knows the driver before the services even begin. That was awesome and something no other transportation service was offering. This added a big bonus point for me that Mr. Travis showed genuine care about making my child feel comfortable and safe.",
  },
  {
    name: "Lacy Elementary School Parent",
    quote: "My son was not very happy about riding with a transportation service but after meeting Mr. Travis and some of his staff, my son is now at ease and enjoys his daily ride. WeeTramz has made my life so much easier. I love the promptness, courtesy, and quality of service WeeTramz provides for my family.",
  },
  {
    name: "9th Grade, Apex Friendship High School",
    quote: "I am a very happy customer of WeeTramz. They have provided great customer service and have been able to accommodate my ever-changing schedule with such ease. I highly recommend their services for any busy parent.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero title="Client Testimonials" subtitle="Hear from the families in the WeeTramz family." />
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <p className="text-gray-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 font-semibold text-gray-900">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
