# Villax

> ⚠️ Status: **Em desenvolvimento ativo**. Estrutura, API e roadmap podem mudar sem aviso enquanto conceitos são explorados.
>
> Reimplementação educacional de conceitos centrais do React (Virtual DOM, reconciler, renderização incremental, hooks básicos) para fins de estudo e experimentação. Não pretende ser production-ready.

## Objetivos
- Entender como `createElement` (JSX-like) gera estruturas intermediárias (árvore de elementos).
- Construir um Virtual DOM simples e compará-lo com o DOM real.
- Implementar um algoritmo de reconciliação básico (diff por tipo + chaves simples posteriormente).
- Explorar um loop de renderização incremental inspirado em Fiber (versão minimalista).
- Criar uma API enxuta de "hooks" (ex: `useState`, `useEffect`) para compreender coordenação de estado e efeitos.
- Mapear limitações e apontar caminhos de evolução.

## Escopo Inicial
| Módulo | Descrição | Status |
|--------|-----------|--------|
| `createElement` | Criação de objetos de elemento + nós de texto | ✅ (em `index.js`)
| `render(root, element)` | Montar a árvore no DOM real | ⏳
| Reconciler | Comparar árvore anterior e nova | ⏳
| Hooks (`useState`) | Estado por componente funcional | ⏳
| Hooks (`useEffect`) | Efeitos pós-render | ⏳
| Sistema de chave | Otimizar lista / reordenação | ⏳
| Dev sandbox | Página de teste interativa | ⏳

## Arquitetura (Visão Geral)
```
App (função) -> createElement() -> Virtual Node Tree -> Reconciler -> Patch DOM -> Commit Effects
```
Componentes funcionais retornam elementos (objetos). O reconciler calcula diferenças entre versão anterior e nova, gerando um conjunto mínimo de operações (criar, atualizar, remover nós). Em seguida, uma fase de "commit" aplica as mudanças ao DOM e dispara efeitos.

## Exemplo Futuro (API Desejada)
```js
import { createElement, useState, render } from './villax'

function Counter() {
  const [count, setCount] = useState(0)
  return createElement('div', null,
    createElement('span', null, `Valor: ${count}`),
    createElement('button', { onClick: () => setCount(count + 1) }, '+1')
  )
}

render(createElement(Counter), document.getElementById('root'))
```

## Como Rodar (estado atual)
Ainda não há bundler ou build. Apenas Node.
```bash
node index.js
```
No momento isso só cria estruturas JS; não há função de `render` ou ligação com o DOM. Para testar no navegador você poderá futuramente criar um `playground.html` e incluir o bundle.

## Roadmap Detalhado
1. Renderização inicial (montagem completa sem diff).
2. Introduzir diff por tipo (elemento diferente => recria ramo).
3. Diff por props (atualizar apenas mudado).
4. Suporte a eventos (onClick, etc.).
5. Implementar `render` incremental (yield via `requestIdleCallback`).
6. Adicionar `useState` com fila simples de atualizações.
7. Adicionar `useEffect` com ciclo de cleanup.
8. Chaves em listas (`key`) e heurística de movimentação.
9. Simplificar erro boundaries (opcional / documentação sobre exceções).
10. Benchmark básico: comparar custo de atualizações diretas vs diff.

## Decisões de Design
- Manter objetos de elemento o mais próximos possível do formato React simplificado (`{ type, props }`).
- Separar nós de texto com `type: 'TEXT_ELEMENT'` para uniformizar reconciliação.
- Adiar otimizações (ex: subtree memoization) até ter casos reais.
- Priorizar clareza de código sobre performance.

## Limitações Conhecidas
- Sem suporte a Fragment, Portal, Suspense.
- Reconciler inicial ingênuo (complexidade potencialmente alta em árvores grandes).
- Hooks não serão completos (sem `useReducer`, `useContext`, etc.).
- Sem server-side rendering.

## Referências
- Documentação oficial do React (arquitetura Fiber, hooks).
- Artigos: "Didact" (mini React), posts sobre Virtual DOM e reconciler.
- Código aberto de versões anteriores do React para estudo conceitual.

## Contribuição
Este projeto é estritamente para estudo pessoal, mas sugestões de melhoria conceitual são bem-vindas. Abra uma issue descrevendo:
1. Problema / dúvida.
2. Contexto do caso de uso.
3. Proposta de solução ou recurso.

## Licença
Este projeto está licenciado sob a **Licença MIT**.

Resumo não oficial:
- Uso, cópia, modificação, fusão, publicação e distribuição permitidos.
- É obrigatório manter o aviso de copyright e o texto da licença.
- Não há garantia; fornecido "no estado em que se encontra".

Consulte o arquivo `LICENSE` para o texto completo.

