import { classNames } from "../lib/helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Table({ children }: { children?: any }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      {children}
    </table>
  );
}

export function TableHead({ children }: { children?: any }) {
  return (
    <thead className="text-sm text-blue-200 font-semibold bg-border-100">
      {children}
    </thead>
  );
}

export function TableHeader({ children }: { children?: any }) {
  return (
    <th scope="col" className="px-6 py-3 bg-border-100">
      {children}
    </th>
  );
}

export function TableRow({ children, className }: { children?: any, className?: string}) {
  return (
    <tr className={classNames(
      className ? className : 'odd:bg-white-100 even:bg-border-100',
      "border-b"
    )}>{children}</tr>
  );
}

export function TableCell({
  children,
  className,
  rowSpan,
  colSpan,
  sticky,
}: {
  children?: any;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  sticky?: boolean;
}) {
  return (
    <td
      scope="row"
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={classNames(
        className ? className : "",
        `px-6 py-4 font-medium text-gray-900 text-left ${sticky ? 'first-col-sticky' : ''}`
      )}
    >
      {children}
    </td>
  );
}

export function TableCellImage({ src }: { src: string }) {
  return (
    <td className="w-30 p-4">
      <img
        className="w-10 h-10 rounded-full mx-auto object-cover ring-1 ring-gray-300"
        src={src}
        alt="Employee Profile Image"
      ></img>
    </td>
  );
}
