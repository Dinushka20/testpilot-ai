import { Link } from "react-router-dom";
import { ArrowRight, Bot, ShieldCheck, Zap, Code } from "lucide-react";
export default function Landing() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        
        <div className="pill-badge">
          ✨ TestPilot AI v1.0 is now live
        </div>

        <h1 className="hero-title">
          Automate API Testing <br />
          <span className="text-gradient">with Local AI.</span>
        </h1>
        
        <p className="hero-subtitle">
          Upload your OpenAPI specifications and let LLaMA 3 instantly generate comprehensive, accurate test cases. Zero cloud dependency. 100% private.
        </p>
        
        <div className="hero-buttons">
          <Link to="/dashboard" className="btn btn-primary">
            Start Generating <ArrowRight size={18} />
          </Link>
          <a href="#" className="btn btn-secondary">
            <Code size={18} /> View Source
          </a>
        </div>
      </div>

<div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem', maxWidth: '1200px', width: '100%', zIndex: 10 }}>
        <div className="card" style={{ textAlign: 'left', marginBottom: 0 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}><Bot size={24} /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Local LLM Engine</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Powered directly by Ollama running on your hardware. No API keys or rate limits.
          </p>
        </div>
        
        <div className="card" style={{ textAlign: 'left', marginBottom: 0 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}><Zap size={24} /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Lightning Fast</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Instantly parses complex Swagger files and maps endpoints to AI-generated testing suites.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'left', marginBottom: 0 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}><ShieldCheck size={24} /></div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Enterprise Privacy</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Your API structures and business logic never leave your machine. Total security.
          </p>
        </div>
      </div>
    </div>
  );
}