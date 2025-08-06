import ContactForm from '@/components/sections/contactForm';
import { useTranslations } from 'next-intl';

interface ContactSectionProps {
    bgColor?: string;
}

export default function ContactSection({ bgColor }: ContactSectionProps) {
    const t = useTranslations('ContactForm');

    return (
    <div className={`mx-auto p-10  flex flex-col md:flex-row items-stretch gap-8 ${bgColor}`}>
        <div className="relative  bg-center flex-1 rounded-lg text-center md:text-left flex flex-col justify-center h-auto" 
        style = {{ backgroundImage: "url(/images/contact/background.jpg)", }}>
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-0 rounded-lg" aria-hidden= "true"></div>
        {/* CONTENT INSIDE THE OVERLAY */}
        <div className="p-10 relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-8">
                {t('title')}
            </h3>
            <p className="text-white/80 mb-4">
                {t('desc1')}
            </p>
            <p className="text-white/80 mb-4 flex-1">
                {t('desc2')}
            </p>
        </div>
        </div>

        <div className = "flex-1 h-full">
            <ContactForm />
        </div>
    </div>

        );
}