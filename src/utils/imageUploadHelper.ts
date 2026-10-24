/**
 * High-performance client-side image compression and upload helper.
 * Compresses images via HTML Canvas before transmission to eliminate localStorage QuotaExceededError
 * and uploads to server /public/uploads/ for permanent, lightweight static asset URLs.
 */

export interface UploadResult {
  url: string;
  success: boolean;
  filename?: string;
  error?: string;
}

/**
 * Compresses an image file using an offscreen HTML Canvas.
 * Reduces 5MB-15MB phone camera photos down to ~120KB-250KB crisp JPEG.
 */
export function compressImage(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image from file'));
      img.onload = () => {
        let { width, height } = img;

        // Proportional scale down if larger than max boundaries
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context fails
          resolve(e.target?.result as string);
          return;
        }

        // High quality bicubic image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file to the backend /api/upload endpoint.
 * Fallback to compressed base64 DataURL if server is unreachable (static export mode).
 */
export async function uploadImageFile(file: File): Promise<UploadResult> {
  try {
    let payloadData: string;
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (isImage) {
      // 1. Compress image client-side first
      payloadData = await compressImage(file, 1600, 1600, 0.85);
    } else if (isVideo) {
      if (file.size > 30 * 1024 * 1024) {
        return {
          url: '',
          success: false,
          error: 'Video file size exceeds 30MB limit. Please use a smaller clip or video URL.',
        };
      }
      payloadData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else {
      return {
        url: '',
        success: false,
        error: 'Unsupported file format. Please select an image (JPG, PNG, WEBP) or MP4 video.',
      };
    }

    // 2. Attempt to upload to server /api/upload
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: payloadData,
          filename: file.name,
          mimeType: file.type || 'image/jpeg',
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          return {
            url: json.url,
            success: true,
            filename: json.filename,
          };
        }
      }
    } catch (serverErr) {
      console.warn('[Upload Server Offline / Fallback to client base64]:', serverErr);
    }

    // 3. Fallback: Return compressed base64 if server /api/upload was not reachable
    return {
      url: payloadData,
      success: true,
      filename: file.name,
    };
  } catch (err: any) {
    return {
      url: '',
      success: false,
      error: err.message || 'Image processing failed',
    };
  }
}
