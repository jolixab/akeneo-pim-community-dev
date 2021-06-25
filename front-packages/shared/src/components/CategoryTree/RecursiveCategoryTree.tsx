import React from 'react';
import {CategoryTreeModel} from './CategoryTree';
import {Tree} from 'akeneo-design-system/lib/components/Tree/Tree';

type CategoryValue = {
  id: number;
  code: string;
  label: string;
};

type RecursiveCategoryTreeProps = {
  tree: CategoryTreeModel;
  childrenCallback: (value: any, parentCategory?: CategoryTreeModel) => Promise<CategoryTreeModel[]>;
  onChange?: (value: string, checked: boolean) => void;
  onClick?: any;
  isCategorySelected?: (category: CategoryValue) => boolean;
  shouldRerender?: boolean
};

const RecursiveCategoryTree: React.FC<RecursiveCategoryTreeProps> = ({
  tree,
  childrenCallback,
  onChange,
  onClick,
  isCategorySelected,
  shouldRerender,
}) => {
  const [categoryState, setCategoryState] = React.useState<CategoryTreeModel>(tree);

  const handleOpen = React.useCallback(() => {
    if (typeof categoryState.children === 'undefined') {
      setCategoryState(currentCategoryState => ({...currentCategoryState, loading: true}));
      childrenCallback(categoryState.id, tree).then(children => {
        setCategoryState(currentCategoryState => ({...currentCategoryState, loading: false, children}));
      });
    }
  }, [categoryState, setCategoryState, childrenCallback]);

  const handleChange = (categoryValue: CategoryValue, checked: boolean) => {
    setCategoryState({...categoryState, selected: checked});
    if (onChange) {
      onChange(categoryValue.code, checked);
    }
  };

  return (
    <Tree<CategoryValue>
      label={categoryState.label}
      value={{
        id: categoryState.id,
        code: categoryState.code,
        label: categoryState.label,
      }}
      selected={categoryState.selected || (isCategorySelected ? isCategorySelected(categoryState) : categoryState.selected)}
      isLoading={categoryState.loading}
      readOnly={categoryState.readOnly}
      selectable={categoryState.selectable}
      isLeaf={Array.isArray(categoryState.children) && categoryState.children.length === 0}
      onChange={handleChange}
      onOpen={handleOpen}
      onClick={onClick}
    >
      {categoryState.children &&
        categoryState.children.map(childNode => {
          return (
            <RecursiveCategoryTree
              key={childNode.id}
              tree={childNode}
              onChange={onChange}
              childrenCallback={childrenCallback}
              onClick={onClick}
              isCategorySelected={isCategorySelected}
              shouldRerender={shouldRerender}
            />
          );
        })}
    </Tree>
  );
};

export type {CategoryValue};
export {RecursiveCategoryTree};
