import React, { useEffect, useRef } from 'react';
import '@vaadin/rich-text-editor';                    // <-- Web‑component import

export default function VaadinRichTextEditorWrapper({ value, onChange }) {
  const editorRef = useRef(null);

  // keep external value in sync with the editor
  useEffect(() => {
    if (editorRef.current) editorRef.current.value = value ?? '';
  }, [value]);

  return (
    <vaadin-rich-text-editor
      ref={editorRef}
      style={{ width: '100%', minHeight: 140 }}
      value={value}
      onValueChanged={e => onChange(e.target.value)}
    />
  );
}
