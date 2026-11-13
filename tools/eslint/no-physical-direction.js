const alternatives = {
  ml: 'ms-',
  mr: 'me-',
  pl: 'ps-',
  pr: 'pe-',
  left: 'start-',
  right: 'end-',
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require logical Tailwind direction utilities for Hebrew RTL.',
    },
    schema: [],
    messages: {
      physicalDirection:
        'Use the logical utility {{logical}} instead of {{physical}} for RTL support.',
    },
  },
  create(context) {
    function check(node, value) {
      // Check strings everywhere, including JSX, cn/clsx arguments, cva objects,
      // responsive/state/arbitrary variants, negative and important utilities.
      const pattern = /(?:^|[\s:])!?-?(ml|mr|pl|pr|left|right)-/g

      for (const match of value.matchAll(pattern)) {
        context.report({
          node,
          messageId: 'physicalDirection',
          data: {
            physical: `${match[1]}-`,
            logical: alternatives[match[1]],
          },
        })
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') check(node, node.value)
      },
      TemplateElement(node) {
        check(node, node.value.cooked ?? node.value.raw)
      },
    }
  },
}
