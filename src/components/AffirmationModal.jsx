import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function AffirmationModal({ open, onClose, text, imageUrl }) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { setLoaded(false); }, [imageUrl]);

  return (
    <AnimatePresence>
      {open && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            className="modal modal-wide"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
          >
            {/* Big square GIF backdrop */}
            {imageUrl && (
              <div className="affirm-media">
                <div
                  className="affirm-media-cover"
                  style={{ backgroundImage: `url("${imageUrl}")`, opacity: loaded ? 1 : 0 }}
                />
                <img
                  src={imageUrl}
                  alt="celebration"
                  onLoad={() => setLoaded(true)}
                  style={{ display: "none" }}
                />

                {/* Overlay text banner */}
                <div className="affirm-overlay">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {text}
                  </motion.div>
                </div>
              </div>
            )}

            <div style={{display:"flex", justifyContent:"flex-end", marginTop:12}}>
              <button className="btn" onClick={onClose}>Keep going 🚀</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
