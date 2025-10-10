import BasicInfo from "./BasicInfo";
import DocStatus from "./DocStatus";

export default function ApprAdd() {
  return (
    <div className="mx-auto max-w-[1200px] p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 등록
      </h1>

      {/* <BasicInfo totalCnt={totalCnt} /> */}
      <BasicInfo />
      <DocStatus />
    </div>
  );
}
