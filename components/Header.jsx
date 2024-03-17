import { hoverElement, unHoverElement } from '@/components/Cursor';

export default function Header(){
    return (
        <header>
            <section className="background">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 450" opacity="0.85">
                <defs>
                    <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feGaussianBlur stdDeviation="55" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <ellipse rx="126.5" ry="87.5" cx="56.98706735998894" cy="242.80499032334615" fill="#e090d3ff"></ellipse>
                    <ellipse rx="126.5" ry="87.5" cx="711.6251702698322" cy="55.567017488560396" fill="hsl(25, 100%, 64%)"></ellipse>
                </g>
                </svg>
            </section>

            <h1 class="titre" onMouseEnter={() => hoverElement('texts')} onMouseLeave={() => unHoverElement()}>
                PORTFOLIO
                <span>Marine Sicaud</span>
            </h1>

            <a href='#projets' className="scroll-down" onMouseEnter={() => hoverElement('links')} onMouseLeave={() => unHoverElement()}></a>
        </header>
    )
}