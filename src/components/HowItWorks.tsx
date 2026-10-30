import { WHITELIST_STEPS } from "../content";
import { EditorialScrollItem, EditorialScrollStagger } from "./editorial/EditorialScrollStagger";

export function HowItWorks() {
  return (
    <EditorialScrollStagger as="ol" className="editorial-process-list" stagger={0.07}>
      {WHITELIST_STEPS.map((step) => (
        <EditorialScrollItem key={step.id} as="li" className="editorial-process-step">
          <span className="editorial-process-step-id">{step.id}</span>
          <span>{step.text}</span>
        </EditorialScrollItem>
      ))}
    </EditorialScrollStagger>
  );
}
