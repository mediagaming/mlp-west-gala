'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary/80 text-white py-6">
      <motion.div 
        className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-between gap-3 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg md:text-xl font-semibold">
          Higher Secondary Student&apos;s Gala
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          SSF Malappuram East District
        </p>
      </motion.div>
    </footer>
  );
}
