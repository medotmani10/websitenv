'use client';

import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  onClose: () => void;
}

export default function ImageGallery({ images, title, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-6xl max-h-full p-4">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
        >
          ✕
        </button>

        {/* عداد الصور */}
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>

        {/* الصورة الرئيسية */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${title} - صورة ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuOCteODvOOCuOOBjOiqreOBv+i+vOOBvuOBvuOBm+OCk+OBp+OBl+OBnw==</text></svg>';
            }}
          />

          {/* أزرار التنقل */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* مصغرات الصور */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`مصغرة ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7jgpXjg7zjgrjjgYzjqq3jgb/ovrzjgb7jgb7jgZvjgpPjgafjgZfjgZ8=</text></svg>';
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* معلومات الصورة */}
        <div className="absolute bottom-20 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded max-w-md">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm opacity-90">صورة {currentIndex + 1} من {images.length}</p>
        </div>
      </div>

      {/* التحكم بلوحة المفاتيح */}
      <div
        className="absolute inset-0"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') nextImage();
          if (e.key === 'ArrowLeft') prevImage();
          if (e.key === 'Escape') onClose();
        }}
        tabIndex={0}
      />
    </div>
  );
}
