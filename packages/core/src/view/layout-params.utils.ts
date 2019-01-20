import { Context } from './context';
import { Id, LayoutParams, PARENT_ID } from './layout-params';
import { View } from './view';

export const resolveLayoutParamsIds = (layoutParams: LayoutParams, context: Context) => {
  if (!layoutParams.dependenciesModified) {
    return;
  }
  layoutParams.topId = context.resolve(layoutParams.topId);
  layoutParams.bottomId = context.resolve(layoutParams.bottomId);
  layoutParams.belowId = context.resolve(layoutParams.belowId);
  layoutParams.aboveId = context.resolve(layoutParams.aboveId);
  layoutParams.startId = context.resolve(layoutParams.startId);
  layoutParams.endId = context.resolve(layoutParams.endId);
  layoutParams.toStartOfId = context.resolve(layoutParams.toStartOfId);
  layoutParams.toEndOfId = context.resolve(layoutParams.toEndOfId);

  layoutParams.dependenciesModified = false;
};

export const resolveDimensionDependencies = (
  children: View[],
  dependencySelector: (lp: LayoutParams) => (undefined | number)[],
): number[] => {
  const dimension = children.map(child => ({
    id: child.id,
    dependencies: Array.from(new Set(
      dependencySelector(child.getLayoutParams())
        .filter((id): id is number => id !== undefined && id !== PARENT_ID),
    )),
  }));
  const orderedDimension: number[] = [];

  const maxLoops = dimension.length * 10;
  let loops = 0;
  const unresolvedDependencies = (depId: number) => orderedDimension.indexOf(depId) < 0;
  while (dimension.length) {
    if (loops++ > maxLoops) {
      throw new Error('Dependencies between views can\'t be resolved. ' +
        'This may be a result of a circular dependency or not including referred view in a container.');
    }

    for (let i = dimension.length - 1; i >= 0; i--) {
      const child = dimension[i];
      child.dependencies = child.dependencies.filter(unresolvedDependencies);
      if (!child.dependencies.length) {
        orderedDimension.push(child.id);
        dimension.splice(i, 1);
      }
    }
  }

  return orderedDimension;
};

const existingNonParentDependency = (id: undefined | Id): id is number => id !== undefined && id !== PARENT_ID;

export const horizontalLayoutDependencies = (lp: LayoutParams) => ([
  lp.startId,
  lp.toStartOfId,
  lp.endId,
  lp.toEndOfId,
]).filter(existingNonParentDependency);

export const verticalLayoutDependencies = (lp: LayoutParams) => ([
  lp.topId,
  lp.aboveId,
  lp.bottomId,
  lp.belowId,
]).filter(existingNonParentDependency);
