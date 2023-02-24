import { useRef, useState, useEffect } from "react";
import {
  useSearchState,
  useSearchActions,
  FilterSearchResponse,
  SearchParameterField,
  Filter,
} from "@yext/search-headless-react";
import InputDropdown, { InputDropdownCssClasses } from "./InputDropdown";
import DropdownSection, {
  DropdownSectionCssClasses,
  Option,
} from "./DropdownSection";
import { processTranslation } from "./utils/processTranslation";
import { useSynchronizedRequest } from "../../hooks/useSynchronizedRequest";
import renderAutocompleteResult, {
  AutocompleteResultCssClasses,
} from "./utils/renderAutocompleteResult";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import {
  breadcrumbhome,
  googleApikey,
  search_icn,
  UseMylocationsvg,
} from "../../../sites-global/global";
import * as React from "react";
import { AnswerExperienceConfig } from "../../config/answersHeadlessConfig";

const SCREENREADER_INSTRUCTIONS = "";

interface FilterSearchCssClasses
  extends InputDropdownCssClasses,
    DropdownSectionCssClasses,
    AutocompleteResultCssClasses {
  container?: string;
  label?: string;
}

const builtInCssClasses: FilterSearchCssClasses = {
  container: "mb-2 w-full",
  label: "mb-4 text-sm font-medium text-gray-900",
  dropdownContainer:
    "absolute z-10 shadow-lg w-full rounded-md border border-gray-300 bg-white pt-3 pb-1 px-4 mt-1",
  inputElement:
    "text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600",
  sectionContainer: "pb-2",
  sectionLabel: "text-sm text-gray-700 font-semibold pb-2",
  focusedOption: "bg-gray-100",
  option: "text-sm text-gray-700 pb-1 cursor-pointer",
};

export interface FilterSearchProps {
  label: string;
  sectioned: boolean;
  searchFields: Omit<SearchParameterField, "fetchEntities">[];
  customCssClasses?: FilterSearchCssClasses;
  cssCompositionMethod?: CompositionMethod;
  searchInputValue: any;
  handleInputValue: any;
  handleSetUserShareLocation: any;
  inputvalue: any;
  params: any;
  displaymsg:any;
  setDisplaymsg:any;
  setSearchInputValue:any
}

type FilterHandle = {
  setInputValue: (value: String) => void,
}

const FilterSearch = React.forwardRef<FilterHandle, FilterSearchProps>(
  (
    {
      label,
      sectioned,
      searchFields,
      customCssClasses,
      cssCompositionMethod,
      searchInputValue,
      handleInputValue,
      handleSetUserShareLocation,
      inputvalue,
      params,
      displaymsg,
      setDisplaymsg,
      setSearchInputValue
    }: FilterSearchProps,
    ref
  ): JSX.Element => {
    const searchAction = useSearchActions();
    const [input, setInput] = useState(inputvalue);
    const selectedFilterOptionRef = useRef<Filter | null>(null);
    const searchParamFields = searchFields.map((searchField) => {
      return { ...searchField, fetchEntities: false };
    });
    React.useImperativeHandle(ref,() => {
      return {
        setInputValue: (value: String) => setInput(value)
      }
    })
   console.log(displaymsg,"fisttimedispalydfsd")
    const cssClasses = useComposedCssClasses(
      builtInCssClasses,
      customCssClasses,
      cssCompositionMethod
    );

    const [filterSearchResponse, executeFilterSearch] = useSynchronizedRequest<
      string,
      FilterSearchResponse
    >((inputValue) =>
      searchAction.executeFilterSearch(
        inputValue ?? "",
        sectioned,
        searchParamFields
      )
    );
  

    let sections: { results: Option[]; label?: string }[] = [];
     
    if (filterSearchResponse) {
      sections = filterSearchResponse.sections.map((section) => {
        return {
          results: section.results.map((result) => {
            return {
              value: result.value,
              onSelect: () => {
                setInput(result.value);

                if (result?.filter) {
                  if (selectedFilterOptionRef.current) {
                    searchAction.setFilterOption({
                      ...selectedFilterOptionRef.current,
                      selected: false,
                    });
                  }

                  selectedFilterOptionRef.current = result.filter;
                  searchAction.setFilterOption({
                    ...result.filter,
                    selected: true,
                  });
                  searchAction.setOffset(0);
                  searchAction.setVerticalLimit(AnswerExperienceConfig.limit);
                  searchAction.executeVerticalQuery();
                }
              },
              display: renderAutocompleteResult(result, cssClasses),
            };
          }),
          label: section.label,
        };
      });
    }

    sections = sections.filter((section) => section.results.length > 0);

    let screenReaderText = processTranslation({
      phrase: `0 autocomplete option found.`,
      pluralForm: `0 autocomplete options found.`,
      count: 0,
    });
    if (sections.length > 0) {
      const screenReaderPhrases = sections.map((section) => {
        const optionInfo = section.label
          ? `${section.results.length} ${section.label}`
          : `${section.results.length}`;
        return processTranslation({
          phrase: `${optionInfo} autocomplete option found.`,
          pluralForm: `${optionInfo} autocomplete options found.`,
          count: section.results.length,
        });
      });
      screenReaderText = screenReaderPhrases.join(" ");
    }

    return (
      <div className={cssClasses.container}>
        <InputDropdown
          inputValue={input}
          setSearchInputValue={setSearchInputValue}
          displaymsg={displaymsg}
          setDisplaymsg={setDisplaymsg}
          params={params}
          placeholder="Find Address, City or Postal Code"
          screenReaderInstructions={SCREENREADER_INSTRUCTIONS}
          screenReaderText={screenReaderText}
          onlyAllowDropdownOptionSubmissions={true}
          onInputChange={(newInput: any) => {
            setInput(newInput);
            handleInputValue();
          }}
          onInputFocus={(input: any) => {
            executeFilterSearch(input);
          }}
          cssClasses={cssClasses}
          handleSetUserShareLocation={handleSetUserShareLocation}
          handleInputValue={handleInputValue}
        >
          {sections.map((section, sectionIndex) => {
            const sectionId = section.label
              ? `${section.label}-${sectionIndex}`
              : `${sectionIndex}`;
            return (
              <DropdownSection
                key={sectionId}
                options={section.results}
                optionIdPrefix={sectionId}
                onFocusChange={(value) => {
                  setInput(value);
                }}
                label={section.label}
                cssClasses={cssClasses}
              />
            );
          })}
        </InputDropdown>
      </div>
    );
  }
);

export default FilterSearch;
