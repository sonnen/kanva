import { Context } from './context';
import { LayoutParams, PARENT_ID } from './layout-params';
import { Id } from './layout-props';
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

interface Dependency {
  id: number;
  dependencies: number[];
}

export const resolveDimensionDependencies = (
  children: View[],
  dependencySelector: (lp: LayoutParams) => (undefined | number)[],
): number[] => {
  const dimension: Dependency[] = children.map(child => ({
    id: child.id,
    dependencies: Array.from(new Set(
      dependencySelector(child.getLayoutParams())
        .filter((id): id is number => id !== undefined && id !== PARENT_ID),
    )),
  }));
  const orderedDimension: number[] = [];

  const maxLoops = dimension.length * 10;
  let loops = 0;
  const unresolvedDependencies = (depId: number) => !orderedDimension.includes(depId);
  while (dimension.length) {
    if (loops++ > maxLoops) {
      const getChildById = (dependency: Dependency) => ({
        view: children.find(child => child.id === dependency.id)!,
        dependencies: dependency.dependencies,
      });
      throw new Error(
        `Dependencies between views can't be resolved. ` +
        `This may be a result of a circular dependency or not including referred view in a container. ` +
        `Children that can't be processed:\n` +
        dimension
          .map(getChildById)
          .map(child => (
            `${child.view.name}[${child.view.id}] that has unresolved references to "` +
            child.dependencies
              .map(id => {
                const child = children.find(child => child.id === id);
                return `${id}: ${child ? child.name : 'a view that is not a sibling'}`;
              })
              .join('", "') +
            `"`
          ))
          .join('\n'),
      );
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
