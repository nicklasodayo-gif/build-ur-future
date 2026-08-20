import React from "react";

export default function Help({ onClose }: any) {
  return (
    <div className="modal-backdrop" onClick={onClose}><div className="help-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={onClose}>×</button><h3>How it works</h3><p>Build your city, face challenges and discover careers worth exploring.</p></div></div>
  );
}
