import { cn } from "@/lib/utils";

interface GoogleMapProps {
  className?: string;
  height?: string | number;
  grayscale?: boolean;
  title?: string;
}

export function GoogleMap({ 
  className, 
  height = "100%", 
  grayscale = false,
  title = "Clinic Location" 
}: GoogleMapProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl w-full", className)}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.112445851458!2d55.31934377610079!3d25.233159977685957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d0337da3073%3A0x8e83b8783457193b!2sDubai%20Healthcare%20City!5e0!3m2!1sen!2sae!4v1710520000000!5m2!1sen!2sae"
        width="100%"
        height={height}
        style={{ 
          border: 0, 
          filter: grayscale ? 'grayscale(1) contrast(1.1) brightness(0.9)' : 'none' 
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="transition-all duration-500 w-full"
      />
    </div>
  );
}
