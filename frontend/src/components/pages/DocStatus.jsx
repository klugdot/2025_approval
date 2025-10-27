import { useEffect, useState } from "react";

export default function DocStatus({ docNum }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  //   console.log(docNum);
  const [history, setHistory] = useState([]);

  // 상세보기 - 작성자 이름 같이 받아와야 함
  useEffect(() => {
    if (docNum == null) {
      return;
    }
    const detail = async () => {
      const res = await fetch(`${baseUrl}/approval/history/${docNum}`);
      const data = await res.json();
      setHistory(data);
    };
    detail();
  }, [docNum]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-3">
        <h3 className="text-base font-semibold text-stone-900">문서상태</h3>
      </div>
      <div className="mt-3 pl-5 text-left text-xs text-stone-500 ">
        * 상태는 시간 순서대로 표시됩니다.
      </div>

      <div className="overflow-x-auto px-5 py-5">
        <table className="min-w-full border-collapse">
          <thead className="bg-stone-50">
            <tr className="text-left text-stone-700">
              <th className="px-4 py-3 text-sm font-semibold">번호</th>
              <th className="px-4 py-3 text-sm font-semibold">등록/결재자</th>
              <th className="px-4 py-3 text-sm font-semibold">직급</th>
              <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
            </tr>
          </thead>

          <tbody className="[&>tr:hover]:bg-stone-50">
            {docNum === null ? (
              <tr className="border-t border-stone-200">
                <td colSpan={4} className="px-4 py-3 text-sm text-center">
                  문서 작성중...
                </td>
              </tr>
            ) : (
              history.map((item, idx) => (
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3 text-sm">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm">{item.procId}</td>
                  <td className="px-4 py-3 text-sm">{item.positionCd}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={
                        "rounded-md bg-stone-100 px-2 py-1 text-xs ring-1" +
                        (item.statusCode === "임시저장"
                          ? " text-stone-700 ring-stone-200"
                          : item.statusCode === "결재대기"
                          ? " ring-amber-200 text-amber-700"
                          : item.statusCode === "결재중"
                          ? " text-blue-700 ring-blue-200"
                          : item.statusCode === "결재완료"
                          ? " text-emerald-700 ring-emerald-200"
                          : item.statusCode === "반려"
                          ? " text-rose-700 ring-rose-200"
                          : "")
                      }
                    >
                      {item.statusCode}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
