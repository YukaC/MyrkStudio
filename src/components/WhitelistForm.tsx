import { FormEvent, RefObject, useRef, useState } from "react";
import { PLAZAS } from "../content";
import { gsap } from "../lib/gsap";

type FormStatus = {
  kind: "idle" | "error" | "success" | "pending";
  message: string;
};

/** Required fields in visual order; the first failure is also the focus target */
type FieldKey = "discord" | "minecraft" | "age" | "motive" | "rules";

type ControlRef = RefObject<HTMLElement | null>;

const INITIAL_STATUS: FormStatus = { kind: "idle", message: "" };

const STATUS_CLASS: Record<FormStatus["kind"], string> = {
  idle: "text-faint",
  error: "text-accent",
  success: "text-success",
  pending: "text-cream/80",
};

/** The one status line; invalid controls point at it with aria-describedby */
const STATUS_ID = "wl-form-status";

export function WhitelistForm({ compact = false }: { compact?: boolean }) {
  const [discord, setDiscord] = useState("");
  const [minecraft, setMinecraft] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [motive, setMotive] = useState("");
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);
  const [invalidFields, setInvalidFields] = useState<FieldKey[]>([]);

  const discordRef = useRef<HTMLInputElement>(null);
  const minecraftRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const motiveRef = useRef<HTMLTextAreaElement>(null);
  const rulesRef = useRef<HTMLInputElement>(null);

  const controlRefByField: Record<FieldKey, ControlRef> = {
    discord: discordRef,
    minecraft: minecraftRef,
    age: ageRef,
    motive: motiveRef,
    rules: rulesRef,
  };

  /** Same five conditions and same order as the original single check */
  function getInvalidFields(): FieldKey[] {
    const fields: FieldKey[] = [];
    if (!discord.trim()) fields.push("discord");
    if (!minecraft.trim()) fields.push("minecraft");
    if (!age.trim()) fields.push("age");
    if (!motive.trim()) fields.push("motive");
    if (!acceptedRules) fields.push("rules");
    return fields;
  }

  /** undefined rather than false, so a passing field carries no aria-invalid */
  function getAriaInvalid(field: FieldKey): true | undefined {
    return invalidFields.includes(field) ? true : undefined;
  }

  function getAriaDescribedBy(field: FieldKey): string | undefined {
    return invalidFields.includes(field) ? STATUS_ID : undefined;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const failedFields = getInvalidFields();
    setInvalidFields(failedFields);

    if (failedFields.length > 0) {
      setStatus({
        kind: "error",
        message: "Completá los campos obligatorios (*) y aceptá las normas.",
      });
      controlRefByField[failedFields[0]].current?.focus();
      return;
    }

    // Demo sin backend: el envío se simula a propósito para que el form se lea
    // como un envío por web real. La postulación no sale del navegador (SPEC B15).
    setStatus({ kind: "pending", message: "Enviando…" });
    gsap.delayedCall(0.55, () => {
      setStatus({ kind: "success", message: "Enviado." });
    });
  }

  return (
    <form className={compact ? "space-y-3" : "space-y-5"} onSubmit={handleSubmit} noValidate>
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
        <div className="sm:col-span-2">
          <label htmlFor="wl-discord" className="field-label">
            Usuario de Discord *
          </label>
          <input
            required
            id="wl-discord"
            ref={discordRef}
            aria-invalid={getAriaInvalid("discord")}
            aria-describedby={getAriaDescribedBy("discord")}
            type="text"
            autoComplete="username"
            placeholder="tuusuario"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            className="field-control"
          />
        </div>

        <div>
          <label htmlFor="wl-mc" className="field-label">
            Usuario de Minecraft *
          </label>
          <input
            required
            id="wl-mc"
            ref={minecraftRef}
            aria-invalid={getAriaInvalid("minecraft")}
            aria-describedby={getAriaDescribedBy("minecraft")}
            type="text"
            autoComplete="off"
            placeholder="Steve123"
            value={minecraft}
            onChange={(e) => setMinecraft(e.target.value)}
            className="field-control"
          />
        </div>

        <div>
          <label htmlFor="wl-edad" className="field-label">
            Edad *
          </label>
          <input
            required
            id="wl-edad"
            ref={ageRef}
            aria-invalid={getAriaInvalid("age")}
            aria-describedby={getAriaDescribedBy("age")}
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            placeholder="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="field-control"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wl-exp" className="field-label">
          Experiencia en roleplay / SMP narrativos
        </label>
        <textarea
          id="wl-exp"
          rows={compact ? 1 : 2}
          placeholder="Contanos brevemente…"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="field-control"
        />
      </div>

      <div>
        <label htmlFor="wl-motivo" className="field-label">
          ¿Por qué querés unirte a Wasteland? *
        </label>
        <textarea
          required
          id="wl-motivo"
          ref={motiveRef}
          aria-invalid={getAriaInvalid("motive")}
          aria-describedby={getAriaDescribedBy("motive")}
          rows={compact ? 2 : 4}
          placeholder="Motivación…"
          value={motive}
          onChange={(e) => setMotive(e.target.value)}
          className="field-control"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input
          required
          id="wl-normas"
          ref={rulesRef}
          aria-invalid={getAriaInvalid("rules")}
          aria-describedby={getAriaDescribedBy("rules")}
          type="checkbox"
          checked={acceptedRules}
          onChange={(e) => setAcceptedRules(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
        />
        <span>Leí y acepto las normas del servidor.</span>
      </label>

      {/* w-full, not a wrapper: `.btn` is inline-flex, so as a direct child of the
          form it would shrink to fit its label and sit flush left. */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        data-magnetic=""
        disabled={status.kind === "pending" || status.kind === "success"}
      >
        {status.kind === "pending"
          ? "Enviando…"
          : status.kind === "success"
            ? "Postulación enviada ✓"
            : "Enviar postulación"}
      </button>

      <p
        key={status.message || "idle"}
        id={STATUS_ID}
        className={`form-status min-h-[1.25rem] text-center font-term text-xs ${STATUS_CLASS[status.kind]}${status.message ? " form-status--alive" : ""}`}
        aria-live="polite"
      >
        {status.message}
      </p>

      <p className="text-center font-term text-[0.7rem] text-faint">
        Plazas {PLAZAS.occupied}/{PLAZAS.total}
      </p>
    </form>
  );
}
