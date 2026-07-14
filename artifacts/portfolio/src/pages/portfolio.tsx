import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldAlert, Code2, Database, Send, Github, Linkedin, Facebook, Mail, Phone, FileDown, GraduationCap, Award, Loader2, CheckCircle2 } from "lucide-react";
import { useCreateContactMessage } from "@workspace/api-client-react";
import { Section } from "@/components/section";
import profilePhoto from "@assets/0_IMG-20240416-WA0002_1___1_-removebg-preview_1784018938394.png";

const RESUME_URL = `${import.meta.env.BASE_URL}mehedi-hasan-resume.pdf`;

const EDUCATION = [
  {
    title: "SSC — Science",
    subtitle: "GPA 4.28",
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
  },
  {
    title: "Diploma in Engineering",
    subtitle: "Currently running — 3rd semester",
    icon: <Award className="w-5 h-5 text-primary" />,
  },
];

const SOCIAL_LINKS = {
  github: "https://github.com/mehedie01",
  linkedin: "https://www.linkedin.com/in/md-mehedi-hasan-172a0b340/",
  facebook: "https://www.facebook.com/share/1EbqthUVHG/",
  email: "mdadorhasanalif@gmail.com",
  phones: ["01600757698", "01540343076"],
};

const SKILLS = [
  { name: "Python", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Django", category: "Backend" },
  { name: "REST API", category: "Backend" },
  { name: "SQLite", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Git", category: "Tooling" },
  { name: "GitHub", category: "Tooling" },
  { name: "Linux", category: "OS/SysAdmin" },
];

const PROJECTS = [
  {
    title: "Hospital Management System",
    description: "Built a Doctor, Patient, and Department management system with Python Django. Implemented CRUD operations, authentication, and database integration.",
    tech: ["Python", "Django", "SQLite", "HTML/CSS"],
    icon: <Database className="w-5 h-5 text-primary" />,
  },
  {
    title: "E-Commerce Customer Support AI Chatbot",
    description: "Built a Django-based AI chatbot that answers customer questions and provides product information.",
    tech: ["Python", "Django", "AI Integration", "REST API"],
    icon: <Terminal className="w-5 h-5 text-primary" />,
  },
  {
    title: "Portfolio Website",
    description: "Built a responsive personal portfolio website using React + Vite + TypeScript.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    icon: <Code2 className="w-5 h-5 text-primary" />,
  },
  {
    title: "Factory Management System",
    description: "Designed a local Wi-Fi based factory management system with product management, invoice generation, and sales tracking.",
    tech: ["Python", "Django", "Networking", "Database"],
    icon: <Database className="w-5 h-5 text-primary" />,
  },
  {
    title: "Networking Projects",
    description: "Used Cisco Packet Tracer to configure VLAN, VLSM, static & dynamic routing, DHCP, ACL, SSH, and enterprise networking.",
    tech: ["Cisco", "Networking", "Routing", "Security"],
    icon: <Send className="w-5 h-5 text-primary" />,
  },
  {
    title: "Cybersecurity Practice",
    description: "Completing networking, Linux, and penetration testing labs on TryHackMe and Hack The Box.",
    tech: ["Linux", "PenTesting", "TryHackMe", "HackTheBox"],
    icon: <ShieldAlert className="w-5 h-5 text-primary" />,
  },
];

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const mutation = useCreateContactMessage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { name, email, message } },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setMessage("");
        },
      },
    );
  };

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-primary">
        <CheckCircle2 className="w-10 h-10" />
        <p className="font-mono text-sm">
          Message sent. I'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => mutation.reset()}
          className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
      />
      {mutation.isError && (
        <p className="text-sm text-destructive font-mono">
          Something went wrong. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono font-medium px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-60 w-full sm:w-auto"
      >
        {mutation.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {mutation.isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans relative selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-lg text-primary tracking-tighter">
            <span className="text-foreground">~</span>/mehedi<span className="animate-pulse">_</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors"><span className="text-primary/70">01.</span> About</a>
            <a href="#education" className="hover:text-primary transition-colors"><span className="text-primary/70">02.</span> Education</a>
            <a href="#projects" className="hover:text-primary transition-colors"><span className="text-primary/70">03.</span> Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors"><span className="text-primary/70">04.</span> Contact</a>
            <a href="#contact" className="border border-primary text-primary px-4 py-2 rounded-sm hover:bg-primary/10 transition-colors">Connect</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex flex-col md:flex-row items-center gap-12 py-20">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-primary mb-4">Hi, my name is</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
                Md. Mehedi Hasan.
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-muted-foreground mb-8">
                I build secure backends.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Aspiring Python & Django Backend Developer and Cybersecurity Enthusiast. 
                I specialize in building secure, scalable web applications while actively 
                sharpening my penetration testing skills on TryHackMe and Hack The Box.
              </p>
              <div className="flex gap-4 items-center flex-wrap">
                <a href="#projects" className="bg-primary text-primary-foreground font-mono font-medium px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors">
                  View My Work
                </a>
                <a
                  href={RESUME_URL}
                  download
                  className="inline-flex items-center gap-2 border border-primary/60 text-primary font-mono font-medium px-6 py-3 rounded-sm hover:bg-primary/10 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  Download CV
                </a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                  <Github className="w-6 h-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-md border border-primary/40" />
              <div className="absolute -inset-3 rounded-md border border-primary/10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <img
                src={profilePhoto}
                alt="Md. Mehedi Hasan"
                className="relative w-full h-full object-cover rounded-md grayscale-[15%] contrast-105"
              />
              <div className="absolute -bottom-3 -right-3 bg-card border border-primary/40 rounded-sm px-3 py-1 font-mono text-xs text-primary">
                status: online
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <Section id="about" title="About & Skills" titleNumber="01">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My journey into tech is driven by a deep curiosity about how systems work—and how they can be broken. 
                This dual interest naturally led me to backend development with Python and Django, paired with a relentless 
                focus on cybersecurity.
              </p>
              <p>
                When I'm not writing robust REST APIs or managing relational databases, you'll find me in a terminal. 
                I actively practice networking, Linux administration, and penetration testing labs on platforms like 
                TryHackMe and Hack The Box to ensure the code I write isn't just functional, but hardened against threats.
              </p>
              <div className="pt-6">
                <div className="terminal-panel rounded-md overflow-hidden">
                  <div className="terminal-header px-4 py-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                    <span className="ml-2 font-mono text-xs text-muted-foreground">mehedi@kali:~</span>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <div className="text-muted-foreground">$ whoami</div>
                    <div className="text-primary mb-2">backend_dev_with_security_mindset</div>
                    <div className="text-muted-foreground">$ cat current_focus.txt</div>
                    <div className="text-foreground">Building scalable Django architectures & hunting vulnerabilities.</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SKILLS.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-border bg-card p-3 rounded-sm flex flex-col gap-1 hover:border-primary/50 transition-colors group"
                  >
                    <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors">{skill.category}</span>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* EDUCATION SECTION */}
        <Section id="education" title="Education & Certifications" titleNumber="02">
          <div className="grid sm:grid-cols-2 gap-6">
            {EDUCATION.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="terminal-panel rounded-md p-6 flex items-start gap-4"
              >
                <div className="p-2 bg-primary/10 rounded-sm">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-mono mt-1">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" title="Featured Projects" titleNumber="03">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col justify-between h-full terminal-panel rounded-md p-6 hover:-translate-y-2 transition-transform duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-2 bg-primary/10 rounded-sm">
                      {project.icon}
                    </div>
                    <div className="flex gap-3">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <li key={tech} className="font-mono text-[11px] text-primary bg-primary/5 px-2 py-1 rounded-sm border border-primary/20">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" title="What's Next?" titleNumber="04" className="mb-20">
          <div className="text-center max-w-2xl mx-auto terminal-panel rounded-md p-10 md:p-16 border-primary/30">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              I am currently looking for new opportunities as a Backend Developer. 
              Whether you have a question, a project idea, or just want to talk about cybersecurity, 
              my inbox is always open. I'll try my best to get back to you!
            </p>

            <ContactForm />

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap mt-10">
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono font-medium px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Say Hello
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-mono font-medium px-6 py-3 rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-mono font-medium px-6 py-3 rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-mono font-medium px-6 py-3 rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-6 justify-center items-center font-mono text-sm text-muted-foreground">
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {SOCIAL_LINKS.email}
              </a>
              {SOCIAL_LINKS.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-6 text-center text-sm font-mono text-muted-foreground border-t border-border bg-card">
        <p>Built with precision by Md. Mehedi Hasan</p>
        <p className="text-xs opacity-50 mt-1">Secured & Scalable</p>
      </footer>
    </div>
  );
}
