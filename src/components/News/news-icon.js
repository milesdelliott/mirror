import React from 'react';
export default () => 
    <svg aria-hidden="true"
        data-prefix="fas"
        data-icon="newspaper"
        class="svg-inline--fa fa-newspaper fa-w-18 news-icon"
        role="img" xmlns="http://www.w3.org/2000/svg"
        viewBox="-40 -40 656 592">
        <defs>
        <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="100" result="coloredBlurF"/>
            <feMerge>
            <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlurF"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>
            <path  filter="url(#glow)" fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path>
        </svg>