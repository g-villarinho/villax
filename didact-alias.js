// Alias global para Didact sem modificar index.js
// Usa getter para garantir acesso às funções já hoistadas em index.js.
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
