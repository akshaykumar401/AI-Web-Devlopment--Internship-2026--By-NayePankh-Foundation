import heroImg from "../../assets/hero.png";
import FloatingBadge from "../common/FloatingBadge";

const Hero = () => (
  <section
    id="Hero"
    className="relative min-h-screen bg-gray-50 flex items-center pt-16 overflow-hidden"
  >
    {/* Decorative blobs */}
    <div
      className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle,rgba(232,93,4,0.07) 0%,transparent 70%)",
      }}
    />
    <div
      className="absolute -bottom-20 -left-20 w-[360px] h-[360px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle,rgba(244,140,6,0.06) 0%,transparent 70%)",
      }}
    />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* ── Left Content ── */}
      <div className="anim-up order-2 lg:order-1">
        {/* Badge */}
        <div className="badge mb-7">
          <i className="ri-flashlight-line text-sm" />
          Powered by AI
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900 mb-5">
          Empowering Lives,
          <br />
          <span className="gradient-text">One Wing</span> at a Time
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-9 max-w-lg">
          Bridging the gap between grassroots activism and modern technology to
          create sustainable social impact across communities.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a href="#Join" className="btn-primary !py-3.5 !px-7 !text-sm">
            <i className="ri-heart-fill text-base" />
            Donate Now
          </a>
          <a href="#Impact" className="btn-outline !py-3.5 !px-7 !text-sm">
            View Impact
            <i className="ri-arrow-right-line text-base" />
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 sm:gap-10">
          {[
            { v: "5,300+", l: "Volunteers" },
            { v: "48", l: "Districts" },
            { v: "12K+", l: "Lives Impacted" },
          ].map((s) => (
            <div key={s.l}>
              <p
                className="text-2xl sm:text-3xl font-black text-gray-900 leading-none"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.v}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="relative anim-up delay-200 order-1 lg:order-2 hover:-rotate-4 transition-transform duration-300">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative">
          <img
            src={heroImg}
            alt="NayePankh Foundation empowering rural communities"
            className="w-full h-72 sm:h-96 lg:h-[460px] object-cover block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        {/* Floating badge */}
        <FloatingBadge
          count="48+"
          label="Lives Impacted"
          iconClass="ri-group-fill"
          className="bottom-4 left-4"
        />

        {/* Decorative floats */}
        <div
          className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl anim-float"
          style={{
            background: "linear-gradient(135deg,rgba(232,93,4,0.12),rgba(244,140,6,0.12))",
          }}
        />
        <div
          className="absolute -bottom-3 right-10 w-10 h-10 rounded-xl anim-float delay-200"
          style={{
            background: "linear-gradient(135deg,rgba(232,93,4,0.10),rgba(244,140,6,0.10))",
          }}
        />
      </div>
    </div>
  </section>
);

export default Hero;
