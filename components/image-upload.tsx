"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageUploadProps {
  // Now we pass the File or null
  value: File | string | null; 
  onChange: (file: File | null) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview URL
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    onChange(file); // Pass the raw file up to the form
  };

  return (
    <div className="w-full flex justify-center">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div key="preview" className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <button onClick={() => { onRemove(); setPreview(null); }} className="absolute top-2 right-2 bg-white p-1 rounded-full text-destructive shadow">
              <X size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.label key="upload" className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
            <Upload className="text-slate-400 mb-2" />
            <span className="text-sm font-medium text-slate-500">Select Image</span>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}