import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

export const EASE = "power3.out";
export const EASE_IN_OUT = "power3.inOut";
export const DUR = { fast: 0.4, base: 0.9, slow: 1.4 } as const;

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP };
