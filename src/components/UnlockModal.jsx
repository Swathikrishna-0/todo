import { motion, AnimatePresence } from "framer-motion";

export default function UnlockModal({ open, onClose, item }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      {open && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            className="modal"
            onClick={(e)=>e.stopPropagation()}
            initial={{ scale: .9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: .9, opacity: 0 }}
          >
            <h3 style={{marginTop:0}}>Unlocked 🎉</h3>
            <div style={{
              marginTop:10, border:'1px solid #2b3147', borderRadius:12, padding:12,
              display:"grid", gap:10, justifyItems:"center", background:"#0f1632"
            }}>
              <div style={{
                width:"100%", maxWidth:520, height:220, borderRadius:12,
                border:"1px solid #24304a", display:"grid", placeItems:"center",
                background:"#11182a", overflow:"hidden"
              }}>
                {item.img
                  ? <img src={item.img} alt={item.name} style={{maxWidth:"100%", maxHeight:"100%", objectFit:"contain"}} />
                  : <div style={{fontSize:64}}>{item.type === "bike" ? "🏍️" : item.type === "car" ? "🏎️" : "🎮"}</div>
                }
              </div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center"}}>
                <span className="badge">{item.type.toUpperCase()}</span>
                <span className="badge">{item.tier}</span>
                <span className="badge">Owned ✅</span>
              </div>
              <div style={{fontWeight:800, fontSize:18}}>{item.name}</div>
              <div style={{fontSize:13, color:"#9badc6"}}>Added to your Garage collection.</div>
            </div>

            <div style={{display:"flex", justifyContent:"flex-end", marginTop:12}}>
              <button className="btn" onClick={onClose}>Nice! 🚀</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
