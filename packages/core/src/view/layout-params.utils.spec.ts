import { Context } from './context';
import {
  horizontalLayoutDependencies,
  resolveDimensionDependencies,
  resolveLayoutParamsIds,
} from './layout-params.utils';
import { View } from './view';

describe('View Layout Utils', () => {
  describe('#resolveDimensionDependencies', () => {
    it('resolves dependencies between views', () => {
      const context = new Context();
      const a = new View(context, 'A');
      a.setId('a');
      const b = new View(context, 'B');
      b.setId('b');
      const c = new View(context, 'C');
      const d = new View(context, 'D');
      d.setId('d');

      a.getLayoutParams().alignParentStart();
      b.getLayoutParams().toEndOf('a');
      c.getLayoutParams().toEndOf('b').toStartOf('d');
      d.getLayoutParams().alignParentEnd();

      resolveLayoutParamsIds(a.getLayoutParams(), context);
      resolveLayoutParamsIds(b.getLayoutParams(), context);
      resolveLayoutParamsIds(c.getLayoutParams(), context);
      resolveLayoutParamsIds(d.getLayoutParams(), context);

      // Correct dependency order:
      // [a, d, b, c], [a, b, d, c], [d, a, b, c]

      let resolvedDeps = resolveDimensionDependencies([a, b, c, d], horizontalLayoutDependencies, context);
      expect(resolvedDeps).toEqual([d, a, b, c]);

      resolvedDeps = resolveDimensionDependencies([d, c, b, a], horizontalLayoutDependencies, context);
      expect(resolvedDeps).toEqual([a, b, d, c]);

      resolvedDeps = resolveDimensionDependencies([b, c, d, a], horizontalLayoutDependencies, context);
      expect(resolvedDeps).toEqual([a, d, b, c]);
    });
    it('throws an error in case of missing dependency', () => {
      const context = new Context();
      const a = new View(context, 'A');
      a.setId('a');
      const b = new View(context, 'B');

      a.getLayoutParams().alignParentStart();
      b.getLayoutParams().toEndOf('a');

      resolveLayoutParamsIds(a.getLayoutParams(), context);
      resolveLayoutParamsIds(b.getLayoutParams(), context);

      expect(
        () => resolveDimensionDependencies([b], horizontalLayoutDependencies, context),
      ).toThrowError(
        'Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container. ' +
        'Children that can\'t be processed:\n' +
        'B[-] that has unresolved references to "a: a view that is not a sibling',
      );
    });
    it('throws an error in case of circular dependency', () => {
      const context = new Context();
      const a = new View(context, 'A');
      a.setId('a');
      const b = new View(context, 'B');
      b.setId('b');

      a.getLayoutParams().toStartOf('b');
      b.getLayoutParams().toEndOf('a');

      resolveLayoutParamsIds(a.getLayoutParams(), context);
      resolveLayoutParamsIds(b.getLayoutParams(), context);

      expect(
        () => resolveDimensionDependencies([b], horizontalLayoutDependencies, context),
      ).toThrowError(
        'Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container',
      );
    });
  });
});
