(function() {
    window._epDebug = false; // Default: Silent
    
    const log = (m) => { if(window._epDebug) console.log(`%c[EP-DEBUG] %c${m}`, 'color:cyan;font-weight:bold', 'color:white'); };
    const v = { get: () => 'visible', configurable: false }, f = { get: () => false, configurable: false }, t = { value: () => true, writable: false };

    // Overwrite browser properties
    Object.defineProperty(document, 'visibilityState', v);
    Object.defineProperty(document, 'webkitVisibilityState', v);
    Object.defineProperty(document, 'hidden', f);
    Object.defineProperty(document, 'webkitHidden', f);
    Object.defineProperty(document, 'hasFocus', t);

    // Block signals
    const block = (e) => {
        e.stopImmediatePropagation();
        log(`Intercepted: ${e.type}`);
    };
    ['blur', 'mouseleave', 'visibilitychange', 'webkitvisibilitychange', 'pagehide', 'focusout'].forEach(evt => {
        window.addEventListener(evt, block, true);
        document.addEventListener(evt, block, true);
    });

    // Heartbeat
    setInterval(() => window.dispatchEvent(new Event('focus')), 2000);

    // Command to enable debug mode manually
    window.debug = () => { window._epDebug = !window._epDebug; console.log(`Debug Mode: ${window._epDebug}`); };

    console.log("Ghost Mode Loaded. Type 'debug()' to see blocks.");
})();
