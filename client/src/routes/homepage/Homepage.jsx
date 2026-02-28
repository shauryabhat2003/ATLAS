import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import ParticleBackground from "../../components/particleBackground/ParticleBackground";

const Homepage = () => {
  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#08080f] text-white font-display antialiased">

      {/* Dynamic Canvas Background */}
      <ParticleBackground />

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#08080f]/50 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Atlas" className="size-8 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-black tracking-tight uppercase group-hover:text-brandBlue transition-colors">ATLAS</span>
        </Link>
        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-brandBlue to-brandPink text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-brandPink/20 hover:scale-105 transition-transform">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="bg-gradient-to-r from-brandBlue to-brandPink text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-brandPink/20 hover:scale-105 transition-transform">
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Floating Glass Preview (Decoration) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl opacity-20 -z-10 transform -rotate-2"></div>

        <div className="text-center z-10 max-w-4xl">
          {/* Version Tag */}
          {/* <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase text-brandBlue animate-pulse">
            Version 2.0 Now Live
          </div> */}

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            <span className="bg-gradient-to-r from-brandBlue to-brandPink bg-clip-text text-transparent">ATLAS</span>
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-gray-400 mb-4 tracking-tight">Your everyday AI assistant for chat, image generation, and more.</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Innovate. Develop. Repeat. Unlocking potential, one breakthrough at a time. Every step forward is a leap towards a brighter future. Let's transform today and shape tomorrow.
          </p>

          {/* CTA Block */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SignedIn>
                <Link to="/dashboard" className="bg-gradient-to-r from-brandBlue to-brandPink px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-brandBlue/30 hover:shadow-brandPink/40">
                  Enter Workspace
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-brandBlue to-brandPink px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl shadow-brandBlue/30 hover:shadow-brandPink/40">
                    Get Started Now
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* <SignInButton mode="modal">
                <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-lg font-bold hover:bg-white/10 transition-colors">
                  View Demo
                </button>
              </SignInButton> */}
            </div>
            {/* <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mt-2">No credit card required</p> */}
          </div>
        </div>

        {/* Floating Chat Preview Card */}
        <div className="mt-20 relative w-full max-w-lg bg-white/[0.03] backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 animate-float">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brandBlue to-brandPink shrink-0 shadow-lg shadow-brandBlue/20"></div>
              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300 border border-white/5">
                How can I optimize my deployment workflow today?
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-brandBlue/20 p-3 rounded-2xl rounded-tr-none text-sm text-white border border-brandBlue/30 shadow-inner">
                Atlas suggests: Initialize CI/CD pipelines with our pre-built GitHub actions.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10" id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 p-8 hover:border-brandBlue/50 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-brandBlue/10 flex items-center justify-center group-hover:bg-brandBlue/20 transition-colors">
              <svg className="w-6 h-6 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Ask Anything</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Get instant, helpful answers to any question with Gemini 2.5 Flash.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 p-8 hover:border-brandPink/50 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-brandPink/10 flex items-center justify-center group-hover:bg-brandPink/20 transition-colors">
              <svg className="w-6 h-6 text-brandPink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Generate Images</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Create stunning visuals from simple text descriptions.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 p-8 hover:border-white/40 transition-colors group">
            <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Analyze Data</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Upload files or images for deep insights and summaries.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 relative z-10 bg-[#08080f]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            {/* <div className="w-6 h-6 flex items-center justify-center bg-gray-500 rounded-sm"> */}
            {/* <svg className="w-4 h-4 text-[#08080f]" fill="currentColor" viewBox="0 0 24 24"> */}
            {/* <path d="M12 2L2 19.77h20L12 2zm0 4.6l6.43 11.37H5.57L12 6.6z"></path> */}
            {/* </svg> */}
            {/* </div> */}
            © shauryabhat2003
          </div>
          {/* <div className="flex items-center gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-gray-700">|</span>
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div> */}
          <div className="flex gap-4">
            <a className="text-gray-500 hover:text-white transition-colors" href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a className="text-gray-500 hover:text-white transition-colors" href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Homepage;
