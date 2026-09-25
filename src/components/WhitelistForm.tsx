import { FormEvent, useMemo, useState } from "react";
import { DISCORD_URL, isValidDemoInvite, PLAZAS } from "../content";

type Platform = "Java" | "Bedrock";

type FormStatus = {
  kind: "idle" | "error" | "success" | "warn";
  message: string;
};

const INITIAL_STATUS: FormStatus = { kind: "idle", message: "" };

export function WhitelistForm() {
  const [discord, setDiscord] = useState("");
  const [minecraft, setMinecraft] = useState("");
  const [age, setAge] = useState("");
  const [platform, setPlatform] = useState<Platform>("Java");
  const [experience, setExperience] = useState("");
  const [motive, setMotive] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<FormStatus>(INITIAL_STATUS);

  const invitePriority = useMemo(() => {
    if (!inviteCode.trim()) return null;
    return isValidDemoInvite(inviteCode);
  }, [inviteCode]);

  async function handleCopy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!discord.trim() || !minecraft.trim() || !age.trim() || !motive.trim() || !acceptedRules) {
      setStatus({
        kind: "error",
        message: "Completá los campos obligatorios (*) y aceptá las normas.",
      });
      return;
    }

    const hasPriority = isValidDemoInvite(inviteCode);
    const priorityLine = inviteCode.trim()
      ? hasPriority
        ? `Invitación: ${inviteCode.trim().toUpperCase()} (PRIORIDAD / PLAZA RESERVADA)`
        : `Invitación: ${inviteCode.trim().toUpperCase()} (código no válido en demo)`
      : "Invitación: - (cola pública)";

    const text = [
      "=== POSTULACIÓN WASTELAND ===",
      `Discord: ${discord.trim()}`,
      `Minecraft: ${minecraft.trim()} (${platform})`,
      `Edad: ${age.trim()}`,
      `Experiencia previa: ${experience.trim() || "-"}`,
      `Motivo: ${motive.trim()}`,
      priorityLine,
      "Normas aceptadas: Sí",
    ].join("\n");

    setOutput(text);

    try {
      await navigator.clipboard.writeText(text);
      setStatus({
        kind: "success",
        message: hasPriority
          ? "Copiado con PRIORIDAD. Pegalo en #whitelist."
          : "Copiado. Pegalo en #whitelist en Discord.",
      });
    } catch {
      setStatus({
        kind: "warn",
        message: "No se pudo copiar: seleccioná el texto de abajo.",
      });
    }
  }

  const statusClass =
    status.kind === "error"
      ? "text-accent"
      : status.kind === "success"
        ? "text-success"
        : status.kind === "warn"
          ? "text-warning"
          : "text-faint";

  return (
    <form className="space-y-5" onSubmit={handleCopy} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="wl-discord" className="field-label">
            Usuario de Discord *
          </label>
          <input
            required
            id="wl-discord"
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

        <div>
          <label htmlFor="wl-plataforma" className="field-label">
            Plataforma
          </label>
          <select
            id="wl-plataforma"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="field-control"
          >
            <option value="Java">Java</option>
            <option value="Bedrock">Bedrock</option>
          </select>
        </div>

        <div>
          <label htmlFor="wl-invite" className="field-label">
            Código de invitación
          </label>
          <input
            id="wl-invite"
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="WL-XXXX (opcional)"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="field-control uppercase"
            aria-describedby="wl-invite-hint"
          />
          <p id="wl-invite-hint" className="mt-1.5 font-term text-[0.7rem] leading-snug">
            {invitePriority === true && (
              <span className="text-success">Código válido - prioridad / plaza reservada</span>
            )}
            {invitePriority === false && (
              <span className="text-warning">
                Código no reconocido. Podés postular igual (cola pública).
              </span>
            )}
            {invitePriority === null && <span className="text-faint">Sin código = cola pública</span>}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="wl-exp" className="field-label">
          Experiencia en roleplay / SMP narrativos
        </label>
        <textarea
          id="wl-exp"
          rows={2}
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
          rows={4}
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
          type="checkbox"
          checked={acceptedRules}
          onChange={(e) => setAcceptedRules(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
        />
        <span>Leí y acepto las normas del servidor.</span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <button type="submit" className="btn btn-primary flex-1 sm:flex-[2]">
          Copiar postulación
        </button>
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-discord flex-1">
          Abrir Discord
        </a>
      </div>

      <p className={`min-h-[1.25rem] text-center font-term text-xs ${statusClass}`} aria-live="polite">
        {status.message}
      </p>

      {output ? (
        <textarea
          readOnly
          rows={8}
          value={output}
          className="field-control font-term text-xs text-success"
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          aria-label="Texto de postulación copiable"
        />
      ) : null}

      <p className="text-center font-term text-[0.7rem] text-faint">
        Plazas {PLAZAS.occupied}/{PLAZAS.total} · invite válido = prioridad · pegá en #whitelist
      </p>
    </form>
  );
}
