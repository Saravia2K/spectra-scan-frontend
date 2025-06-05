import React, { ReactNode } from "react";
import classNames from "classnames";

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function Table<Headers extends readonly TTableHeader<string>[]>({
  headers,
  data = [],
}: TTableProps<Headers>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <UITable>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {headers.map((h, i) => (
                  <TableCell
                    isHeader
                    key={i}
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {h.text}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((d, i) => (
                <TableRow key={i}>
                  {headers.map(({ key }, j) => {
                    const content = d[key as Headers[number]["key"]];
                    return (
                      <TableCell
                        key={j}
                        className={classNames("px-4 py-3 text-theme-sm", {
                          "text-start": typeof content == "string",
                          "text-gray-500": typeof content == "string",
                        })}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </UITable>
        </div>
      </div>
    </div>
  );
}

export type TTableHeader<K extends string> = {
  text: string;
  key: K;
};

export type TTableData<H extends readonly TTableHeader<string>[]> = Array<
  Record<H[number]["key"], ReactNode>
>;

type TTableProps<H extends readonly TTableHeader<string>[]> = {
  headers: H;
  data: TTableData<H>;
};
