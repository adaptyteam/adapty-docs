// Theme management with auto-detection and persistence

type Theme = 'light' | 'dark';

export function initTheme() {
    // Get saved preference or detect system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme: Theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // Dispatch event for components that need to react
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function toggleTheme() {
    const root = document.documentElement;
    const currentTheme: Theme = root.classList.contains('dark') ? 'dark' : 'light';
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

export function getCurrentTheme(): Theme {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Initialize immediately (before page render to avoid flash)
if (typeof window !== 'undefined') {
    initTheme();

    // 1. Preserve theme state during the swap
    document.addEventListener('astro:before-swap', (ev) => {
        // If the current page is dark, ensure the NEW page (ev.newDocument) is also marked dark
        // BEFORE it replaces the current DOM. This prevents the white flash.
        if (document.documentElement.classList.contains('dark')) {
            ev.newDocument.documentElement.classList.add('dark');
        }
    });

    // 2. Re-initialize complete theme logic after swap (listeners, etc.)
    document.addEventListener('astro:after-swap', initTheme);
}

