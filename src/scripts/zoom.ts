// Shared Lightbox Logic for Image Zoom
export function initZoom() {
    let lightbox = document.getElementById('zoom-lightbox');

    // Create lightbox if it doesn't exist (should be rare if using ZoomLightbox component)
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'zoom-lightbox';
        lightbox.className = 'fixed inset-0 z-[9999] bg-white/60 backdrop-blur-xl opacity-0 invisible transition-all duration-300 flex items-center justify-center cursor-zoom-out';

        lightbox.innerHTML = `
            <button class="absolute top-6 right-6 z-20 p-2 text-slate-500 hover:text-slate-900 transition-colors bg-white/50 hover:bg-white rounded-full shadow-sm" aria-label="Close zoom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="relative w-[90vw] h-[90vh] flex items-center justify-center pointer-events-none">
                <img class="max-w-full max-h-full w-full h-full object-contain drop-shadow-2xl scale-95 transition-transform duration-300 pointer-events-auto select-none cursor-zoom-out" src="" alt="" />
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    if (!lightboxImg) return;

    // Close handlers
    const close = () => {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.add('opacity-0', 'invisible');
        lightboxImg.classList.add('scale-95');
        lightboxImg.classList.remove('scale-100');
        document.body.style.overflow = '';
    };

    lightbox.onclick = (e) => {
        const target = e.target as any;
        if (target === lightbox || target.closest('button') || target.tagName === 'IMG') {
            close();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // Attach click handlers to images inside wrappers
    // Targets both new ZoomImage and legacy Zoom (via Shim)
    const images = document.querySelectorAll('.zoom-wrapper img, .zoom-image');

    images.forEach(img => {
        if (img.hasAttribute('data-zoom-attached')) return;
        img.setAttribute('data-zoom-attached', 'true');

        (img as any).onclick = (e: any) => {
            e.preventDefault();
            e.stopPropagation();

            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');

            if (!src || !lightbox || !lightboxImg) return;

            lightboxImg.setAttribute('src', src);
            lightboxImg.setAttribute('alt', alt || '');

            lightbox.classList.remove('opacity-0', 'invisible');

            setTimeout(() => {
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);

            document.body.style.overflow = 'hidden';
        };
    });
}
