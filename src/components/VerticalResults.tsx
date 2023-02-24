import { CardComponent, CardConfigTypes } from '../models/cardComponent';
import classNames from 'classnames';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from 'react';

interface VerticalResultsCssClasses {
  container?: string,
  labelContainer?: string,
  label?: string,
  selectedLabel?: string,
  leftIconContainer?: string,
  rightIconContainer?: string,
  icon?: string,
  results___loading?: string
}

const builtInCssClasses: VerticalResultsCssClasses = {
  results___loading: 'opacity-50'
}

interface VerticalResultsDisplayProps {
  CardComponent: CardComponent,
  cardConfig?: CardConfigTypes,
  isLoading?: boolean,
  results: Result[],
  customCssClasses?: VerticalResultsCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export function VerticalResultsDisplay(props: VerticalResultsDisplayProps): JSX.Element | null {
  const { CardComponent, results, cardConfig = {}, isLoading = false, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (results.length === 0) {
    return null;
  }

  const resultsClassNames = classNames({
    [cssClasses.results___loading ?? '']: isLoading
  });

  return (
    <div className={resultsClassNames}>
      {results && results.map(result => renderResult(CardComponent, cardConfig, result))}
    </div>
  )
}

function renderResult(CardComponent: CardComponent, cardConfig: CardConfigTypes, result: Result): JSX.Element {
  return <CardComponent result={result} configuration={cardConfig} key={result.id || result.index}/>;
}

interface VerticalResultsProps {
  CardComponent: CardComponent,
  cardConfig?: CardConfigTypes,
  displayAllOnNoResults?: boolean,
  customCssClasses?: VerticalResultsCssClasses,
  cssCompositionMethod?: CompositionMethod,
  allowPagination?: boolean,
  locationResults:[]
}

export default function VerticalResults(props: VerticalResultsProps): JSX.Element | null {

  const { displayAllOnNoResults = false, allowPagination = true, ...otherProps } = props;
  const verticalResults = props.locationResults || [];
  // const verticalResults = useSearchState(s => s.vertical.results) || [];
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  const verticalResultsCount = useSearchState(state => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.resultsCount) || 0;
  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  
  let results:any = verticalResults;
  let resultsCount = verticalResultsCount;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
    resultsCount = allResultsCountForVertical;
  }
 
  return (
    <>
      <VerticalResultsDisplay results={results} isLoading={isLoading} {...otherProps}/>      
    </>
  );
}


