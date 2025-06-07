import React, { ReactNode } from "react";
import classNames from "classnames";
import { IconButton, Stack } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Table as UITable, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

export default function Table<Headers extends readonly TableHeader<string>[]>({
  headers,
  data = [],
  actions,
}: TableProps<Headers>) {
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
                {actions && Object.values(actions).length > 0 && (
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {" "}
                  </TableCell>
                )}
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
                  {actions && Object.values(actions).length > 0 && (
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {actions.onShow && (
                          <IconButton onClick={() => actions.onShow && actions.onShow(d)}>
                            <VisibilityIcon color="success" />
                          </IconButton>
                        )}
                        {actions.onEdit && (
                          <IconButton onClick={() => actions.onEdit && actions.onEdit(d)}>
                            <CreateIcon color="warning" />
                          </IconButton>
                        )}
                        {actions.onDelete && (
                          <IconButton onClick={() => actions.onDelete && actions.onDelete(d)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </UITable>
        </div>
      </div>
    </div>
  );
}

export type TableHeader<K extends string> = {
  text: string;
  key: K;
};
export type Data<H extends readonly TableHeader<string>[]> = Record<H[number]["key"], ReactNode>;
type Action<H extends readonly TableHeader<string>[]> = (data: Data<H>) => void;
type TableProps<H extends readonly TableHeader<string>[]> = {
  headers: H;
  data: Data<H>[];
  actions?: {
    onEdit?: Action<H>;
    onDelete?: Action<H>;
    onShow?: Action<H>;
  };
};
