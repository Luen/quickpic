"use client";
import { useState, useEffect } from "react";
import { UploadBox } from "@/components/shared/upload-box";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

function RemoveBackgroundToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const { imageContent, imageMetadata, handleFileUploadEvent, cancel } =
    props.fileUploaderProps;

  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageContent && imageMetadata) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          // Draw the original image
          ctx.drawImage(img, 0, 0);
          
          // Get image data for processing
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Simple background removal algorithm
          // This is a basic implementation that makes white/near-white pixels transparent
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i] || 0;
            const g = data[i + 1] || 0;
            const b = data[i + 2] || 0;
            
            // Check if the pixel is white or near-white
            if (r > 240 && g > 240 && b > 240) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }
          
          // Put the processed image data back on the canvas
          ctx.putImageData(imageData, 0, 0);
          
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL("image/png");
          setProcessedImageUrl(dataUrl);
        }
      };
      img.src = imageContent;
    } else {
      setProcessedImageUrl(null);
    }
  }, [imageContent, imageMetadata]);

  const handleSaveImage = () => {
    if (processedImageUrl && imageMetadata) {
      const link = document.createElement("a");
      link.href = processedImageUrl;
      const originalFileName = imageMetadata.name;
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;
      link.download = `${fileNameWithoutExtension}-bg-removed.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    }
  };

  if (!imageMetadata) {
    return (
      <UploadBox
        title="Remove image backgrounds easily. Fast and free."
        subtitle="Works best with images that have a solid background"
        description="Upload Image"
        accept="image/*"
        onChange={handleFileUploadEvent}
      />
    );
  }

  return (
    <div style={{
      margin: '0 auto',
      display: 'flex',
      maxWidth: '32rem',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '1.5rem'
    }}>
      {/* Preview Section */}
      <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        borderRadius: 'var(--radius)'
      }}>
        {processedImageUrl && (
          <div style={{
            backgroundColor: 'rgba(200, 200, 200, 0.2)',
            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            padding: '0.5rem',
            borderRadius: 'var(--radius)',
            overflow: 'hidden'
          }}>
            <img 
              src={processedImageUrl} 
              alt="Preview with background removed" 
              style={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                marginBottom: '1rem'
              }} 
            />
          </div>
        )}
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--foreground)'
        }}>
          {imageMetadata.name}
        </p>
      </div>

      {/* Size Information */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        fontSize: '0.875rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.75rem',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--secondary)'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--foreground)',
            opacity: 0.6
          }}>Image Size</span>
          <span style={{
            fontWeight: 500,
            color: 'var(--foreground)'
          }}>
            {imageMetadata.width} × {imageMetadata.height}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.75rem'
      }}>
        <button
          onClick={cancel}
          className="btn-danger"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSaveImage}
          className="btn-success"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}

export function RemoveBackgroundTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp"]}
      dropText="Drop image file"
    >
      <RemoveBackgroundToolCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
} 