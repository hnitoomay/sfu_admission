import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

interface CardParams {
  type: "education" | "work";
  id?: string;
  title1: string;
  title2: string;
  duration?: string;
  onDelete: (id: string) => void;
  onEdit?: () => void;
}

function Card(props: CardParams) {
  const { type, title1, title2, onDelete, id, duration, onEdit } = props;

  const icon =
    type == "education" ? (
      <SchoolOutlinedIcon className="w-6 h-6 text-gray-800" />
    ) : (
      <BusinessCenterOutlinedIcon className="w-6 h-6 text-gray-800" />
    );

  return (
    <div className="items-center bg-blue-150 p-4 rounded-lg shadow-md">
      <div className="flex justify-between sm:p-1 md:p-3">
        <div className="flex grow">
          {/* Icon */}
          <div className="lg:w-14 lg:h-14 md:w-14 md:h-14 sm:w-12 sm:h-9 rounded-md bg-white-100 mr-4 flex items-center justify-center">
            {icon}
          </div>

          {/* University Title */}
          <div className="w-fit">
            <div className="flex-1 md:text-lg sm:text-[14px] font-semibold text-gray-800">
              {title1}
            </div>
            <div className="flex space-x-2">
              <span className="text-gray-600 font-medium block mt-1 sm:text-sm">
                {title2}
              </span>
              <span className="flex items-center text-gray-600 font-medium mt-1 sm:text-xs">
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="flex grow-0 sm:space-x-2 md:space-x-8 md:items-center sm:mt-2">
          <div
            onClick={onEdit}
            className="cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <EditOutlinedIcon
              sx={{
                color: "#343330",
                ":hover": {
                  color: "red",
                },
              }}
            />
          </div>
          <div
            onClick={() => onDelete(id as string)}
            className="cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <DeleteOutlinedIcon
              sx={{
                color: "#343330",
                ":hover": {
                  color: "red",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
