import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

export default function BasicInfo({ detailAppr }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [totalCnt, setTotalCnt] = useState();
  const docsNum = detailAppr ? detailAppr.num : totalCnt + 1;

  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const readList = async () => {
      const res = await fetch("http://localhost:8080/approval/findCount");
      const data = await res.json();
      setTotalCnt(data.count);
    };
    readList();
  }, []);

  useEffect(() => {
    setValues({ title: detailAppr?.title, content: detailAppr?.content });
  }, [detailAppr]);

  const changeValues = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAppr = (upStatus) => {
    const userP = user.position_cd;
    const stus = detailAppr.statusCode;

    switch (upStatus) {
      case "PND":
        if (stus === "PND" || stus === "APR" || stus === "CMP") {
          alert("결재할 수 없습니다.");
          return;
        }
      case "APR":
        if (
          stus === "APR" ||
          stus === "CMP" ||
          (stus === "REJ" && user.userId !== detailAppr.writerId)
        ) {
          alert("결재할 수 없습니다.");
          return;
        }
      case "CMP":
        if (
          stus === "CMP" ||
          stus === "PND" ||
          (stus === "REJ" && user.userId !== detailAppr.writerId)
        ) {
          alert("결재할 수 없습니다.");
          return;
        }
      case "REJ":
        if (
          userP === "pg" ||
          userP === "aa" ||
          (userP === "pl" && stus !== "PND") ||
          (userP === "pm" && stus !== "APR")
        ) {
          alert("반려할 수 없는 상태입니다.");
          return;
        }
    }

    //새문서 등록
    if (docsNum == totalCnt + 1) {
      if (values.title === "" || values.content === "") {
        alert("제목, 내용을 모두 작성해주세요. ");
        return;
      }
      const formData = {
        title: values.title,
        content: values.content,
        statusCode: upStatus,
        writerId: user.user_id,
      };
      createList(formData);
    }

    //기존문서 결재
    if (docsNum <= totalCnt) {
      if (values.title === "" || values.content === "") {
        alert("제목, 내용을 모두 작성해주세요. ");
        return;
      }

      const formData = {
        num: docsNum,
        title: values.title,
        content: values.content,
        statusCode: upStatus,
        approverId: user.user_id,
      };
      updateList(formData);
    }

    // 결재이력 업데이트
    const formHistory = {
      approvalNum: docsNum,
      procId: user.user_id,
      positionCd: userP,
      statusCode: upStatus,
    };
    addHisroty(formHistory);
    navigate("/approvalList");
  };

  const createList = async (formData) => {
    try {
      const res = await fetch("http://localhost:8080/approval/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "fail") {
        alert("등록에 실패했습니다.");
      } else {
        navigate("/approvalList");
      }
    } catch (error) {
      console.log("등록 에러: ", error);
    }
  };

  const updateList = async (formData) => {
    try {
      const res = await fetch("http://localhost:8080/approval/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "fail") {
        alert("결재에 실패했습니다.");
      } else {
        navigate("/approvalList");
      }
    } catch (error) {
      console.log("수정 에러: ", error);
    }
  };

  const addHisroty = async (formData) => {
    try {
      const res = await fetch("http://localhost:8080/approval/addhistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "fail") {
        alert("결재/반려에 실패했습니다.");
      } else {
        navigate("/approvalList");
      }
    } catch (error) {
      console.log("결재 에러: ", error);
    }
  };

  return (
    <div>
      <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h2 className="text-base font-semibold text-stone-900">기본 정보</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-5">
          {/* 글번호 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">
              글번호
            </label>
            <input
              type="text"
              value={detailAppr ? detailAppr.num : totalCnt + 1}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 작성자 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">
              작성자
            </label>
            <input
              type="text"
              value={detailAppr?.writerName ?? user.emp_name}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 제목 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">제목</label>
            <input
              type="text"
              disabled={
                !detailAppr
                  ? false
                  : detailAppr.statusCode == "REJ" ||
                    detailAppr.statusCode == "TMP"
                  ? false
                  : true
              }
              name="title"
              value={values.title}
              onChange={changeValues}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </div>

          {/* 내용 */}
          <div className="flex items-start gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600 leading-7">
              내용
            </label>
            <textarea
              rows={6}
              disabled={
                !detailAppr
                  ? false
                  : detailAppr.statusCode == "REJ" ||
                    detailAppr.statusCode == "TMP"
                  ? false
                  : true
              }
              name="content"
              value={values.content}
              onChange={changeValues}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </div>

          {/* 버튼 */}
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => navigate("/approvalList")}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
            >
              취소
            </button>
            {detailAppr ? (
              <button
                onClick={() => handleAppr("REJ")}
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90"
              >
                반려
              </button>
            ) : (
              ""
            )}

            {!detailAppr || detailAppr?.statusCode == "TMP" ? (
              <button
                onClick={() => handleAppr("TMP")}
                className="rounded-lg bg-red-900 px-4 py-2 text-sm text-white hover:opacity-90"
              >
                임시저장
              </button>
            ) : (
              ""
            )}

            <button
              onClick={() =>
                handleAppr(
                  user.position_cd === "pm"
                    ? "CMP"
                    : user.position_cd === "pl"
                    ? "APR"
                    : "PND"
                )
              }
              className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              결재
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
