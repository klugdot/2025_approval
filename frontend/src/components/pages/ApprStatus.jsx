export default function ApprStatus({ detailAppr }) {
  return (
    <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-3">
        <h2 className="text-base font-semibold text-stone-900">결재 상태</h2>
      </div>

      <div className="overflow-x-auto px-5 py-5">
        <table className="min-w-full border-collapse border border-stone-200 text-center">
          <thead className="bg-stone-50">
            <tr>
              <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                결재대기
              </th>
              <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                결재중
              </th>
              <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                결재완료
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-stone-200 px-4 py-4">
                <input
                  type="checkbox"
                  disabled
                  checked={
                    detailAppr.statusCode === "PND" ||
                    detailAppr.statusCode === "APR" ||
                    detailAppr.statusCode === "CMP"
                      ? true
                      : false
                  }
                  className="h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
              </td>
              <td className="border border-stone-200 px-4 py-4">
                <input
                  type="checkbox"
                  disabled
                  checked={
                    detailAppr.statusCode === "APR" ||
                    detailAppr.statusCode === "CMP"
                      ? true
                      : false
                  }
                  className="h-5 w-5 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="border border-stone-200 px-4 py-4">
                <input
                  type="checkbox"
                  disabled
                  checked={detailAppr.statusCode === "CMP" ? true : false}
                  className="h-5 w-5 rounded border-stone-300 text-green-600 focus:ring-green-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
