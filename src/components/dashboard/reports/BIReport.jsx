import { reportsBIColumns } from "../../../constants/Column";
import Table from "../global/Table";

export default function ({ data }) {
  const formattedData = data?.map((el, index) => ({ ...el, id: index + 1 }));

  const customColumns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "AMOUNT",
      accessor: "amount",
      Cell: ({ value }) => (
        <span className="text-green-600 dark:text-green-400 font-medium">${value}</span>
      ),
    },
    {
      Header: "PERCENTAGE",
      accessor: "percentage",
      Cell: ({ value }) => <span className="font-medium">{value}%</span>,
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ value }) => {
        const status = value?.toLowerCase();
        const statusClasses =
          status === "completed"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
            : status === "pending"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400";

        return (
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusClasses}`}>
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {customColumns.map((column) => (
                <th 
                  key={column.Header} 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#1E293B]"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1E293B]">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {customColumns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={customColumns.length} 
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1E293B]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
