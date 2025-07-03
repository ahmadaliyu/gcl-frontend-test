import React from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateShipFrom, updateShipTo } from "@/store/auth/quoteSlice";

interface LocationPickerProps {
  type: "sendFrom" | "sendTo";
  label: string; // e.g. "Send From" or "Send To"
}

const WITHINUKLIST = [
  { name: "UK Mainland", alpha_2_code: "GB", emoji: "" },
  { name: "Scotish Highlands", alpha_2_code: "SC", emoji: "" },
  { name: "Northern Island", alpha_2_code: "NT", emoji: "" },
  { name: "Channel Island", alpha_2_code: "CH", emoji: "" },
];

export const LocationPicker = ({ type, label }: LocationPickerProps) => {
  const COUNTRY_CODE_LIST = useAppSelector((state) => state.country.countries);
  const CITIES_LIST = useAppSelector((state) => state.country.cities);

  const [country, setCountry] = React.useState("");
  const [area, setArea] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [postcodeSuggestions, setPostcodeSuggestions] = React.useState<
    { postcode: string; ward: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isUserTyping, setIsUserTyping] = React.useState(false);

  const dispatch = useAppDispatch();

  const isUK =
    type === "sendFrom"
      ? country === "GB" || WITHINUKLIST.some((c) => c.alpha_2_code === country)
      : false;

  const fetchPostcodeSuggestions = React.useCallback(
    debounce(async (query: string) => {
      try {
        const res = await axios.get(
          `https://api.postcodes.io/postcodes?q=${query}`
        );
        const suggestions =
          res.data?.result?.map((item: any) => ({
            postcode: item.postcode,
            ward: item.admin_ward || "",
          })) || [];
        setPostcodeSuggestions(suggestions);
        setShowSuggestions(true);
      } catch {
        setPostcodeSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400),
    []
  );

  React.useEffect(() => {
    if (isUserTyping && postCode.length >= 3 && country !== "NG") {
      fetchPostcodeSuggestions(postCode);
    } else {
      setPostcodeSuggestions([]);
      setShowSuggestions(false);
    }
  }, [postCode, country, isUserTyping]);

  React.useEffect(() => {
    if (postCode && country) {
      let selected: { alpha_2_code: string; name: string } | undefined;

      selected =
        WITHINUKLIST.find((c) => c.alpha_2_code === country) ||
        COUNTRY_CODE_LIST.find((c) => c.alpha_2_code === country);

      if (selected) {
        const payload = {
          country_iso: selected.alpha_2_code,
          name: selected.name,
          postcode: postCode,
        };
        if (type === "sendFrom") {
          dispatch(updateShipFrom(payload));
        } else {
          dispatch(updateShipTo(payload));
        }
      }
    }
  }, [postCode, country]);

  return (
    <div className="font-poppins w-full border border-[#CCD6DF] rounded-[10px] flex gap-[16px] h-auto py-[8px] px-[16px] items-start flex-col sm:flex-row sm:items-center sm:h-[61px]">
      <div className="flex-1 overflow-hidden w-full">
        {type === "sendFrom" && (
          <Select
            value={area}
            onValueChange={(value) => {
              setArea(value);
              setPostCode("");
              setIsUserTyping(false);
              const selected = WITHINUKLIST.find(
                (c) => c.alpha_2_code === value
              );
              if (selected) {
                setCountry(selected.alpha_2_code);
              }
            }}
          >
            <SelectTrigger className="flex-1 flex-col p-0 border-0 items-start justify-start outline-none focus:ring-0 border-none shadow-none">
              <p className="text-[#0088DD] text-[12px]">{label}</p>
              <div className="flex w-full text-[12px]">
                <SelectValue
                  placeholder="UK Mainland"
                  className="placeholder:text-[#757575] text-[12px] flex-1"
                />
                <img
                  src="/icons/chevron-down.png"
                  className="h-[24px] w-[24px] ml-auto"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Area</SelectLabel>
                {WITHINUKLIST.map((c) => (
                  <SelectItem key={c.alpha_2_code} value={c.alpha_2_code}>
                    {c.emoji}{" "}
                    {c.name.length > 10 ? `${c.name.slice(0, 15)}...` : c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {type === "sendTo" && (
          <Select
            value={country}
            onValueChange={(value) => {
              setCountry(value);
              setPostCode("");
              setIsUserTyping(false);
            }}
          >
            <SelectTrigger className="flex-1 flex-col p-0 border-0 items-start justify-start outline-none focus:ring-0">
              <p className="text-[#0088DD] text-[12px]">{label}</p>
              <div className="flex w-full">
                <SelectValue
                  placeholder="Select Country"
                  className="placeholder:text-[#757575] text-[12px] flex-1"
                />
                <img
                  src="/icons/chevron-down.png"
                  className="h-[24px] w-[24px] ml-auto"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Country</SelectLabel>
                {COUNTRY_CODE_LIST.map((c) => (
                  <SelectItem key={c.alpha_2_code} value={c.alpha_2_code}>
                    {c.emoji}{" "}
                    {c.name.length > 10 ? `${c.name.slice(0, 10)}...` : c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1 w-full relative">
        {country === "NG" ? (
          <Select
            value={postCode}
            onValueChange={(value) => {
              setPostCode(value);
              setIsUserTyping(false);
            }}
          >
            <SelectTrigger className="w-full flex flex-col p-0 border-0 items-start justify-start outline-none focus:ring-0">
              <p className="text-[#0088DD] text-[12px]">City</p>
              <div className="flex w-full text-[12px] items-center">
                <SelectValue
                  placeholder="Select City"
                  className="placeholder:text-[#757575] text-[12px] w-full"
                />
                <img
                  src="/icons/chevron-down.png"
                  className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px] ml-auto"
                  alt="dropdown"
                />
              </div>
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
              <SelectGroup>
                <SelectLabel>Select A City</SelectLabel>
                {CITIES_LIST.map((city) => (
                  <SelectItem key={city.code} value={city.code}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <div className="relative w-full">
            <p className="text-[#0088DD] text-[12px]">Postcode</p>
            <input
              autoComplete="off"
              className="placeholder:text-[#757575] text-[12px] w-full border-b border-[#CCD6DF] focus:border-[#0088DD] focus:outline-none py-1"
              placeholder="Enter Postcode"
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value);
                setIsUserTyping(true);
                setShowSuggestions(true);
              }}
            />
            {showSuggestions && postcodeSuggestions.length > 0 && (
              <div className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-[150px] overflow-y-auto shadow-lg">
                {postcodeSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setPostCode(suggestion.postcode);
                      setShowSuggestions(false);
                      setPostcodeSuggestions([]);
                      setIsUserTyping(false);
                    }}
                  >
                    <div className="font-medium">{suggestion.postcode}</div>
                    <div className="text-xs text-gray-500">
                      {suggestion.ward}
                    </div>
                  </div>
                ))}
                <div
                  className="px-4 py-2 text-red-500 text-xs cursor-pointer border-t border-gray-200 hover:bg-gray-50"
                  onClick={() => {
                    setPostCode("");
                    setPostcodeSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  Cancel
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
