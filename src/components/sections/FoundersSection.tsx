"use client";
import Image from "next/image";

interface FounderMessageProps {
  src: string;
  alt: string;
  message: string;
  isLeft: boolean;
}

const FounderMessage: React.FC<FounderMessageProps> = ({ src, alt, message, isLeft }) => {
  return (
    <div className={`flex items-start ${isLeft ? "justify-start" : "justify-end"}`}>
      {isLeft && (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="rounded-full border-2 border-indigo-500"
        />
      )}
      <div
        className={`relative max-w-[60%] px-6 py-4 mx-4 bg-white rounded-2xl shadow-lg
          ${isLeft ? "rounded-bl-none" : "rounded-br-none"}`}
      >
        <p className="text-gray-800 leading-relaxed">{message}</p>
        <span
          className={`absolute bottom-0 w-4 h-4 bg-white shadow-lg
            ${isLeft ? "-left-2 rotate-45 origin-top-left" : "-right-2 rotate-45 origin-top-right"}`}
        />
      </div>
      {!isLeft && (
        <Image
          src={src}
          alt={alt}
          width={64}
          height={64}
          className="rounded-full border-2 border-indigo-500"
        />
      )}
    </div>
  );
};

const ChatMessagesSection: React.FC = () => {
  const messages = [
    {
      src: "/images/about/othon2.png",
      alt: "Othon Ansatuña",
      message:
        "Trabajamos mano a mano con fabricantes y distribuidores líderes en Asia, América, Europa y Reino Unido para ofrecer productos de alta rotación, con márgenes competitivos y distribución eficiente.",
      isLeft: true,
    },
    {
      src: "/images/about/jhonny2.png",
      alt: "Jhonatan",
      message:
        "Queremos ser el socio estratégico de tu negocio, brindándote acceso inmediato a más de 300 productos internacionales y un canal de distribución global sin complicaciones.",
      isLeft: false,
    },
  ];

  return (
    <section className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-50 to-white rounded-3xl shadow-xl">
      <h2 className="text-center text-4xl font-extrabold text-indigo-600 mb-10">
        Mensajes de Nuestros Fundadores
      </h2>
      <div className="space-y-8">
        {messages.map((msg, idx) => (
          <FounderMessage key={idx} {...msg} />
        ))}
      </div>
    </section>
  );
};

export default ChatMessagesSection;
