import { useEffect, useState } from "react";
import api from "../services/api";
import { UploadCloud, Save, Sparkles, Server, Plus, Activity } from "lucide-react";

interface TestCase { description: string; expectedStatus: string; }
interface Endpoint { method: string; path: string; testCases: TestCase[]; }

export default function Dashboard() {
  const [backendMessage, setBackendMessage] = useState("Connecting...");
  const [file, setFile] = useState<File | null>(null);
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  useEffect(() => {
    api.get("/").then((res) => {
      const msg = res.data.message || (typeof res.data === 'string' ? "Backend Online 🚀" : "Connected");
      setBackendMessage(msg);
    }).catch(() => setBackendMessage("Backend offline"));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { setFile(e.target.files[0]); setError(null); }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file.");
    setLoading(true); setError(null);
    const formData = new FormData(); formData.append("swagger", file);
    try {
      const res = await api.post("/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.success) {
        setEndpoints(res.data.endpoints.map((ep: any) => ({ ...ep, testCases: [] })));
      }
    } catch (err: any) { setError(err.response?.data?.message || "Upload failed."); } 
    finally { setLoading(false); }
  };

  const handleSaveToDatabase = async () => {
    try {
      const res = await api.post("/api/projects/save", { endpoints });
      if (res.data.success) alert("Successfully saved to database!");
    } catch (err) { alert("Failed to save."); }
  };

  const handleGenerateAITests = async (index: number, method: string, path: string) => {
    setGeneratingIndex(index);
    try {
      const res = await api.post("/api/ai/generate", { method, path });
      if (res.data.success) {
        const updated = [...endpoints];
        updated[index].testCases = [...updated[index].testCases, ...res.data.testCases];
        setEndpoints(updated);
      }
    } catch (err) { alert("AI Generation failed."); } 
    finally { setGeneratingIndex(null); }
  };

  return (
    <div className="dashboard-layout">
      
      {/* Sidebar Controls */}
      <aside>
        <div className="card">
          <h3><Activity size={18} className="text-primary" /> System Status</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Server size={16} /> {backendMessage}
          </p>
        </div>

        <div className="card">
          <h3><UploadCloud size={18} /> Data Source</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Upload your OpenAPI specification to begin.
          </p>
          <input type="file" accept=".json" onChange={handleFileChange} />
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleUpload} disabled={loading}>
            {loading ? "Analyzing API..." : "Extract Endpoints"}
          </button>
          {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>{error}</p>}
        </div>

        {endpoints.length > 0 && (
          <div className="card">
            <h3>Database</h3>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleSaveToDatabase}>
              <Save size={18} /> Commit to MongoDB
            </button>
          </div>
        )}
      </aside>

      {/* Main Workspace */}
      <main>
        {endpoints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-muted)' }}>
            <UploadCloud size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <h2>No API Loaded</h2>
            <p>Your workspace is empty. Upload a Swagger file to populate endpoints.</p>
          </div>
        ) : (
          <>
            <h2 style={{ marginBottom: '1.5rem' }}>Endpoint Configuration ({endpoints.length})</h2>
            
            {endpoints.map((ep, index) => (
              <div key={index} className="endpoint-card">
                <div className="endpoint-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`method-badge tag-${ep.method.toLowerCase()}`}>{ep.method}</span> 
                    <span className="endpoint-path">{ep.path}</span>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleGenerateAITests(index, ep.method, ep.path)} disabled={generatingIndex === index}>
                    <Sparkles size={14} /> {generatingIndex === index ? "Generating..." : "AI Generate"}
                  </button>
                </div>

                {ep.testCases.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    {ep.testCases.map((test, tIndex) => (
                      <div key={tIndex} className="test-case">
                        <span className="status-code">{test.expectedStatus}</span> 
                        <span style={{ fontSize: '0.95rem' }}>{test.description}</span>
                      </div>
                    ))}
                  </div>
                )}

                <form style={{ display: 'flex', gap: '1rem' }} onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const updated = [...endpoints];
                    updated[index].testCases.push({
                      description: (form.elements.namedItem('desc') as HTMLInputElement).value,
                      expectedStatus: (form.elements.namedItem('status') as HTMLInputElement).value
                    });
                    setEndpoints(updated);
                    form.reset();
                }}>
                  <input type="text" name="desc" placeholder="Describe manual test case..." style={{ flex: 1, margin: 0 }} required />
                  <input type="text" name="status" placeholder="Status (e.g. 200)" style={{ width: '150px', margin: 0 }} required />
                  <button type="submit" className="btn btn-secondary" style={{ padding: '0.75rem' }}><Plus size={18} /></button>
                </form>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}