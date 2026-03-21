import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './components/BlurText';
import { VideoBackground } from './components/VideoBackground';

function App() {
  return (
    <div className="bg-black overflow-visible min-h-screen">
      {/* SECTION 1 - NAVBAR */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between liquid-glass rounded-full px-6 py-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xl">S</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['Home', 'Services', 'Work', 'Process', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors">
              Get Started
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 2 - HERO */}
      <section className="relative overflow-visible h-[1000px] bg-black">
        <VideoBackground
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          className="absolute top-[20%] w-full h-auto object-contain z-0"
        />

        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center pt-[150px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-full px-4 py-2 mb-6"
          >
            <span className="bg-white text-black rounded-full px-2 py-1 text-xs font-medium">New</span>
            <span className="ml-2 text-white/90 text-sm">Introducing AI-powered web design.</span>
          </motion.div>

          <div className="mb-6">
            <BlurText
              text="The Website Your Brand Deserves"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]"
            />
          </div>

          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/60 font-body font-light text-sm max-w-2xl mb-8"
          >
            Stunning design. Blazing performance. Built by AI, refined by experts.
            This is web design, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex gap-4"
          >
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
              Get Started
              <ArrowUpRight size={18} />
            </button>
            <button className="text-white/80 hover:text-white flex items-center gap-2 transition-colors">
              Watch Film
              <Play size={18} />
            </button>
          </motion.div>

          <div className="mt-auto pb-8 pt-16">
            <p className="text-white/30 text-xs uppercase tracking-wider">Trusted by innovative teams</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - PARTNERS BAR */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="liquid-glass rounded-full px-4 py-2">
            <span className="text-white/90 text-sm">Trusted by teams behind</span>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((partner) => (
              <span
                key={partner}
                className="text-2xl md:text-3xl font-heading italic text-white opacity-60 hover:opacity-100 transition-opacity"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - HOW IT WORKS */}
      <section className="relative min-h-[700px] py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
        <VideoBackground
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-1" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-1" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[500px] text-center">
          <div className="liquid-glass rounded-full px-4 py-2 mb-6">
            <span className="text-white text-sm">How It Works</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-4">
            You dream it. We ship it.
          </h2>

          <p className="text-white/60 font-body font-light text-sm max-w-2xl mb-8">
            Share your vision. Our AI handles the rest—wireframes, design, code, launch.
            All in days, not quarters.
          </p>

          <button className="liquid-glass-strong rounded-full px-6 py-3 text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
            Get Started
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      {/* SECTION 5 - FEATURES CHESS */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="liquid-glass rounded-full px-4 py-2 mb-4 inline-block">
              <span className="text-white text-xs font-medium">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-4">
              Pro features. Zero complexity.
            </h2>
          </div>

          {/* Row 1 - Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-heading italic text-white mb-4">
                Designed to convert. Built to perform.
              </h3>
              <p className="text-white/60 font-body font-light text-sm mb-6">
                Every pixel is intentional. Our AI studies what works across thousands of top
                sites—then builds yours to outperform them all.
              </p>
              <button className="liquid-glass-strong rounded-full px-6 py-3 text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
                Learn more
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden p-8">
              <div className="w-full h-64 bg-white/10 rounded-xl" />
            </div>
          </div>

          {/* Row 2 - Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 liquid-glass rounded-2xl overflow-hidden p-8">
              <div className="w-full h-64 bg-white/10 rounded-xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-heading italic text-white mb-4">
                It gets smarter. Automatically.
              </h3>
              <p className="text-white/60 font-body font-light text-sm mb-6">
                Your site evolves on its own. AI monitors every click, scroll, and
                conversion—then optimizes in real time. No manual updates. Ever.
              </p>
              <button className="liquid-glass-strong rounded-full px-6 py-3 text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
                See how it works
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - FEATURES GRID */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="liquid-glass rounded-full px-4 py-2 mb-4 inline-block">
              <span className="text-white text-xs font-medium">Why Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-4">
              The difference is everything.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Days, Not Months', desc: 'Concept to launch at a pace that redefines fast.' },
              { icon: '🎨', title: 'Obsessively Crafted', desc: 'Every detail considered. Every element refined.' },
              { icon: '📊', title: 'Built to Convert', desc: 'Layouts informed by data. Decisions backed by performance.' },
              { icon: '🛡️', title: 'Secure by Default', desc: 'Enterprise-grade protection comes standard.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="liquid-glass rounded-2xl p-6"
              >
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-heading italic text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 font-body font-light text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - STATS */}
      <section className="relative py-24 px-6 overflow-hidden">
        <VideoBackground
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'saturate(0)' }}
        />

        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-1" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-1" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Sites launched' },
              { value: '98%', label: 'Client satisfaction' },
              { value: '3.2x', label: 'More conversions' },
              { value: '5 days', label: 'Average delivery' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 font-body font-light text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="liquid-glass rounded-full px-4 py-2 mb-4 inline-block">
              <span className="text-white text-xs font-medium">What They Say</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-4">
              Don't take our word for it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'CEO Luminary',
                quote: 'A complete rebuild in five days. The AI understood our brand better than we did.',
              },
              {
                name: 'Marcus Webb',
                role: 'Head of Growth Arcline',
                quote: 'Conversions up 4x within the first month. This is the future of web design.',
              },
              {
                name: 'Elena Voss',
                role: 'Brand Director Helix',
                quote: "They didn't just design our site—they transformed how we do business.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="liquid-glass rounded-2xl p-8"
              >
                <p className="text-white/80 font-body font-light text-sm italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-white font-body font-medium text-sm mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-white/50 font-body font-light text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - CTA FOOTER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <VideoBackground
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-1" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-1" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white mb-4">
            Your next website starts here.
          </h2>

          <p className="text-white/60 font-body font-light text-sm max-w-2xl mb-8">
            Book a free strategy call. See what AI-powered design can do.
          </p>

          <div className="flex justify-center gap-4 mb-32">
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
              Book a Call
              <ArrowUpRight size={18} />
            </button>
            <button className="bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-colors">
              View Pricing
            </button>
          </div>

          <footer className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-xs">© 2026 Studio</p>
              <div className="flex gap-6">
                {['Privacy', 'Terms', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white/40 text-xs hover:text-white/60 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;
