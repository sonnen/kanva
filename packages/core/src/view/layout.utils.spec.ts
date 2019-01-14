import { Context } from './context';
import { horizontalLayoutDependencies } from './layout-params';
import { resolveDimensionDependencies } from './layout.utils';
import { View } from './view';

const ids = (views: View[]) => views.map(v => v.id);

describe('View Layout Utils', () => {
  describe('#resolveDimensionDependencies', () => {
    it('resolves dependencies between views', () => {
      const context = new Context();
      const a = new View('A', context);
      const b = new View('B', context);
      const c = new View('C', context);
      const d = new View('D', context);
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
      const a = new View('A', context);
      const b = new View('B', context);
      a.getLayoutParams().alignParentStart();
      b.getLayoutParams().toEndOf(a.id);
      expect(
        () => resolveDimensionDependencies([b], horizontalLayoutDependencies),
      ).toThrowError(
        'Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container',
      );
    });
    it('throws an error in case of circular dependency', () => {
      const context = new Context();
      const a = new View('A', context);
      const b = new View('B', context);
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
