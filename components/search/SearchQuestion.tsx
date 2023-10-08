"use client";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const SearchQuestion = ({ searchParams }: { searchParams: any }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <form className="flex">
      <div className="flex relative items-center w-[90%] lg:w-[94%] ">
        <Input
          className=" border-none text-gray-600 pl-10   "
          placeholder="Search..."
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
        />
        {searchValue.length > 0 && (
          <X
            className="absolute right-0 w-4 h-4 mr-2 cursor-pointer text-[#EE7A79]"
            onClick={() => setSearchValue("")}
          />
        )}
        <Search className="w-5 h-5 mr-2 ml-1 text-[#EE7A79] absolute left-2" />
      </div>

      <div>
        <Link
          href={{
            query: {
              ...(typeof searchParams === "object" ? searchParams : {}),
              q: searchValue,
            },
          }}
        >
          <Button type="submit" className="ml-2" disabled={!searchValue}>
            Search
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default SearchQuestion;
