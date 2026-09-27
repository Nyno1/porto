"use client";

import { useState, useRef, useEffect } from "react";

const slideData = [
  { title: "Aplikasi Pemesan Hotel", src: "/serti3.jpg", detailSrc: "/serti2detail.jpg" },
  { title: "Website Restaurant", src: "/serti2.jpg", detailSrc: "/serti1detail.jpg" },
  { title: "Website Perpustakaan", src: "/serti1.jpg", detailSrc: "/serti3detail.jpg" },
  { title: "Sertifikat BNSP Junior Website", src: "/serti4.jpg", detailSrc: "/serti4detail.jpg" },
];

const DURATION = 220;

export default function Sertfication() {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<{ index: number; dir: "left" | "right" } | null>(null);
  const lockRef = useRef(false);
  const total = slideData.length;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const go = (direction: "left" | "right", overrideIndex?: number) => {
    if (lockRef.current) return;
    lockRef.current = true;

    const nextIndex =
      overrideIndex !== undefined
        ? overrideIndex
        : direction === "right"
        ? (current + 1) % total
        : (current - 1 + total) % total;

    setIncoming({ index: nextIndex, dir: direction });

    setTimeout(() => {
      setCurrent(nextIndex);
      setIncoming(null);
      lockRef.current = false;
    }, DURATION);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    go(index > current ? "right" : "left", index);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setShowDetail(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalIndex(null);
    setShowDetail(false);
  };

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const activeSlide = modalIndex !== null ? slideData[modalIndex] : null;

  return (
    <section className="bg-[#0A0A0A] relative w-full py-20">
      <style>{`
        .cs-track {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          height: 260px;
          background: #111111;
          border: 1px solid #2A2A2A;
        }
        .cs-slide {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
        .cs-slide img { cursor: zoom-in; }

        /* current exits */
        .cs-exit-left  { animation: csExitLeft  ${DURATION}ms cubic-bezier(0.55,0,0.1,1) forwards; }
        .cs-exit-right { animation: csExitRight ${DURATION}ms cubic-bezier(0.55,0,0.1,1) forwards; }
        /* next enters */
        .cs-enter-right { animation: csEnterRight ${DURATION}ms cubic-bezier(0.55,0,0.1,1) forwards; }
        .cs-enter-left  { animation: csEnterLeft  ${DURATION}ms cubic-bezier(0.55,0,0.1,1) forwards; }

        @keyframes csExitLeft   { to { transform: translateX(-100%); } }
        @keyframes csExitRight  { to { transform: translateX(100%);  } }
        @keyframes csEnterRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes csEnterLeft  { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        .cs-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 12px 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
        }
        .cs-btn {
          flex-shrink: 0;
          width: 40px; height: 40px;
          border-radius: 9999px;
          background: #111111;
          border: 1px solid #2A2A2A;
          display: flex; align-items: center; justify-content: center;
          color: white;
          cursor: pointer;
          transition: border-color 150ms, background 150ms, transform 100ms;
          user-select: none;
        }
        .cs-btn:hover  { border-color: white; background: #1A1A1A; }
        .cs-btn:active { transform: scale(0.88); }

        /* Modal */
        .cs-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 24px;
          animation: csFadeIn 180ms ease forwards;
        }
        @keyframes csFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .cs-modal-box {
          position: relative;
          max-width: 900px;
          width: 100%;
          background: #111111;
          border: 1px solid #2A2A2A;
          border-radius: 1rem;
          overflow: hidden;
          animation: csScaleIn 180ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        @keyframes csScaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .cs-modal-img-wrap {
          width: 100%;
          max-height: 70vh;
          background: #0A0A0A;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cs-modal-img-wrap img {
          width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }
        .cs-modal-close {
          position: absolute;
          top: 12px; right: 12px;
          width: 36px; height: 36px;
          border-radius: 9999px;
          background: rgba(0,0,0,0.6);
          border: 1px solid #2A2A2A;
          color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 2;
        }
        .cs-modal-close:hover { background: rgba(0,0,0,0.85); }

        .cs-modal-footer {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #1A1A1A;
        }
        .cs-detail-btn {
          padding: 8px 16px;
          border-radius: 9999px;
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 150ms, background 150ms;
        }
        .cs-detail-btn:hover { border-color: white; background: #222222; }
        .cs-detail-btn.active { background: white; color: #111111; }
      `}</style>

      {/* Header */}
      <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 text-center">
        Certifications
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
        My Certifications
      </h2>
      <p className="text-[#888888] text-sm md:text-base text-center mb-12 max-w-lg mx-auto px-4">
        Sertifikat kompetensi yang diperoleh dari uji keahlian resmi.
      </p>

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 md:gap-5">

          {/* Prev */}
          <button className="cs-btn" onClick={() => go("left")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Two card slots */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1].map((offset) => {
              const curIndex = (current + offset + total) % total;
              const incIndex = incoming ? (incoming.index + offset + total) % total : null;
              const curSlide = slideData[curIndex];
              const incSlide = incIndex !== null ? slideData[incIndex] : null;

              const exitClass = incoming
                ? incoming.dir === "right" ? "cs-exit-left" : "cs-exit-right"
                : "";
              const enterClass = incoming
                ? incoming.dir === "right" ? "cs-enter-right" : "cs-enter-left"
                : "";

              return (
                <div key={offset} className="cs-track">
                  {/* Current */}
                  <div className={`cs-slide ${exitClass}`}>
                    <img
                      src={curSlide.src}
                      alt={curSlide.title}
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                      onClick={() => openModal(curIndex)}
                    />
                    <div className="cs-caption">
                      <p className="text-white text-sm font-semibold">{curSlide.title}</p>
                    </div>
                  </div>

                  {/* Incoming */}
                  {incSlide && (
                    <div className={`cs-slide ${enterClass}`}>
                      <img
                        src={incSlide.src}
                        alt={incSlide.title}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                      <div className="cs-caption">
                        <p className="text-white text-sm font-semibold">{incSlide.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button className="cs-btn" onClick={() => go("right")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slideData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === current ? "white" : "#444",
                border: "none",
                cursor: "pointer",
                transition: "all 250ms ease",
              }}
            />
          ))}
        </div>

        <p className="text-center text-[#888888] text-xs mt-3">
          {current + 1} / {total}
        </p>
      </div>

      {/* Modal */}
      {modalOpen && activeSlide && (
        <div className="cs-modal-overlay" onClick={closeModal}>
          <div className="cs-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="cs-modal-close" onClick={closeModal} aria-label="Tutup">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="cs-modal-img-wrap">
              <img
                src={showDetail ? activeSlide.detailSrc : activeSlide.src}
                alt={activeSlide.title}
                draggable={false}
              />
            </div>

            <div className="cs-modal-footer">
              <div>
                <p className="text-white text-sm font-semibold">{activeSlide.title}</p>
                <p className="text-[#888888] text-xs mt-0.5">
                  {showDetail ? "Gambar kedua" : "Gambar utama"}
                </p>
              </div>

              <button
                className={`cs-detail-btn ${showDetail ? "active" : ""}`}
                onClick={() => setShowDetail((prev) => !prev)}
              >
                {showDetail ? "Lihat Gambar Utama" : "Lihat Gambar Kedua"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
