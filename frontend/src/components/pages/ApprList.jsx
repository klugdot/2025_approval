import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

export default function ApprList() {
  const { user } = useAuth();
  const [apprList, setApprList] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState({});
  const [pageBlock, setPageBlock] = useState([]);

  useEffect(() => {
    handlePage(1);
  }, []);

  const pageSetting = (page) => {
    setPage(page);

    const arr = [];
    for (let p = page.blockStart; p <= page.blockEnd; p++) arr.push(p);
    setPageBlock(arr);
  };

  const handlePage = async (page) => {
    const formData = {
      curPage: page,
      pageSize: 5,
      userId: user.user_id,
      positionCd: user.position_cd,
    };
    // console.log("formData", formData);

    const res = await fetch("http://localhost:8080/approval/page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    // console.log(data.list);
    setApprList(data.list);
    pageSetting(data.page);
  };

  return (
    <div className="mx-auto max-w-[1200px] p-6">
      {/* 환영 메세지 (왼쪽 정렬) */}
      <div className="mb-4 text-sm text-stone-600 text-left">
        <span className="font-semibold text-stone-800">
          {user.emp_name}({user.position_name})
        </span>
        님 환영합니다.
      </div>

      <h1 className="text-2xl font-bold text-stone-900 mb-4 text-center">
        결재 목록
      </h1>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-stone-50">
            <tr className="text-stone-700">
              <th className="px-4 py-3 text-sm font-semibold">글번호</th>
              <th className="px-4 py-3 text-sm font-semibold">작성자</th>
              <th className="px-4 py-3 text-sm font-semibold">제목</th>
              <th className="px-4 py-3 text-sm font-semibold">등록일</th>
              <th className="px-4 py-3 text-sm font-semibold">결재일</th>
              <th className="px-4 py-3 text-sm font-semibold">결재자</th>
              <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
            </tr>
          </thead>

          <tbody className="[&>tr:hover]:bg-stone-50 text-center">
            {apprList.map((appr, idx) => (
              <tr
                key={idx}
                onClick={() => navigate(`/approvalList/${appr.num}`)}
                className="border-t border-stone-200"
              >
                <td className="px-4 py-3">{page.offset + idx + 1}</td>
                <td className="px-4 py-3">{appr.writerName}</td>
                <td className="px-4 py-3">{appr.title}</td>

                <td className="px-4 py-3">{appr.regDate}</td>
                <td className="px-4 py-3">
                  {appr.apprDate === null ? "-" : appr.apprDate}
                </td>
                {/* 결재자 이름, 결재상태str 필요, 결재상태에 따라 text색상 */}
                <td className="px-4 py-3">
                  {appr.approverId === null
                    ? "-"
                    : `${appr.apprName}(${appr.apprPosition})`}
                </td>
                <td
                  // className="px-4 py-3 text-stone-700"
                  className={
                    appr.statusName === "임시저장"
                      ? " text-stone-700"
                      : appr.statusName === "결재대기"
                      ? " text-amber-600"
                      : appr.statusName === "결재중"
                      ? " text-blue-700"
                      : appr.statusName === "결재완료"
                      ? " text-emerald-700"
                      : appr.statusName === "반려"
                      ? " text-rose-600"
                      : ""
                  }
                >
                  {appr.statusName}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-white border-t border-stone-200">
            <tr>
              <td colSpan={7} className="px-4 py-3 text-center text-sm">
                {page.blockStart !== 1 && (
                  <span
                    onClick={() => handlePage(page.blockStart - 1)}
                    className="border border-gray-200 px-2 py-1 cursor-pointer"
                  >
                    이전
                  </span>
                )}

                {pageBlock.map((p) => (
                  <span
                    key={p}
                    onClick={() => handlePage(p)}
                    className="border border-gray-200 px-2 py-1 cursor-pointer"
                  >
                    {p}
                  </span>
                ))}

                {page.blockEnd < page.totalPages && (
                  <span
                    onClick={() => handlePage(page.blockEnd + 1)}
                    className="border border-gray-200 px-2 py-1 cursor-pointer"
                  >
                    다음
                  </span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
