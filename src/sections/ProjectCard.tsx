import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { Globe, ChevronDown, ChevronUp, Maximize2, X } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const getProjectGradient = (index: number) => {
  return "from-[var(--chip)] via-[var(--card)] to-[var(--bg)]/40";
};

function ScreenshotViewer({
  title,
  images,
  mobile,
  onClose,
}: {
  title: string;
  images: string[];
  mobile: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-auto bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
      >
        <X className="size-4" />
      </button>
      <motion.div
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className={`m-auto flex gap-4 sm:gap-6 ${mobile ? "flex-row items-start justify-center" : "flex-col items-center"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            className={`rounded-xl border border-white/10 shadow-2xl ${
              mobile
                ? "max-h-[85vh] w-auto max-w-[44vw] sm:max-w-[300px]"
                : "max-h-[85vh] w-auto max-w-[92vw] object-contain"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const closeViewer = useCallback(() => setViewerOpen(false), []);

  const gallery = p.screenshots ?? p.mobileImages ?? (p.image ? [p.image] : []);
  const canEnlarge = gallery.length > 0 && !imgError;

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md h-full">
      <div>
        {/* Angled Screenshot Preview Canvas Box */}
        <div
          className={`relative mb-4 h-48 w-full overflow-hidden rounded-lg border border-[var(--line)] bg-gradient-to-br ${getProjectGradient(index)} p-3 flex flex-col justify-between ${
            canEnlarge ? "cursor-zoom-in" : ""
          }`}
          {...(canEnlarge && {
            role: "button",
            tabIndex: 0,
            "aria-label": `View ${p.title} screenshots`,
            onClick: () => setViewerOpen(true),
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setViewerOpen(true);
              }
            },
          })}
        >
          <div className="bg-stripes absolute inset-0 opacity-20 pointer-events-none" />

          {/* Viewfinder Reticles (Camera REC / ISO) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 font-mono text-[9px] text-white">
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/70" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/70" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-white/70" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-white/70" />
            <div className="absolute top-2.5 left-7 flex items-center gap-1 text-[8px] font-semibold text-white/80">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" /> REC
            </div>
            <div className="absolute top-2.5 right-7 text-[8px] text-white/80 font-semibold">
              ISO 400
            </div>
            {canEnlarge && (
              <div className="absolute bottom-2.5 left-2.5 z-30 flex items-center gap-1 rounded bg-black/70 px-1.5 py-1 text-[9px] font-semibold text-white">
                <Maximize2 className="size-2.5" /> Click to enlarge
              </div>
            )}
          </div>

          {/* Top Badges Row */}
          <div className="relative z-20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {p.status ? (
                <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300 backdrop-blur-md">
                  • {p.status}
                </span>
              ) : p.links.live && (
                <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 backdrop-blur-md flex items-center gap-1">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              )}
            </div>

            {p.featured && (
              <span className="rounded bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-500 border border-amber-500/30">
                Featured
              </span>
            )}
          </div>

          {/* Angled Screenshot Image */}
          {p.mobileImages?.length && !imgError ? (
            <div className="pointer-events-none">
              {p.mobileImages.slice(0, 2).map((src, i) => (
                <div
                  key={src}
                  className={`absolute w-[100px] h-[210px] sm:w-[110px] sm:h-[231px] rounded-[16px] border-4 border-[var(--bg)]/40 shadow-xl overflow-hidden transition-all duration-300 ${
                    i === 0
                      ? "right-[116px] -bottom-[58px] -rotate-6 group-hover:-bottom-[46px] sm:right-[132px] sm:-bottom-[72px] sm:group-hover:-bottom-[60px]"
                      : "right-3 -bottom-[74px] rotate-6 group-hover:-bottom-[62px] sm:right-5 sm:-bottom-[88px] sm:group-hover:-bottom-[76px]"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${p.title} screen ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                </div>
              ))}
            </div>
          ) : p.image && !imgError ? (
            <div className="absolute -right-6 -bottom-3 w-56 h-32 sm:-right-12 sm:-bottom-5 sm:w-72 sm:h-40 rounded-lg border-4 border-[var(--bg)]/40 shadow-xl overflow-hidden group-hover:-right-4 group-hover:-bottom-1 sm:group-hover:-right-9 sm:group-hover:-bottom-2 transition-all duration-300 pointer-events-none">
              <img
                src={p.image}
                alt={`${p.title} preview`}
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="font-serif text-2xl text-[var(--fg)] self-end opacity-90">{p.title}</div>
          )}
        </div>

        {/* Project Header Info */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)] group-hover:text-[var(--fg)]">
            {p.title}
          </h3>
          <span className="font-mono text-xs text-[var(--soft)]">{p.year}</span>
        </div>

        <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)] line-clamp-4">
          {p.blurb}
        </p>

        {/* Collapsible Details Drawer */}
        {p.story && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 font-mono text-[10px] text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer outline-none"
            >
              {showDetails ? "Hide engineering details" : "Show engineering details"}
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 rounded-lg border border-[var(--line)]/50 bg-[var(--chip)]/60 p-3 font-sans text-[12px] leading-relaxed text-[var(--muted)] border-l-2 border-l-[var(--soft)] space-y-1.5">
                    {p.story.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tech Pills & Direct Links */}
      <div
        className={`mt-4 flex justify-between gap-3 pt-3 border-t border-[var(--line)]/50 ${
          p.links.live ? "flex-col" : "items-center"
        }`}
      >
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2.5 text-[var(--soft)]">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} live site`}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-1 font-mono text-[10.5px] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              <Globe className="size-3.5" />
              Live Demo
            </a>
          )}
          {p.links.source && (
            <a
              href={p.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} repository`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
        </div>
      </div>

      <AnimatePresence>
        {viewerOpen && (
          <ScreenshotViewer
            title={p.title}
            images={gallery}
            mobile={!p.screenshots && !!p.mobileImages?.length}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
