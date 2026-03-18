(function() {
    // 1. The "Always True" overrides
    const trueFn = { get: () => true, configurable: false };
    const visibleFn = { get: () => 'visible', configurable: false };
    const falseFn = { get: () => false, configurable: false };

    // Force the browser to lie about window focus
    Object.defineProperty(document, 'hasFocus', { value: () => true, writable: false });
    Object.defineProperty(window, 'onblur', { value: null, writable: false });
    
    // Mask visibility even if you switch tabs
    Object.defineProperty(document, 'visibilityState', visibleFn);
    Object.defineProperty(document, 'webkitVisibilityState', visibleFn);
    Object.defineProperty(document, 'hidden', falseFn);
    Object.defineProperty(document, 'webkitHidden', falseFn);

    // 2. The "Passive Listener" - doesn't block, just ignores
    window.addEventListener('blur', (e) => {
        e.stopImmediatePropagation();
        console.log("Ignored a blur event.");
    }, true);

    // 3. Keep the "heartbeat" alive without moving the mouse
    // This tells the site you're still there without being "sus"
    setInterval(() => {
        window.dispatchEvent(new Event('focus'));
    }, 5000);

    console.log("Ghost Mode Active. The site thinks you're always here.");
})();
