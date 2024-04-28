import {RenderContext} from "axii";

export function LoadingLinearIcon({}, {createSVGElement: createElement}: RenderContext) {
    return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_518_15239" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64"
                  height="64">
                <circle cx="32" cy="32" r="32" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_518_15239)">
                <circle cx="32" cy="32" r="32" fill="#2A2C33"/>
                <g filter="url(#filter0_f_518_15239)">
                    <circle cx="47.5" cy="15.5" r="30.5" fill="url(#paint0_linear_518_15239)"/>
                </g>
                <g filter="url(#filter1_f_518_15239)">
                    <circle cx="17.5" cy="54.5" r="30.5" fill="url(#paint1_linear_518_15239)"/>
                </g>
            </g>
            <defs>
                <filter id="filter0_f_518_15239" x="-15" y="-47" width="125" height="125" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_518_15239"/>
                </filter>
                <filter id="filter1_f_518_15239" x="-45" y="-8" width="125" height="125" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_518_15239"/>
                </filter>
                <linearGradient id="paint0_linear_518_15239" x1="68.0086" y1="-24.4655" x2="38.0345" y2="37.0603"
                                gradientUnits="userSpaceOnUse">
                    <stop offset="1" stop-color="#1F43FE"/>
                </linearGradient>
                <linearGradient id="paint1_linear_518_15239" x1="38.0086" y1="14.5345" x2="8.03448" y2="76.0603"
                                gradientUnits="userSpaceOnUse">
                    <stop offset="1" stop-color="#7A04F0"/>
                </linearGradient>
            </defs>
        </svg>
    )
}
