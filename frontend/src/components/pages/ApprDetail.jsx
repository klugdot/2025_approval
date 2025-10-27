import { useParams } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import DocStatus from "./DocStatus";
import { useEffect, useState } from "react";
import ApprStatus from "./ApprStatus";

export default function ApprDetail() {
  const { num } = useParams();
  const [detailAppr, setDetailAppr] = useState({});
  console.log("상세보기");
  const baseUrl = import.meta.env.VITE_API_URL;

  // 상세보기 - 작성자 이름 같이 받아와야 함
  useEffect(() => {
    const detail = async () => {
      const res = await fetch(`${baseUrl}/approval/${num}`);
      const data = await res.json();
      setDetailAppr(data);
    };
    detail();
  }, [num]);

  return (
    <div className="mx-auto max-w-[1200px] p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 처리
      </h1>
      <ApprStatus detailAppr={detailAppr} />
      <BasicInfo detailAppr={detailAppr} />
      <DocStatus docNum={num} />
    </div>
  );
}
