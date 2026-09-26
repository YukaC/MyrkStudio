import { Panel } from "./Panel";
import { SectionHeader } from "./SectionHeader";

export function LoreTerminal() {
  return (
    <section
      className="section-block bg-[color-mix(in_srgb,var(--color-background-elevated)_70%,transparent)]"
      aria-labelledby="lore-title"
    >
      <div className="page-shell">
        <SectionHeader
          titleId="lore-title"
          title="Lore clasificado"
          isTitleHidden
          log={{ main: "Base de datos", tail: "acceso restringido" }}
        />

        <Panel title="terminal · netfo-archive" badge="DENEGADO">
          <div className="space-y-3 p-4 font-term text-sm sm:p-5 sm:text-[0.95rem]">
            <p className="cursor-blink text-success">&gt; INICIANDO PROTOCOLO_</p>
            <p className="text-faint">&gt; ACCESO DENEGADO. LORE CLASIFICADO.</p>
            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
              <label htmlFor="lore-code" className="text-success">
                &gt; INGRESE CÓDIGO IN-GAME:
              </label>
              <input
                id="lore-code"
                type="text"
                maxLength={8}
                spellCheck={false}
                className="w-full border-b border-line-strong bg-transparent py-1 text-accent uppercase outline-none transition-[border-color] duration-150 focus:border-accent sm:w-28"
                placeholder="XXXX"
                autoComplete="off"
              />
            </div>
            <p className="pt-2 text-xs leading-relaxed text-faint sm:text-[0.8rem]">
              La verdad está en el servidor. Encontrá cintas y documentos en la zona de exclusión.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
