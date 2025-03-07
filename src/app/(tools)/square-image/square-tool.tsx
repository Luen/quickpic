"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";
import { useEffect, useState } from "react";

type BackgroundOption = "white" | "black" | "transparent";

function SquareToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const { imageContent, imageMetadata, handleFileUploadEvent, cancel } =
    props.fileUploaderProps;

  const [backgroundColor, setBackgroundColor] = useLocalStorage<BackgroundOption>(
    "squareTool_backgroundColor", 
    "white"
  );

  const [squareImageContent, setSquareImageContent] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (imageContent && imageMetadata) {
      const canvas = document.createElement("canvas");
      const size = Math.max(imageMetadata.width, imageMetadata.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas first (important for transparency)
      ctx.clearRect(0, 0, size, size);

      // Fill background if not transparent
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);
      }

      // Load and center the image
      const img = new Image();
      img.onload = () => {
        const x = (size - imageMetadata.width) / 2;
        const y = (size - imageMetadata.height) / 2;
        ctx.drawImage(img, x, y);
        setSquareImageContent(canvas.toDataURL("image/png"));
      };
      img.src = imageContent;
    }
  }, [imageContent, imageMetadata, backgroundColor]);

  const handleSaveImage = () => {
    if (squareImageContent && imageMetadata) {
      const link = document.createElement("a");
      link.href = squareImageContent;
      const originalFileName = imageMetadata.name;
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;
      link.download = `${fileNameWithoutExtension}-squared.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!imageMetadata) {
    return (
      <UploadBox
        title="Create square images with custom backgrounds. Fast and free."
        subtitle="Allows pasting images from clipboard"
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
      <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        borderRadius: 'var(--radius)'
      }}>
        {squareImageContent && (
          <div style={{
            backgroundColor: backgroundColor === "transparent" ? "rgba(200, 200, 200, 0.2)" : "transparent",
            backgroundImage: backgroundColor === "transparent" ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)" : "none",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            padding: '0.5rem',
            borderRadius: 'var(--radius)',
            overflow: 'hidden'
          }}>
            <img 
              src={squareImageContent} 
              alt="Preview" 
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
          }}>Original</span>
          <span style={{
            fontWeight: 500,
            color: 'var(--foreground)'
          }}>
            {imageMetadata.width} × {imageMetadata.height}
          </span>
        </div>

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
          }}>Square Size</span>
          <span style={{
            fontWeight: 500,
            color: 'var(--foreground)'
          }}>
            {Math.max(imageMetadata.width, imageMetadata.height)} ×{" "}
            {Math.max(imageMetadata.width, imageMetadata.height)}
          </span>
        </div>
      </div>

      <OptionSelector
        title="Background Color"
        options={["white", "black", "transparent"]}
        selected={backgroundColor}
        onChange={setBackgroundColor}
        formatOption={(option) =>
          option.charAt(0).toUpperCase() + option.slice(1)
        }
      />

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
          onClick={() => {
            handleSaveImage();
          }}
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

export function SquareTool() {
  const fileUploaderProps = useFileUploader();

  return (
    <FileDropzone
      setCurrentFile={fileUploaderProps.handleFileUpload}
      acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"]}
      dropText="Drop image file"
    >
      <SquareToolCore fileUploaderProps={fileUploaderProps} />
    </FileDropzone>
  );
}
