import { useNavigate } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      gap: "10px",
      zIndex: 1000
    }}>
      <button 
        onClick={() => navigate(-1)}
        className="btn"
        style={{
          padding: "10px 15px",
          background: "#1a1a1a",
          border: "2px solid #ff4655",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#ff4655";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1a1a1a";
          e.currentTarget.style.transform = "scale(1)";
        }}
        title="Atrás"
      >
        ← Atrás
      </button>
      
      <button 
        onClick={() => navigate(1)}
        className="btn"
        style={{
          padding: "10px 15px",
          background: "#1a1a1a",
          border: "2px solid #00d4ff",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#00d4ff";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1a1a1a";
          e.currentTarget.style.transform = "scale(1)";
        }}
        title="Adelante"
      >
        Adelante →
      </button>
    </div>
  );
}
