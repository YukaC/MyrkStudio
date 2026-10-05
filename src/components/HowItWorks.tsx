import { WHITELIST_STEPS } from "../content";

export function HowItWorks() {
  return (
    <ol className="editorial-process-list">
      {WHITELIST_STEPS.map((step) => (
        <li key={step.id} className="editorial-process-step">
          <span className="editorial-process-step-id">{step.id}</span>
          <span>{step.text}</span>
        </li>
      ))}
    </ol>
  );
}
