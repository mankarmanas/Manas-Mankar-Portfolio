"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import emailjs from "@emailjs/browser";

const { personal } = portfolioData;

const contactCards = [
  { icon: <Mail size={20} />,  label: "Email",    value: personal.email,   href: `mailto:${personal.email}`,  color: "text-primary-light", bg: "bg-primary/10",  border: "border-primary/25"  },
  { icon: <Phone size={20} />, label: "Phone",    value: personal.phone,   href: `tel:${personal.phone}`,     color: "text-accent",        bg: "bg-accent/10",   border: "border-accent/25"   },
  { icon: <MapPin size={20} />,label: "Location", value: personal.location,href: null,                        color: "text-green-400",     bg: "bg-green-400/10",border: "border-green-400/25" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } };

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_l0nsm9l",
        "template_js33i6q",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "sAyDdvRhjwhi2qIZu"
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding relative">

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={container}>

          {/* Header */}
          <motion.div variants={item} className="text-center mb-7">
            <span className="section-label">Contact</span>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Get In Touch</h2>
            <p className="text-text-secondary text-xl mt-4 max-w-xl mx-auto">
              I&apos;m actively seeking AI Engineering & Full-Stack roles. Let&apos;s build something great.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left */}
            <motion.div variants={item} className="space-y-6">
              <div className="space-y-4">
                {contactCards.map((c, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02, x: 4, boxShadow: "0 12px 32px rgba(0,0,0,0.3)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                    {c.href ? (
                      <a href={c.href} className={`flex items-center gap-4 p-5 rounded-2xl ${c.bg} border ${c.border} group transition-transform`}>
                        <div className={`${c.color} shrink-0`}>{c.icon}</div>
                        <div>
                          <p className="text-text-muted text-sm">{c.label}</p>
                          <p className={`${c.color} font-bold text-lg group-hover:underline`}>{c.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className={`flex items-center gap-4 p-5 rounded-2xl ${c.bg} border ${c.border}`}>
                        <div className={`${c.color} shrink-0`}>{c.icon}</div>
                        <div>
                          <p className="text-text-muted text-sm">{c.label}</p>
                          <p className={`${c.color} font-bold text-lg`}>{c.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <a href={personal.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary text-base font-semibold transition-all hover:scale-105">
                  <Github size={18} /> GitHub
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass border border-border hover:border-accent/40 text-text-secondary hover:text-accent text-base font-semibold transition-all hover:scale-105">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={item}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name",    label: "Your Name",      type: "text",  placeholder: "John Doe",            value: form.name,    key: "name"    },
                  { id: "email",   label: "Email Address",  type: "email", placeholder: "john@company.com",    value: form.email,   key: "email"   },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-text-secondary text-base font-semibold mb-2">{f.label}</label>
                    <input
                      id={f.id} type={f.type} required placeholder={f.placeholder} value={f.value}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl glass border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-text-primary placeholder-text-muted text-base transition-all outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-text-secondary text-base font-semibold mb-2">Message</label>
                  <textarea
                    id="message" required rows={5} placeholder="Tell me about the opportunity..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl glass border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-text-primary placeholder-text-muted text-base transition-all outline-none resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-primary hover:bg-primary-light text-white text-lg font-bold transition-all glow-purple disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {status === "sent"    && <CheckCircle size={20} />}
                  {status === "idle"    && <Send size={20} />}
                  {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent!" : "Send Message"}
                </motion.button>

                {status === "sent" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-base text-center font-semibold">
                    Thanks! I&apos;ll get back to you shortly. ✓
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
