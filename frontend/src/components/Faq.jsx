import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "../lib/data";

const Faq = () => (
  <section id="faq" className="py-20 sm:py-28 border-t border-gold/10">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold mb-4">
        Briefing · Questions
      </p>
      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-cream mb-10 sm:mb-14">
        Need to <em className="italic text-gold">know.</em>
      </h2>

      <Accordion type="single" collapsible data-testid="faq-accordion">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-gold/15">
            <AccordionTrigger
              data-testid={`faq-trigger-${i + 1}`}
              className="font-display text-lg sm:text-xl text-cream hover:text-gold hover:no-underline"
            >
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-ash leading-relaxed text-sm sm:text-base">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;
