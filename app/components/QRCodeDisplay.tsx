import { useEffect, useRef, useState } from 'react';

// Define a type for the QRCodeStyling instance
type QRCodeStylingType = any;

// Define types for QR code styling options
type DotType = 'square' | 'dots' | 'rounded' | 'classy';
type CornerSquareType = 'square' | 'extra-rounded' | 'dot';
type CornerDotType = 'square' | 'dot';
type ImagePositionType = 'center' | 'top' | 'bottom' | 'left' | 'right';
type ImagePaddingPresetType = 'none' | 'minimal' | 'standard';

interface QRCodeDisplayProps {
  contents: string;
  moduleColor: string;
  positionRingColor: string;
  positionCenterColor: string;
  size: number;
  patternStyle?: 'square' | 'dots' | 'rounded' | 'classy';
  cornerStyle?: 'square' | 'extra-rounded' | 'dot' | 'classy-rounded';
  maskXToYRatio?: number;
  image?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  onQRInstance?: (instance: any) => void;
  // New image control props
  imageSize?: number; // Size as coefficient (0-1)
  imageMargin?: number; // Margin around the image in pixels
  imagePosition?: ImagePositionType; // Position of the image
  imageBackgroundColor?: string; // Background color behind the image
  imageHideBackgroundDots?: boolean; // Whether to hide dots behind the image
  imageBackgroundSize?: number; // Size of the background behind the image (0-1)
  imageBackgroundBorderRadius?: number; // Border radius of the background behind the image (0-1)
  imageBackgroundOpacity?: number; // Opacity of the background behind the image (0-1)
  imagePaddingPreset?: ImagePaddingPresetType; // Preset padding options for the image
  // QR code background styling
  qrBackgroundPadding?: number; // Padding around the QR code in pixels
  qrBackgroundBorderRadius?: number; // Border radius of the QR code background in pixels
}

const QRCodeDisplay = ({
  contents,
  moduleColor,
  positionRingColor,
  positionCenterColor,
  size,
  patternStyle = 'square',
  cornerStyle = 'square',
  maskXToYRatio = 1,
  image,
  backgroundColor = 'transparent',
  errorCorrectionLevel = 'H', // Use highest error correction level by default for better scanning with logo
  onQRInstance,
  // Default values for new image control props
  imageSize = 0.2, // 20% of QR code size
  imageMargin = 0, // No margin by default
  imagePosition = 'center',
  imageBackgroundColor = 'transparent', // No background by default
  imageHideBackgroundDots = true,
  imageBackgroundSize = 0.22, // Just slightly larger than the image
  imageBackgroundBorderRadius = 0.1, // 10% of background size by default
  imageBackgroundOpacity = 0.9, // 90% opacity by default
  imagePaddingPreset = 'none', // No padding by default
  // QR code background styling
  qrBackgroundPadding = 0, // No padding by default
  qrBackgroundBorderRadius = 0 // No border radius by default
}: QRCodeDisplayProps) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStylingType | null>(null);

  // Apply padding preset settings
  useEffect(() => {
    // This effect will run when the padding preset changes
    // It will update the relevant properties based on the selected preset
    switch (imagePaddingPreset) {
      case 'none':
        // No padding - already set in defaults
        break;
      case 'minimal':
        // Minimal padding
        imageMargin = 2;
        imageBackgroundColor = 'white';
        imageBackgroundSize = 0.23; // Slightly larger than image
        break;
      case 'standard':
        // Standard padding
        imageMargin = 5;
        imageBackgroundColor = 'white';
        imageBackgroundSize = 0.25; // More padding around image
        break;
      default:
        // Default to no padding
        break;
    }
  }, [imagePaddingPreset]);

  // Map pattern style to qr-code-styling types
  const mapPatternStyle = (style: string): DotType => {
    switch (style) {
      case 'square': return 'square';
      case 'dots': return 'dots';
      case 'rounded': return 'rounded';
      case 'classy': return 'classy';
      default: return 'square';
    }
  };

  // Map corner style to qr-code-styling types for corner squares
  const mapCornerSquareStyle = (style: string): CornerSquareType => {
    switch (style) {
      case 'square': return 'square';
      case 'extra-rounded': return 'extra-rounded';
      case 'dot': return 'dot';
      // For 'rounded', use 'square' as fallback since it's not a valid CornerSquareType
      default: return 'square';
    }
  };

  // Map corner style to qr-code-styling types for corner dots
  const mapCornerDotStyle = (style: string): CornerDotType => {
    switch (style) {
      case 'square': return 'square';
      case 'dot': return 'dot';
      // For 'rounded' and 'extra-rounded', use 'square' as fallback
      default: return 'square';
    }
  };

  // Calculate image position based on the selected position type
  const calculateImagePosition = (position: ImagePositionType) => {
    switch (position) {
      case 'center': return { x: 0.5, y: 0.5 };
      case 'top': return { x: 0.5, y: 0.2 };
      case 'bottom': return { x: 0.5, y: 0.8 };
      case 'left': return { x: 0.2, y: 0.5 };
      case 'right': return { x: 0.8, y: 0.5 };
      default: return { x: 0.5, y: 0.5 };
    }
  };

  // Get padding settings based on the selected preset
  const getPaddingSettings = (preset: ImagePaddingPresetType) => {
    switch (preset) {
      case 'none':
        return {
          margin: 0,
          backgroundColor: 'transparent',
          backgroundSize: 0.22, // Just slightly larger than the image
        };
      case 'minimal':
        return {
          margin: 2,
          backgroundColor: 'white',
          backgroundSize: 0.23, // Slightly larger than image
        };
      case 'standard':
        return {
          margin: 5,
          backgroundColor: 'white',
          backgroundSize: 0.25, // More padding around image
        };
      default:
        return {
          margin: 0,
          backgroundColor: 'transparent',
          backgroundSize: 0.22,
        };
    }
  };

  // Create a custom extension for image positioning and styling
  const createCustomImageExtension = (
    position: ImagePositionType, 
    bgColor: string, 
    bgSize: number,
    borderRadius: number,
    bgOpacity: number,
    paddingPreset: ImagePaddingPresetType
  ) => {
    return (svg: SVGElement, options: any) => {
      if (!image) return; // Don't apply extension if no image is provided
      
      try {
        // Find the image element in the SVG
        const imageElement = svg.querySelector('image');
        if (!imageElement) return;
        
        // Get the SVG dimensions
        const { width, height } = options;
        
        // Calculate position
        const pos = calculateImagePosition(position);
        const x = width * pos.x;
        const y = height * pos.y;
        
        // Get padding settings based on preset
        const paddingSettings = getPaddingSettings(paddingPreset);
        
        // Calculate image size
        const imgSize = Math.min(width, height) * imageSize;
        const bgSizeValue = Math.min(width, height) * (paddingSettings.backgroundSize || bgSize);
        const bgRadius = bgSizeValue * borderRadius;
        
        // Create background circle/rectangle for the image if background color is provided
        const effectiveBgColor = paddingSettings.backgroundColor || bgColor;
        if (effectiveBgColor && effectiveBgColor !== 'transparent') {
          const bgElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          
          // Parse the background color to apply opacity
          let bgColorWithOpacity = effectiveBgColor;
          if (bgOpacity < 1 && effectiveBgColor.startsWith('#')) {
            // Convert hex to rgba
            const r = parseInt(effectiveBgColor.slice(1, 3), 16);
            const g = parseInt(effectiveBgColor.slice(3, 5), 16);
            const b = parseInt(effectiveBgColor.slice(5, 7), 16);
            bgColorWithOpacity = `rgba(${r}, ${g}, ${b}, ${bgOpacity})`;
          } else if (bgOpacity < 1 && effectiveBgColor.startsWith('rgb(')) {
            // Convert rgb to rgba
            bgColorWithOpacity = effectiveBgColor.replace('rgb(', 'rgba(').replace(')', `, ${bgOpacity})`);
          }
          
          const bgAttributes = {
            "fill": bgColorWithOpacity,
            "x": String(x - bgSizeValue / 2),
            "y": String(y - bgSizeValue / 2),
            "width": String(bgSizeValue),
            "height": String(bgSizeValue),
            "rx": String(bgRadius),
            "ry": String(bgRadius)
          };
          
          Object.keys(bgAttributes).forEach(attribute => {
            bgElement.setAttribute(attribute, bgAttributes[attribute as keyof typeof bgAttributes]);
          });
          
          // Insert background before the image
          if (imageElement.parentNode) {
            imageElement.parentNode.insertBefore(bgElement, imageElement);
          }
        }
        
        // Update image position and size
        imageElement.setAttribute('x', String(x - imgSize / 2));
        imageElement.setAttribute('y', String(y - imgSize / 2));
        imageElement.setAttribute('width', String(imgSize));
        imageElement.setAttribute('height', String(imgSize));
      } catch (error) {
        console.error("Error applying custom image extension:", error);
      }
    };
  };

  // Create QR code on client-side only
  useEffect(() => {
    let qrInstance: QRCodeStylingType | null = null;
    
    // Import the library dynamically on the client side
    const loadQRCode = async () => {
      if (!qrContainerRef.current) return;
      
      try {
        // Clear previous QR code
        if (qrContainerRef.current.firstChild) {
          qrContainerRef.current.innerHTML = '';
        }
        
        // Import the library dynamically
        const QRCodeStylingModule = await import('qr-code-styling');
        const QRCodeStyling = QRCodeStylingModule.default;
        
        // Get padding settings based on preset
        const paddingSettings = getPaddingSettings(imagePaddingPreset);
        
        // Create new QR code instance
        qrInstance = new QRCodeStyling({
          width: size,
          height: size,
          type: "svg",
          data: contents || "https://exon.dev",
          image: image,
          margin: 0, // Set margin to 0 as it's no longer configurable
          qrOptions: {
            errorCorrectionLevel: errorCorrectionLevel
          },
          dotsOptions: {
            color: moduleColor,
            type: mapPatternStyle(patternStyle)
          },
          cornersSquareOptions: {
            color: positionRingColor,
            type: mapCornerSquareStyle(cornerStyle)
          },
          cornersDotOptions: {
            color: positionCenterColor,
            type: mapCornerDotStyle(cornerStyle)
          },
          backgroundOptions: {
            color: backgroundColor,
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: paddingSettings.margin || imageMargin,
            hideBackgroundDots: imageHideBackgroundDots,
            imageSize: imageSize
          }
        });
        
        // Apply custom extension for image positioning if image is provided
        if (image) {
          const customExtension = createCustomImageExtension(
            imagePosition, 
            paddingSettings.backgroundColor || imageBackgroundColor, 
            paddingSettings.backgroundSize || imageBackgroundSize,
            imageBackgroundBorderRadius,
            imageBackgroundOpacity,
            imagePaddingPreset
          );
          qrInstance.applyExtension(customExtension);
        }
        
        // Append QR code to container
        qrInstance.append(qrContainerRef.current);
        setQrCode(qrInstance);
        
        // Pass the QR instance to parent component if callback is provided
        if (onQRInstance) {
          onQRInstance(qrInstance);
        }
      } catch (error) {
        console.error("Error loading QR code:", error);
      }
    };
    
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      loadQRCode();
    }
    
    // Cleanup function
    return () => {
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
      }
    };
  }, [
    contents, 
    moduleColor, 
    positionRingColor, 
    positionCenterColor, 
    size, 
    patternStyle, 
    cornerStyle, 
    image, 
    backgroundColor, 
    errorCorrectionLevel, 
    onQRInstance,
    imageSize,
    imageMargin,
    imagePosition,
    imageBackgroundColor,
    imageHideBackgroundDots,
    imageBackgroundSize,
    imageBackgroundBorderRadius,
    imageBackgroundOpacity,
    imagePaddingPreset
  ]);

  // Update QR code when props change
  useEffect(() => {
    if (!qrCode) return;

    try {
      // Get padding settings based on preset
      const paddingSettings = getPaddingSettings(imagePaddingPreset);
      
      // First update the QR code with standard options
      qrCode.update({
        data: contents || "https://exon.dev",
        image: image,
        width: size,
        height: size,
        qrOptions: {
          errorCorrectionLevel: errorCorrectionLevel
        },
        dotsOptions: {
          color: moduleColor,
          type: mapPatternStyle(patternStyle)
        },
        cornersSquareOptions: {
          color: positionRingColor,
          type: mapCornerSquareStyle(cornerStyle)
        },
        cornersDotOptions: {
          color: positionCenterColor,
          type: mapCornerDotStyle(cornerStyle)
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: paddingSettings.margin || imageMargin,
          hideBackgroundDots: imageHideBackgroundDots,
          imageSize: imageSize
        }
      });
      
      // Then apply custom extension for image positioning if image is provided
      if (image) {
        // Delete previous extension first
        qrCode.deleteExtension();
        
        // Apply new extension
        const customExtension = createCustomImageExtension(
          imagePosition, 
          paddingSettings.backgroundColor || imageBackgroundColor, 
          paddingSettings.backgroundSize || imageBackgroundSize,
          imageBackgroundBorderRadius,
          imageBackgroundOpacity,
          imagePaddingPreset
        );
        qrCode.applyExtension(customExtension);
      }
    } catch (error) {
      console.error("Error updating QR code:", error);
    }
  }, [
    qrCode,
    contents,
    moduleColor,
    positionRingColor,
    positionCenterColor,
    size,
    patternStyle,
    cornerStyle,
    image,
    backgroundColor,
    errorCorrectionLevel,
    imageSize,
    imageMargin,
    imagePosition,
    imageBackgroundColor,
    imageHideBackgroundDots,
    imageBackgroundSize,
    imageBackgroundBorderRadius,
    imageBackgroundOpacity,
    imagePaddingPreset
  ]);

  return (
    <div className="flex items-center justify-center shadow-lg">
      <div 
        style={{
          padding: qrBackgroundPadding > 0 ? `${qrBackgroundPadding}px` : 0,
          backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
          borderRadius: qrBackgroundBorderRadius > 0 ? `${qrBackgroundBorderRadius}px` : 0,
          display: 'inline-block'
        }}
      >
        <div 
          ref={qrContainerRef} 
          className="flex items-center justify-center"
          style={{
            width: `${size}px`,
            height: `${size}px`
          }}
        />
      </div>
    </div>
  );
};

export default QRCodeDisplay; 