import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, Zap, Heart, Mail, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="gradient-text">Privacy-First</span> Security
            <br />
            Software You <span className="gradient-text">Own Forever</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We build offline-first security tools with a simple promise:{" "}
            <strong className="text-foreground">buy once, own forever</strong>.
            No subscriptions. No data collection. No compromises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg inline-flex items-center justify-center gap-2"
            >
              View Products <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>


      {/* Values Grid */}
      <section className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          {
            icon: <Shield size={28} />,
            title: "Privacy First",
            desc: "Your data stays on your device. We don't collect, track, or sell anything. Ever.",
          },
          {
            icon: <Lock size={28} />,
            title: "Buy Once, Own Forever",
            desc: "One-time payment. No subscriptions, no recurring fees, no limited licenses. It's yours for life.",
          },
          {
            icon: <Zap size={28} />,
            title: "Offline & Secure",
            desc: "Our tools work entirely offline. No internet connection required for core functionality.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="glass-card rounded-xl p-6 text-center"
          >
            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-primary mx-auto mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Lifetime Support */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-xl p-8 mb-20 text-center"
      >
        <Heart className="text-primary mx-auto mb-4" size={32} />
        <h2 className="text-2xl font-bold text-foreground mb-3">Lifetime Support Included</h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Every purchase includes lifetime support. Bug fixes, security patches, and help — all included at no extra cost.
        </p>
      </motion.section>

      {/* Custom Development CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">Need Custom Software?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          We build custom privacy-first tools for businesses and individuals. Get in touch to discuss your project.
        </p>
        <a
          href="mailto:diysoftwares@gmail.com"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <Mail size={18} />
          diysoftwares@gmail.com
        </a>
      </motion.section>
    </div>
  );
};

export default Home;
