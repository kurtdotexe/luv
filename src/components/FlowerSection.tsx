import { useEffect, useState } from 'react';

const flowers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface FloatingFlower {
  id: number;
  image: number;
  leftPct: number;
  topPct: number;
  size: number;
  animDuration: number;
  animDelay: number;
  initialRotation: number;
  zIndex: number;
  opacity: number;
}

export default function FlowerSection() {
  const [floatingFlowers, setFloatingFlowers] = useState<FloatingFlower[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const generateFlowers = () => {
      const generated: FloatingFlower[] = [];
      const count = 45; // 🌸 adjust this for density — 30–50 looks great
      for (let i = 0; i < count; i++) {
        generated.push({
          id: i,
          image: flowers[Math.floor(Math.random() * flowers.length)],
          leftPct: Math.random() * 100,
          topPct: Math.random() * 100,
          size: 60 + Math.random() * 160,
          animDuration: 10 + Math.random() * 20,
          animDelay: Math.random() * 6,
          initialRotation: -40 + Math.random() * 80,
          zIndex: Math.random() > 0.5 ? 1 : 2,
          opacity: 0.25 + Math.random() * 0.7,
        });
      }
      return generated;
    };

    setFloatingFlowers(generateFlowers());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-black overflow-hidden py-20 px-6 md:px-12 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Cormorant+Garamond:wght@300;400;500&display=swap');

        @keyframes subtle-breathe-rotate {
          0% {
            transform: rotate(-6deg) scale(0.96);
            opacity: 0.9;
          }
          50% {
            transform: rotate(6deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: rotate(-6deg) scale(0.96);
            opacity: 0.9;
          }
        }

        @keyframes gentle-glow {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(255,220,235,0.18));
          }
          50% {
            filter: drop-shadow(0 0 28px rgba(255,220,235,0.35));
          }
        }

        .flower-wrapper {
          position: fixed;
          pointer-events: none;
          will-change: transform, opacity, filter;
        }

        .flower-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform-origin: center;
        }

        .text-section {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 1px;
          line-height: 1.8;
        }
      `}</style>

      {/* 🌸 Beautiful randomized flowers filling the viewport */}
      {floatingFlowers.map((flower) => (
        <div
          key={flower.id}
          className="flower-wrapper"
          style={{
            left: `${flower.leftPct}%`,
            top: `${flower.topPct}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            transform: `translate(-50%, -50%) rotate(${flower.initialRotation}deg)`,
            zIndex: flower.zIndex,
            opacity: flower.opacity,
          }}
        >
          <img
            src={`/${flower.image}.png`}
            alt={`Flower ${flower.image}`}
            className="flower-img"
            style={{
              animation: `
                subtle-breathe-rotate ${flower.animDuration}s ease-in-out ${flower.animDelay}s infinite,
                gentle-glow 6s ease-in-out ${flower.animDelay}s infinite
              `,
            }}
          />
        </div>
      ))}

      {/* 💌 Text content card */}
      <div className="relative z-20 max-w-4xl mx-auto">
        <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-12 md:p-16 border border-white/10 shadow-2xl">
          <div className="text-section text-white text-lg md:text-2xl font-light leading-relaxed text-justify space-y-6">
            <p>I still remember the first time I met you, back when we were just classmates, sharing the same room, when your laughter filled the air during what was supposed to be our free time. You were only fourteen then, and fifteen when we started talking. I remember thinking I had entered your world too late, that I would only observe fragments of your growth. But I was wrong. Even though I missed your earliest stages, I still got to witness you bloom, and that was more than enough. Life gave me more of your presence than I ever expected, and I will always be grateful for that.</p>
            <p>Looking back, it seems so insane to me that our smallest actions lead to this very moment. From those targeted ig notes to our first irl conversations, and then to those dx training days that finally allowed me to finally be comfortable to talk to you not just through chats, each of those encounters made our bond grow stable and strong. Without them, I don't think my scared ass would have ever had a chance. Those days may seem ordinary, but to me those will always be the most unforgettable ones.
</p>
            <p>Since then, I have watched you grow into someone beautiful and resilient. There is a steady beauty in you that even time cannot erode, and a kindness that never loses its color. That was what caught me from the very beginning, and maybe that is what has kept me all this time. Your heart glows with a light I could never turn away from, and I know I never will. You may have heard me before saying that I am drawn to things as if by gravity, but this feels different. It feels like I am being pulled into a singularity, yet it cannot be, because the light you carry shines far too bright within it.</p>
            <p>And through all of it, one thing has never changed. I love you. You already know that, but it still feels right to say it again, to let the words come out once more. I love you for your warmth, for the way you help others grow just by being near them, and for how you stay rooted in who you are no matter how far life takes you. You have changed my life in ways words can barely hold.</p>
            <p>Now that you are eighteen, standing at the threshold of a something new, I hope the world offers you every bloom you deserve. May your dreams unfold like petals responding to light, one by one, each following its natural rhythm. As you begin this new chapter, I hope that you'd never forget who you are. You are rare. You are full of beauty. You are loved. </p>
            <p>And as we grow older, I look forward to all the special days still ahead of us. I want to see how your story continues to grow, and I hope I can be there for each one. College will come soon, and I know it might change many things, but I hope it will never change what we have. No matter where we go or how much time passes, I will always choose you.</p>
            <p>Again, happy birthday. I love you, always, in all ways.</p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </div>
  );
}
