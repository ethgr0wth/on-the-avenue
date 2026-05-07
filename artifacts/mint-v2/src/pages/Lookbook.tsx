import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LOOKBOOK } from "@/lib/data";
import { PageHero } from "@/components/Layout";
import { LUXURY_EASE, fadeUp } from "@/lib/motion";

export default function Lookbook() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="The Archive"
        title={<>Curated <em className="font-display-italic text-accent">gallery.</em></>}
        copy="A masonry collection of our latest botanical color work, precision cuts, and editorial styling."
      />

      <section className="py-24 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {LOOKBOOK.map((item, i) => (
            <motion.div 
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="overflow-hidden bg-muted">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out" 
                />
              </div>
              <div className="mt-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-sans text-sm font-medium">{item.title}</p>
                <p className="micro-label text-accent">{item.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-foreground hover:text-accent transition-colors z-50">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE as any }}
              src={selectedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-full object-contain shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
