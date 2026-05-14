"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";
import { localize } from "@/lib/i18n";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const uiText = {
  label: { id: "Chatbot Interaktif", en: "Interactive Chatbot" },
  heading: {
    id: "Bantuan AI yang selalu siap membantu tim Anda.",
    en: "AI support always ready to help your team.",
  },
  description: {
    id: "Biarkan pengguna Anda berinteraksi dengan chatbot AI bilingual yang membantu merencanakan website bisnis, fitur MVP, dan jalur pengembangan.",
    en: "Let your users interact with a bilingual AI chatbot that helps plan business websites, MVP features, and development direction.",
  },
  quickResponse: { id: "Respon cepat", en: "Fast response" },
  seamlessIntegration: { id: "Integrasi mulus", en: "Seamless integration" },
  quickResponseDesc: {
    id: "Jawaban instan dengan gaya percakapan natural.",
    en: "Instant answers in a natural conversational style.",
  },
  seamlessIntegrationDesc: {
    id: "Siap dipasang di landing page, dashboard, atau mobile app.",
    en: "Ready to deploy on landing pages, dashboards, or mobile apps.",
  },
  sectionTitle: { id: "OniX Assistant", en: "OniX Assistant" },
  sectionSubtitle: {
    id: "Rencanakan website bisnis Anda dengan AI konsultan.",
    en: "Plan your business website with an AI consultant.",
  },
  placeholder: {
    id: "Industri bisnis Anda apa?",
    en: "What's your industry?",
  },
  button: { id: "Kirim", en: "Send" },
  errorMessage: {
    id: "Maaf, API key tidak ditemukan. Silakan set NEXT_PUBLIC_GOOGLE_API_KEY di environment.",
    en: "Sorry, API key not found. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your environment.",
  },
};

export default function ChatbotPanel() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const chatRef = useRef<InstanceType<typeof GoogleGenerativeAI> | null>(null);
  const conversationRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      setError(localize(uiText.errorMessage, language));
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      chatRef.current = genAI;
      conversationRef.current = genAI
        .getGenerativeModel({ model: "gemini-2.5-flash" })
        .startChat({
          history: [],
          systemInstruction: {
            role: "user",
            parts: [
              {
                text: `You are OniX, a professional website planning assistant. OniX helps businesses understand how custom websites can improve their operations and growth.

## Your Role
Help potential clients by:
1. Understanding their industry and business goals
2. Asking discovery questions about their needs
3. Recommending MVP (Minimum Viable Product) features
4. Estimating timeline and budget
5. Encouraging project consultations

## Discovery Flow
Ask about:
- What industry are they in?
- What does their business do?
- Do they already have a website?
- Main goals: Get leads, Sell products, Build branding, Automate operations, Increase bookings?
- Need mobile support?
- Need admin/dashboard access?
- Target launch timeline?

## Industries & MVPs You Can Recommend

**Healthcare/Clinic**: Landing page, Doctor profiles, Appointment booking, Contact form, WhatsApp integration, Mobile responsive
**Restaurant/Cafe**: Digital menu, Reservation system, Gallery, Google Maps, Promo banners, Food ordering
**Real Estate**: Property listings, Search/filter, Detail pages, Agent contact forms, Location maps
**E-Commerce**: Product catalog, Shopping cart, Checkout, Payment gateway, User auth, Order tracking
**Education**: Course listing, Student registration, Video lessons, Quiz system, Certificate generation
**Corporate**: Modern landing, Portfolio, Services page, Team section, Contact form, SEO
**Construction**: Project showcase, Service pages, Quote requests, Testimonials, Gallery
**Hotel/Hospitality**: Room showcase, Booking system, Availability calendar, Gallery, Payment

## Pricing & Timeline
- **Starting from 10 million IDR** for basic MVP website development
- Timeline for a basic project: **2 weeks or up to 3 months**, depending on scope
- Future scaling: Add loyalty programs, dashboards, automation, AI features

## Payment and Meetings
- Mention payment via bank transfer methods as a convenient option
- Offer online meetings or direct meetings to discuss project details
- Encourage scheduling a consultation or discovery call

## Call to Action
Encourage users to:
- Request a free MVP roadmap
- Book a consultation call
- See UI prototype examples
- Discuss scalable solutions

## Important Guidelines
- Sound professional but friendly
- Explain technical concepts simply
- Focus on business value
- Be consultative, not pushy
- Support both Indonesian and English and answer in the user’s preferred language
- When ready, direct to: hello@paitonix.com or WhatsApp 087891541475
- Location: Denpasar, Bali, Indonesia
- Mention: We build super apps and scalable solutions

Keep responses conversational, clear, and focused on helping them understand their website needs.`,
              },
            ],
          },
        });
      setApiReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initialize AI");
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Scroll to chatbot section when loading finishes
    if (!isLoading && messages.length > 0) {
      const chatSection = document.getElementById("chatbot");
      chatSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || !apiReady || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      if (!conversationRef.current) throw new Error("Chat not initialized");

      const response = await conversationRef.current.sendMessage(userMessage);
      const assistantMessage = response.response.text();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to get response";
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMsg}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section
      id="chatbot"
      className="scroll-mt-24 py-20 sm:py-24 bg-slate-950 text-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-amber-200/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-100">
              {localize(uiText.label, language)}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {localize(uiText.heading, language)}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-300">
              {localize(uiText.description, language)}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-700/70 bg-white/5 px-5 py-4">
                <p className="text-sm font-semibold text-amber-200">
                  {localize(uiText.quickResponse, language)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {localize(uiText.quickResponseDesc, language)}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-700/70 bg-white/5 px-5 py-4">
                <p className="text-sm font-semibold text-cyan-200">
                  {localize(uiText.seamlessIntegration, language)}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {localize(uiText.seamlessIntegrationDesc, language)}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950/40"
          >
            <div className="border-b border-slate-800/80 px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  {localize(uiText.sectionTitle, language)}
                </p>
                <p className="text-xs text-slate-400">
                  {localize(uiText.sectionSubtitle, language)}
                </p>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-800 overflow-hidden">
                <img
                  src="/assets/images/ai-assistant.png"
                  alt="AI assistant"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Messages Display */}
            <div className="space-y-4 px-6 py-6 h-96 overflow-y-auto">
              {messages.length === 0 && !error && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-slate-400 text-center">
                    {language === "id"
                      ? "Mulai percakapan dengan mengajukan pertanyaan..."
                      : "Start a conversation by asking a question..."}
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-relaxed max-w-xs ${
                      message.role === "assistant"
                        ? "bg-slate-800 text-slate-100"
                        : "bg-amber-300/15 text-amber-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-3xl px-4 py-3 bg-slate-800">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-800/80 px-6 py-5">
              {error && (
                <div className="mb-3 rounded-3xl bg-red-500/20 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-3 rounded-3xl border border-slate-700/80 bg-slate-950 px-4 py-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!apiReady || isLoading}
                  placeholder={localize(uiText.placeholder, language)}
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!apiReady || isLoading || !inputValue.trim()}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500/85 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_36px_rgba(14,165,233,0.5)] backdrop-blur-xl border border-white/20 transition-all duration-300 hover:bg-sky-500/95 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : localize(uiText.button, language)}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
