import { Context } from './context';
import { horizontalLayoutDependencies, resolveDimensionDependencies } from './layout-params.utils';
import { View } from './view';

const ids = (views: View[]) => views.map(v => v.id);

describe('View Layout Utils', () => {
  describe('#resolveDimensionDependencies', () => {
    it('resolves dependencies between views', () => {
      const context = new Context();
      const a = new View(context, 'A');
      const b = new View(context, 'B');
      const c = new View(context, 'C');
      const d = new View(context, 'D');
      a.getLayoutParams().alignParentStart();
      b.getLayoutParams().toEndOf(a.id);
      c.getLayoutParams().toEndOf(b.id).toStartOf(d.id);
      d.getLayoutParams().alignParentEnd();

      // Correct dependency order:
      // [a, d, b, c], [a, b, d, c], [d, a, b, c]

      let resolvedDeps = resolveDimensionDependencies([a, b, c, d], horizontalLayoutDependencies);
      expect(resolvedDeps).toEqual(ids([d, a, b, c]));

      resolvedDeps = resolveDimensionDependencies([d, c, b, a], horizontalLayoutDependencies);
      expect(resolvedDeps).toEqual(ids([a, b, d, c]));

      resolvedDeps = resolveDimensionDependencies([b, c, d, a], horizontalLayoutDependencies);
      expect(resolvedDeps).toEqual(ids([a, d, b, c]));
    });
    it('throws an error in case of missing dependency', () => {
      const context = new Context();
      const a = new View(context, 'A');
      const b = new View(context, 'B');
      a.getLayoutParams().alignParentStart();
      b.getLayoutParams().toEndOf(a.id);
      expect(
        () => resolveDimensionDependencies([b], horizontalLayoutDependencies),
      ).toThrowError(
        'Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container. ' +
        'Children that can\'t be processed:\n' +
        'B[5] that has unresolved references to "4: a view that is not a sibling',
      );
    });
    it('throws an error in case of circular dependency', () => {
      const context = new Context();
      const a = new View(context, 'A');
      const b = new View(context, 'B');
      a.getLayoutParams().toStartOf(b.id);
      b.getLayoutParams().toEndOf(a.id);
      expect(
        () => resolveDimensionDependencies([b], horizontalLayoutDependencies),
      ).toThrowError(
        'Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container',
      );
    });
  });
});
