import { Link } from "react-router-dom";

const UnderConstruction = ({ pageName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="text-6xl text-primary mb-6">🚧</div>
        <h1 className="text-4xl font-bold mb-4">
          หน้านี้กำลังอยู่ระหว่างการพัฒนา
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ขออภัยในความไม่สะดวก เรากำลังพัฒนาหน้า {pageName} ให้ดียิ่งขึ้น
          <br />
          โปรดกลับมาเยี่ยมชมอีกครั้งในเร็วๆ นี้
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
