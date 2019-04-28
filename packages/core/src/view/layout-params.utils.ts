import { removeEqualProps } from '../utils';
import { Context } from './context';
import { LayoutParams, PARENT_ID } from './layout-params';
import { Id, LayoutProps } from './layout-props';

interface ViewLike {
  id?: number;
  name: string;
  getLayoutParams: () => LayoutParams;
}

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
  view: ViewLike;
  id?: number;
  dependencies: number[];
}

export const resolveDimensionDependencies = <T extends ViewLike>(
  children: T[],
  dependencySelector: (lp: LayoutParams) => number[],
  context: Context,
): T[] => {
  const dimension: Dependency[] = children.map(child => ({
    view: child,
    id: child.id,
    dependencies: dependencySelector(child.getLayoutParams()),
  }));
  const orderedDimension: T[] = [];

  const unresolvedDependencies = (depId: number) => !orderedDimension.find(v => v.id === depId);
  while (dimension.length) {
    let dependenciesResolvedInCycle = 0;
    for (let i = dimension.length - 1; i >= 0; i--) {
      const child = dimension[i];
      child.dependencies = child.dependencies.filter(unresolvedDependencies);
      if (!child.dependencies.length) {
        dependenciesResolvedInCycle++;
        orderedDimension.push(child.view as T);
        dimension.splice(i, 1);
      }
    }
    if (dependenciesResolvedInCycle === 0) {
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
            `${child.view.name}[${child.view.id || '-'}] that has unresolved references to "` +
            child.dependencies
              .map(id => {
                const child = children.find(child => child.id === id);
                return `${context.getId(id)}: ${child ? child.name : 'a view that is not a sibling'}`;
              })
              .join('", "') +
            `"`
          ))
          .join('\n'),
      );
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

const defaultLayoutProps = new LayoutParams().asProps();
export const removeDefaultProps = (props: LayoutProps) => removeEqualProps(props, defaultLayoutProps);
