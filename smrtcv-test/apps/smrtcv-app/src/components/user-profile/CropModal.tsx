
"use client";

import { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropModalProps {
  src: string;
  onConfirm: (croppedImage: Blob) => void;
  onCancel: () => void;
}

export default function CropModal({ src, onConfirm, onCancel }: CropModalProps) {
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImg = () => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const croppedWidth = crop.width * scaleX;
    const croppedHeight = crop.height * scaleY;
    canvas.width = croppedWidth;
    canvas.height = croppedHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onConfirm(blob);
        }
      },
      'image/jpeg',
      0.95
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Crop Your Photo</h2>
        <div className="flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            circularCrop
            aspect={1}
          >
            <img ref={imgRef} src={src} alt="Source" style={{ maxHeight: '70vh' }} />
          </ReactCrop>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-6 py-2 text-white rounded bg-[#1A91F0] hover:bg-[#0068BB]"
            onClick={getCroppedImg}
          >
            Use Photo
          </button>
          <button
            className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
