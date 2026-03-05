"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  Bike,
  Car,
  Pill,
  Moon,
  MapPin,
  Clock,
  Shield,
  ChevronDown,
  Star,
  Check,
  ArrowRight,
  Menu,
  X,
  Zap,
  Package,
  Send,
  Users,
  TrendingUp,
  Headphones,
  Store,
  Share2,
  BadgeCheck,
} from "lucide-react";

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(end: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end]);
  return val;
}

/* ═══════════════════════════════════════════
   REVEAL
   ═══════════════════════════════════════════ */

function Reveal({ children, className = "", delay = "" }: { children: ReactNode; className?: string; delay?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`${visible ? `anim-fade-up ${delay}` : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#hizmetler", label: "Hizmetler" },
    { href: "#surec", label: "Nasıl Çalışır" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#yorumlar", label: "Yorumlar" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#FFFEE9]/90 shadow-lg shadow-black/5 backdrop-blur-xl" : ""
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C1F11D] text-base font-bold text-[#151515] transition-transform group-hover:scale-105">
            M
          </div>
          <div className="hidden min-[400px]:block">
            <div className="text-[14px] font-bold text-[#151515]">Metin İlhan</div>
            <div className="text-[11px] font-medium tracking-wide text-[#797979]">7/24 Motor Kurye</div>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#797979] transition-colors hover:bg-[#151515]/5 hover:text-[#151515]">
              {l.label}
            </a>
          ))}
          <a href="tel:05425591020"
            className="ml-4 flex items-center gap-2 rounded-full bg-[#C1F11D] px-5 py-2.5 text-[13px] font-bold text-[#151515] transition-all hover:shadow-lg hover:shadow-[#C1F11D]/30">
            <Phone className="h-3.5 w-3.5" />
            Hemen Ara
          </a>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-[#151515]/5 md:hidden" aria-label="Menü">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="border-t border-[#151515]/5 bg-[#FFFEE9]/95 px-5 py-2 backdrop-blur-xl">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block border-b border-[#151515]/5 py-3.5 text-[15px] text-[#797979] transition hover:text-[#151515]">
              {l.label}
            </a>
          ))}
          <a href="tel:05425591020"
            className="my-3 block rounded-full bg-[#C1F11D] py-3.5 text-center text-[15px] font-bold text-[#151515]">
            0542 559 10 20
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFEE9] pb-16 pt-[72px]">
      {/* Cover Image Area */}
      <div className="relative h-48 md:h-64 w-full bg-[#151515]">
        <img 
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" 
          alt="Motor Kurye Cover" 
          className="h-full w-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center">
        {/* Profile Avatar overlapping */}
        <div className="anim-fade-up d2 relative -mt-16 md:-mt-24 flex justify-center">
          <div className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-[#FFFEE9] bg-[#151515] p-2 shadow-sm flex items-center justify-center">
            {/* Inside avatar */}
            <div className="relative flex w-full h-full rounded-full border-[1.5px] border-dashed border-[#C1F11D] items-center justify-center flex-col bg-[#151515]">
              <span className="text-[10px] md:text-[11px] font-bold text-[#C1F11D] tracking-wide mt-1">METİN İLHAN</span>
              <div className="flex items-center justify-center my-0.5 text-[#C1F11D]">
                <Bike className="h-7 w-7 md:h-10 md:w-10" />
              </div>
              <span className="text-[10px] md:text-[12px] font-bold text-[#C1F11D] leading-[1.2] pb-1">7/24<br/>MOTOR KURYE<br/>HİZMETİ</span>
              
              {/* Spinning Decoration from original brand color */}
              <div className="absolute -left-2 -right-2 -top-2 -bottom-2 rounded-full border-[3px] border-[#C1F11D]/20 border-t-[#C1F11D] animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="anim-fade-up d3 mt-5 text-center">
          <h1 className="text-[32px] md:text-4xl font-extrabold text-[#151515] tracking-tight">
            İstanbul kurye Metin
          </h1>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[15px] md:text-[16px] font-semibold text-[#797979]">
             ~İstanbul kurye
             <BadgeCheck className="h-5 w-5 text-blue-500 fill-white" />
          </div>
        </div>

        {/* 4 Action Buttons */}
        <div className="anim-fade-up d4 mt-8 grid grid-cols-4 gap-3 max-w-[400px] mx-auto">
          {[
            { id: "sesli", icon: <Phone className="h-6 w-6" />, label: "Sesli", href: "tel:05425591020" },
            { id: "mesaj", icon: <MessageCircle className="h-6 w-6" />, label: "Mesaj", href: "https://wa.me/905425591020" },
            { id: "katalog", icon: <Store className="h-6 w-6" />, label: "Katalog", href: "#hizmetler" },
            { id: "paylas", icon: <Share2 className="h-6 w-6" />, label: "Paylaş", href: "#" },
          ].map((btn) => (
             <a key={btn.id} href={btn.href} className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-white py-4 shadow-sm border border-[#151515]/5 transition hover:shadow-md hover:-translate-y-0.5 hover:border-[#151515]/10">
                <div className="text-[#C1F11D] transition-transform group-hover:scale-110">
                   {btn.icon}
                </div>
                <span className="text-[13px] md:text-[14px] font-bold text-[#151515]">{btn.label}</span>
             </a>
          ))}
        </div>

        {/* Status bar like "Şu anda açık 24 saat açık" */}
        <div className="anim-fade-up d5 mx-auto mt-10 max-w-lg">
          <div className="flex items-center justify-between rounded-t-2xl border border-[#151515]/5 bg-white px-5 py-4 shadow-sm border-b-0 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
            <div className="flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                 <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
               </span>
               <span className="text-[16px] font-bold text-green-600">Şu anda açık</span>
            </div>
            <div className="flex items-center gap-1 text-[15px] font-medium text-[#151515]">
              24 saat açık
              <ChevronDown className="h-4 w-4 text-[#797979]" />
            </div>
          </div>
          <div className="rounded-b-2xl border border-[#151515]/5 bg-white px-5 py-5 shadow-sm border-t border-t-[#151515]/5 bg-gray-50/50">
             <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStats() {
  const { ref, visible } = useInView();
  const ilce = useCounter(39, visible);
  const kurye = useCounter(148, visible);

  return (
    <div ref={ref} className="flex justify-center gap-6 md:gap-10">
      {[
        { val: `${ilce}`, suffix: "", label: "İlçe" },
        { val: `${kurye}`, suffix: "+", label: "Kurye" },
        { val: "24/7", suffix: "", label: "Hizmet" },
      ].map((s, i) => (
        <div key={s.label} className="text-center">
          <div className={`text-[24px] font-bold text-[#151515] md:text-[28px] ${visible ? "anim-number" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.15}s` }}>
            {i < 2 ? s.val : "24/7"}{s.suffix}
          </div>
          <div className="text-[11px] font-semibold tracking-wider text-[#151515]/50 uppercase">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════ */

function MarqueeBand() {
  const items = ["Motor Kurye", "Eczane Kurye", "Arabalı Kurye", "Nöbetçi Kurye", "Şoför Hizmeti", "Şehir İçi Teslimat", "7/24 Açık"];
  return (
    <div className="overflow-hidden border-y border-[#151515]/5 bg-white py-3.5">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 flex shrink-0 items-center gap-2.5 text-[13px] font-medium tracking-wider text-[#797979] uppercase">
            <Zap className="h-3 w-3 text-[#C1F11D]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */

function Services() {
  const services = [
    { icon: <Bike className="h-6 w-6" />, title: "Motor Kurye", desc: "Trafiği aşan hız. Acil gönderileriniz dakikalar içinde teslimatta." },
    { icon: <Car className="h-6 w-6" />, title: "Arabalı Kurye", desc: "Büyük paketler ve toplu gönderiler için kapıdan kapıya taşıma." },
    { icon: <Pill className="h-6 w-6" />, title: "Eczane Kurye", desc: "İlaç ve tıbbi malzeme teslimatında güvenilir, hızlı çözüm." },
    { icon: <Moon className="h-6 w-6" />, title: "Nöbetçi Kurye", desc: "Gece gündüz demeden 7/24 nöbetçi ekiple her an yanınızda." },
    { icon: <MapPin className="h-6 w-6" />, title: "Şehir İçi Dağıtım", desc: "39 ilçeye aynı gün teslimat garantisi. Optimum rotalar." },
    { icon: <Headphones className="h-6 w-6" />, title: "Şoför Hizmeti", desc: "Profesyonel şoför ile aracınız güvenle istediğiniz yere ulaşır." },
  ];

  return (
    <section id="hizmetler" className="bg-[#FFFEE9] py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">Hizmetlerimiz</span>
            <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-bold tracking-tight text-[#151515]">
              Hizmet<span className="italic">lerimiz</span>
            </h2>
          </Reveal>
          <Reveal delay="d2">
            <a href="#iletisim" className="flex items-center gap-1.5 text-[13px] font-medium text-[#797979] transition hover:text-[#151515]">
              Teklif Al <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={`d${i + 1}`}>
              <div className="group rounded-2xl border border-[#151515]/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C1F11D]/30 hover:shadow-xl hover:shadow-[#C1F11D]/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C1F11D]/10 text-[#151515] transition-colors group-hover:bg-[#C1F11D] group-hover:text-[#151515]">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-[#151515]">{s.title}</h3>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-[#797979]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROCESS
   ═══════════════════════════════════════════ */

function Process() {
  const steps = [
    { icon: <Phone className="h-5 w-5" />, title: "Bizi Arayın", desc: "Telefon veya WhatsApp ile sipariş verin." },
    { icon: <Package className="h-5 w-5" />, title: "Paket Alımı", desc: "Kuryemiz belirttiğiniz adresten paketi alır." },
    { icon: <Bike className="h-5 w-5" />, title: "Hızlı Teslimat", desc: "En kısa rotayla teslim noktasına ulaşır." },
    { icon: <Check className="h-5 w-5" />, title: "Onay", desc: "Teslimat tamamlanır, anında bilgilendirilirsiniz." },
  ];

  return (
    <section id="surec" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">Süreç</span>
            <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-bold tracking-tight text-[#151515]">
              4 Adımda <span className="italic">Teslimat</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={`d${(i + 1) * 2}`}>
              <div className="relative text-center">
                {/* Number */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C1F11D] text-[#151515]">
                  {s.icon}
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#151515] text-[11px] font-bold text-white lg:right-auto lg:-left-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[15px] font-bold text-[#151515]">{s.title}</h3>
                <p className="mt-1.5 text-[13px] font-light text-[#797979]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SAFETY / TRUST BANNER
   ═══════════════════════════════════════════ */

function TrustBanner() {
  return (
    <section className="border-y border-[#151515]/5 bg-[#FFFEE9] py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-3xl bg-white p-8 sm:flex-row sm:p-10 lg:p-14">
            <div className="flex-1">
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">Güvenlik</span>
              <h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.2rem)] leading-tight font-bold text-[#151515]">
                Güvenliğiniz bizim <span className="italic">önceliğimiz</span>
              </h2>
              <p className="mt-3 max-w-md text-[14px] font-light leading-relaxed text-[#797979]">
                Tüm gönderileriniz sigorta kapsamında taşınır. Profesyonel kuryelerimiz kapsamlı eğitimlerden geçer.
              </p>
              <a href="#iletisim" className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#151515] px-5 py-2.5 text-[13px] font-bold text-[#151515] transition hover:bg-[#151515] hover:text-white">
                Detaylı Bilgi
              </a>
            </div>
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-[#C1F11D]">
              <Shield className="h-14 w-14 text-[#151515]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */

function About() {
  const features = [
    "İstanbul'un 39 ilçesinde aktif hizmet",
    "148+ profesyonel kurye ağı",
    "7/24 kesintisiz operasyon",
    "Sigortalı teslimat garantisi",
    "Kurumsal ve bireysel çözümler",
  ];

  return (
    <section id="hakkimizda" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">Hakkımızda</span>
            <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,2.5rem)] leading-tight font-bold tracking-tight text-[#151515]">
              İstanbul Kurye&apos;de Güvenilir İsim:{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Metin İlhan</span>
                <span className="absolute bottom-0.5 left-0 -z-0 h-3 w-full bg-[#C1F11D]/40" />
              </span>
            </h2>
            <p className="mt-5 text-[15px] font-light leading-[1.8] text-[#797979]">
              Yıllardır İstanbul&apos;un kurye sektöründe hizmet veren Metin İlhan, profesyonel ekibiyle motor kurye, arabalı kurye, eczane kurye ve daha birçok özel hizmet sunmaktadır.
            </p>
            <ul className="mt-8 space-y-3.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[14px] text-[#151515]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C1F11D]">
                    <Check className="h-3 w-3 text-[#151515]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Stats card */}
          <Reveal delay="d3">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin className="h-5 w-5" />, val: "39", label: "İlçe Kapsama", bg: "bg-[#C1F11D]" },
                { icon: <Users className="h-5 w-5" />, val: "148+", label: "Aktif Kurye", bg: "bg-[#151515] text-white" },
                { icon: <Clock className="h-5 w-5" />, val: "24/7", label: "Kesintisiz", bg: "bg-[#151515] text-white" },
                { icon: <TrendingUp className="h-5 w-5" />, val: "7+", label: "Yıl Tecrübe", bg: "bg-[#C1F11D]" },
              ].map((s) => (
                <div key={s.label} className={`flex flex-col items-center justify-center rounded-2xl ${s.bg} p-6 text-center`}>
                  <div className="mb-2 opacity-60">{s.icon}</div>
                  <div className="text-[28px] font-bold">{s.val}</div>
                  <div className="mt-0.5 text-[11px] font-medium tracking-wider uppercase opacity-50">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */

function Testimonials() {
  const reviews = [
    { name: "Ahmet Y.", role: "E-ticaret Sahibi", text: "Yıllardır Metin Bey'le çalışıyoruz. Zamanında, güvenilir ve profesyonel. Kesinlikle tavsiye ederim." },
    { name: "Fatma K.", role: "Eczane Sahibi", text: "Eczane kurye hizmetleri mükemmel. İlaçlar hastalara hızlı ve güvenle ulaşıyor." },
    { name: "Murat S.", role: "Avukat", text: "Acil evrak teslimatlarında güvenebileceğim tek kurye. Gece yarısı bile çözüm üretiyorlar." },
  ];

  return (
    <section id="yorumlar" className="bg-[#FFFEE9] py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">Yorumlar</span>
          <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-bold tracking-tight text-[#151515]">
            Müşterilerimiz Ne <span className="italic">Diyor?</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={`d${(i + 1) * 2}`}>
              <div className="rounded-2xl border border-[#151515]/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C1F11D]/10">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#C1F11D] text-[#C1F11D]" />
                  ))}
                </div>
                <p className="mt-4 text-[14px] font-light leading-[1.7] text-[#797979]">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-[#151515]/5 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C1F11D] text-[13px] font-bold text-[#151515]">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#151515]">{r.name}</div>
                    <div className="text-[11px] text-[#797979]">{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */

function CtaBand() {
  return (
    <section className="bg-[#C1F11D] py-20">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <h2 className="text-[clamp(2rem,5.5vw,3.2rem)] leading-[1.1] font-bold tracking-tight text-[#151515]">
            Hemen Kurye Çağırın!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-light text-[#151515]/55">
            İstanbul&apos;un neresinde olursanız olun, kuryemiz kapınıza gelsin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="tel:05425591020"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#151515] px-8 py-4 text-[15px] font-bold text-white transition-all hover:shadow-xl hover:shadow-[#151515]/20 sm:w-auto">
              <Phone className="h-4 w-4" />
              0542 559 10 20
            </a>
            <a href="https://wa.me/905425591020" target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-[#151515]/15 px-8 py-4 text-[15px] font-bold text-[#151515] transition-all hover:border-[#151515]/30 hover:bg-[#151515]/5 sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="iletisim" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <span className="text-[12px] font-bold tracking-[0.2em] text-[#797979] uppercase">İletişim</span>
          <h2 className="mt-2 text-[clamp(1.8rem,4.5vw,2.5rem)] leading-tight font-bold tracking-tight text-[#151515]">
            Hızlı Teklif <span className="italic">Alın</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <Reveal delay="d2">
            <div className="space-y-5">
              {[
                { icon: <Phone className="h-5 w-5" />, label: "Telefon", value: "0542 559 10 20", href: "tel:05425591020", bg: "bg-[#C1F11D]" },
                { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", value: "Mesaj Gönderin", href: "https://wa.me/905425591020", bg: "bg-[#22c55e] text-white" },
                { icon: <MapPin className="h-5 w-5" />, label: "Hizmet Alanı", value: "İstanbul — 39 İlçe", href: undefined, bg: "bg-[#151515]/5" },
                { icon: <Clock className="h-5 w-5" />, label: "Çalışma Saatleri", value: "24 Saat Açık — Her Gün", href: undefined, bg: "bg-[#151515]/5" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg}`}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-[#797979] uppercase">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-[15px] font-medium text-[#151515] transition hover:text-[#797979]">
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-[15px] font-medium text-[#151515]">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay="d4">
            {sent ? (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl bg-[#C1F11D]/10">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C1F11D]">
                    <Check className="h-8 w-8 text-[#151515]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#151515]">Teşekkürler!</h3>
                  <p className="mt-2 text-[14px] text-[#797979]">En kısa sürede iletişime geçeceğiz.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-3.5 rounded-2xl border border-[#151515]/5 bg-[#FFFEE9] p-6">
                <input type="text" required placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#151515] placeholder-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20" />
                <input type="tel" required placeholder="Telefon Numaranız"
                  className="w-full rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#151515] placeholder-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Alınacak Adres"
                    className="w-full rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#151515] placeholder-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20" />
                  <input type="text" placeholder="Teslim Adresi"
                    className="w-full rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#151515] placeholder-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20" />
                </div>
                <select className="w-full rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20">
                  <option value="">Kurye Tipi Seçin</option>
                  <option value="motor">Motor Kurye</option>
                  <option value="araba">Arabalı Kurye</option>
                  <option value="eczane">Eczane Kurye</option>
                  <option value="nobetci">Nöbetçi Kurye</option>
                </select>
                <textarea placeholder="Açıklama (opsiyonel)" rows={3}
                  className="w-full resize-none rounded-xl border border-[#151515]/8 bg-white px-4 py-3.5 text-[14px] text-[#151515] placeholder-[#797979] outline-none transition focus:border-[#C1F11D] focus:ring-2 focus:ring-[#C1F11D]/20" />
                <button type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C1F11D] py-3.5 text-[15px] font-bold text-[#151515] transition-all hover:shadow-lg hover:shadow-[#C1F11D]/30">
                  <Send className="h-4 w-4" />
                  Teklif İste
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-[#151515]/5 bg-[#151515] py-12 text-white">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C1F11D] text-sm font-bold text-[#151515]">M</div>
            <span className="text-[14px] font-medium text-white/60">Metin İlhan — İstanbul Kurye</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[12px] text-white/40">
            <a href="#hizmetler" className="transition hover:text-[#C1F11D]">Hizmetler</a>
            <a href="#surec" className="transition hover:text-[#C1F11D]">Nasıl Çalışır</a>
            <a href="#hakkimizda" className="transition hover:text-[#C1F11D]">Hakkımızda</a>
            <a href="#yorumlar" className="transition hover:text-[#C1F11D]">Yorumlar</a>
            <a href="#iletisim" className="transition hover:text-[#C1F11D]">İletişim</a>
          </div>

          <p className="text-[11px] text-white/25">&copy; 2024 Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP
   ═══════════════════════════════════════════ */

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <a href="https://wa.me/905425591020" target="_blank" rel="noopener noreferrer"
      className="anim-fade-up fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110"
      aria-label="WhatsApp">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeBand />
      <Services />
      <Process />
      <TrustBanner />
      <About />
      <Testimonials />
      <CtaBand />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
