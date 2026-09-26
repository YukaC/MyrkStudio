import { WHITELIST_STEPS } from "../content";

export function HowItWorks() {
  return (
    <ol className="space-y-3 font-term text-xs tracking-wide text-muted sm:text-[0.8rem]">
      {WHITELIST_STEPS.map((step) => (
        <li key={step.id} className="flex gap-3">
          <span className="text-accent">{step.id}</span>
          <span>
            {step.text}
            {step.channel ? <span className="text-white"> {step.channel}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
