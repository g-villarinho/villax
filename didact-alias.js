Object.defineProperty(window, 'Villax', {
    configurable: true,
    get() {
        return {
            createElement: window.createElement,
            render: window.Villax && window.Villax.render,
            Fragment: 'FRAGMENT'
        };
    }
});
