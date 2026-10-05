import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import ProgramCard from "../../components/ProgramCard";
import ProgramType from "../../components/ProgramType";
import { useGetAuthUser } from "../../services/user/getAuthUser";

interface ProgramData {
  id: string | number;
  program: string;
  apply_status: number;
}

function MyProgram() {
  const { user, isErrorUser, userLoading } = useGetAuthUser();
  const navigate = useNavigate();
  const data = user?.document;

  return (
    <div className="bg-white-150 xl:px-[150px] lg:px-[100px] md:px-[40px] sm:px-[20px] py-[40px]">
      {(userLoading || isErrorUser) && <LoadingSpinner />}
      <h3 className="text-gray-800 font-bold text-lg uppercase mb-[24px]">
        My Program
      </h3>

      {data?.map((item: ProgramData) => (
        <ProgramType
          key={item.id}
          programName={item.program}
          type={
            item.apply_status == 0
              ? "review"
              : item.apply_status == 1
              ? "accept"
              : "reject"
          }
        />
      ))}

      <div className="mt-16">
        <h3 className="text-gray-800 font-bold text-lg uppercase mb-[24px]">
          AVAILABLE PROGRAMMES
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProgramCard
            university="University of Wolverhampton"
            subject="Master of Business Administration"
            description="This MBA Programmes is designed for aspirating business leaders seeking advanced knowledge and skills, equipping them to lead and innovate in today's dynamic global marketplace."
            onClick={() =>
              navigate("/mba-sfu-wolverhampton", { replace: true })
            }
          />

          <ProgramCard
            university="University of Wolverhampton"
            subject="MSc (Computer Science)"
            description="This MSc (Computer Science) programme is designed for individuals seeking advanced knowledge and skills in computing, euipping them to innovate and excel in today's rapidly evolving technological landscape."
            onClick={() =>
              navigate("/msc-sfu-wolverhampton", { replace: true })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default MyProgram;
