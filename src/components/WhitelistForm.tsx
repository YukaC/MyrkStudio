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
        message: "⚠ Completa los campos obligatorios (*) y acepta las normas.",
      });
      return;
    }

    const hasPriority = isValidDemoInvite(inviteCode);
    const priorityLine = inviteCode.trim()
      ? hasPriority
        ? `Invitación: ${inviteCode.trim().toUpperCase()} (PRIORIDAD / PLAZA RESERVADA)`
        : `Invitación: ${inviteCode.trim().toUpperCase()} (código no válido en demo)`
      : "Invitación: — (cola pública)";

    const text = [
      "=== POSTULACIÓN WASTELAND ===",
      `Discord: ${discord.trim()}`,
      `Minecraft: ${minecraft.trim()} (${platform})`,
      `Edad: ${age.trim()}`,
      `Experiencia previa: ${experience.trim() || "—"}`,
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
          ? "✓ Copiado con PRIORIDAD. Pegalo en #whitelist."
          : "✓ Copiado. Pegalo en #whitelist en Discord.",
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
      ? "text-red-500"
      : status.kind === "success"
        ? "text-green-500"
        : status.kind === "warn"
          ? "text-yellow-500"
          : "text-zinc-500";

  return (
    <form id="wl-form" className="space-y-4" onSubmit={handleCopy}>
      <div>
        <label htmlFor="wl-discord" className="mb-1 block text-xs font-term text-zinc-400">
          Usuario de Discord *
        </label>
        <input
          required
          id="wl-discord"
          type="text"
          placeholder="tuusuario"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
          className="w-full border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="wl-mc" className="mb-1 block text-xs font-term text-zinc-400">
            Usuario de Minecraft *
          </label>
          <input
            required
            id="wl-mc"
            type="text"
            placeholder="Steve123"
            value={minecraft}
            onChange={(e) => setMinecraft(e.target.value)}
            className="w-full border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
          />
        </div>
        <div>
          <label htmlFor="wl-edad" className="mb-1 block text-xs font-term text-zinc-400">
            Edad *
          </label>
          <input
            required
            id="wl-edad"
            type="number"
            min={1}
            max={120}
            placeholder="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wl-plataforma" className="mb-1 block text-xs font-term text-zinc-400">
          Plataforma
        </label>
        <select
          id="wl-plataforma"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
          className="w-full border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
        >
          <option value="Java">Java</option>
          <option value="Bedrock">Bedrock</option>
        </select>
      </div>

      <div>
        <label htmlFor="wl-invite" className="mb-1 block text-xs font-term text-zinc-400">
          Código de invitación (opcional)
        </label>
        <input
          id="wl-invite"
          type="text"
          placeholder="WL-XXXX"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="w-full border border-zinc-800 bg-zinc-900 p-3 text-sm uppercase text-white transition focus:border-red-600"
        />
        {invitePriority === true && (
          <p className="mt-1 text-xs font-term text-green-500">
            ✓ Código válido — prioridad / plaza reservada ({PLAZAS.total} cupos)
          </p>
        )}
        {invitePriority === false && (
          <p className="mt-1 text-xs font-term text-yellow-500">
            Código no reconocido en demo. Podés postular igual (cola pública).
          </p>
        )}
      </div>

      <div>
        <label htmlFor="wl-exp" className="mb-1 block text-xs font-term text-zinc-400">
          ¿Experiencia previa en roleplay/SMP narrativos?
        </label>
        <textarea
          id="wl-exp"
          rows={2}
          placeholder="Cuéntanos brevemente..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full resize-none border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
        />
      </div>

      <div>
        <label htmlFor="wl-motivo" className="mb-1 block text-xs font-term text-zinc-400">
          ¿Por qué quieres unirte a Wasteland? *
        </label>
        <textarea
          required
          id="wl-motivo"
          rows={3}
          placeholder="Escribe tu motivación..."
          value={motive}
          onChange={(e) => setMotive(e.target.value)}
          className="w-full resize-none border border-zinc-800 bg-zinc-900 p-3 text-sm text-white transition focus:border-red-600"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-zinc-400">
        <input
          required
          id="wl-normas"
          type="checkbox"
          checked={acceptedRules}
          onChange={(e) => setAcceptedRules(e.target.checked)}
          className="mt-0.5 accent-red-600"
        />
        He leído y acepto las normas del servidor.
      </label>

      <button
        type="submit"
        className="scan-btn w-full bg-white px-6 py-3 text-sm font-bold tracking-wide text-black uppercase transition hover:bg-zinc-200"
      >
        Copiar postulación
      </button>
      <p className={`h-4 text-center text-xs font-term ${statusClass}`} aria-live="polite">
        {status.message}
      </p>

      {output ? (
        <textarea
          readOnly
          rows={8}
          value={output}
          className="w-full resize-none border border-zinc-800 bg-black p-3 font-term text-xs text-green-500"
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      ) : null}

      <p className="text-center text-[11px] font-term text-zinc-600">
        Plazas: {PLAZAS.occupied}/{PLAZAS.total} · Sin invite = cola pública · Con invite válido =
        prioridad
      </p>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        className="block text-center text-xs font-term text-indigo-400 hover:text-indigo-300"
      >
        Abrir Discord → pegar en #whitelist
      </a>
    </form>
  );
}
