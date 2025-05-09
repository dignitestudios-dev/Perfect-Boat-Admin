import React, { useContext, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import DeleteBlog from "../../pages/TidesTalesAndGuide/DeleteBlog";
import { Blogsimg, CoinIcon } from "../../assets/export";
import moment from "moment";

const BlogsCard = ({ blog }) => {
  console.log("🚀 ~ BlogsCard ~ blog:", blog);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDotsClick = (event) => {
    event.stopPropagation();
    setDropdownVisible((prev) => !prev);
  };

  const handleEditClick = (event, id, blog) => {
    event.stopPropagation();
    navigate(`/updateblog/${blog?._id}`, { state: blog });
  };

  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setDeleteId(id);
  };

  const parseHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";

    const parsedText = parseHTML(text);

    if (parsedText.length > maxLength) {
      return parsedText.slice(0, maxLength) + "...";
    }

    return parsedText;
  };

  const truncatedStory = truncateText(blog?.story, 80);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/blogs/${blog._id}`, { state: blog });
      }}
      className="w-full h-[334px] cursor-pointer flex flex-col justify-start items-start rounded-[16px] shadow-md bg-[#1A293D] relative"
    >
      <div className="relative w-full h-[220px] rounded-t-[16px] overflow-hidden">
        <img
          src={blog?.cover || Blogsimg}
          alt="blog_image"
          className="w-full h-full object-cover"
        />
        <DeleteBlog
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          id={deleteId}
        />
        <div className="absolute top-4 right-3">
          <button onClick={handleDotsClick} className="text-white text-lg">
            <GoKebabHorizontal className="rotate-90" />
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-[#1A293D] text-white rounded-md shadow-lg">
              <button
                onClick={(e) => handleEditClick(e, blog?._id, blog)}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  handleDeleteClick(e, blog?._id);
                }}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[calc(100%-210px)] flex flex-col gap-2 justify-start items-start p-4">
        <span className="text-[10px] font-medium text-[#199BD1]">
          {blog?.isAdmin ? "Admin" : "Owner"} |
          <span className="mx-1 ">
            {moment(blog?.createdAt).format("MM-DD-YYYY")}
          </span>
        </span>

        <div className="relative w-full flex flex-col justify-start items-start gap-2">
          <div className="space-y-2">
            <h1 className="text-[16px] font-bold leading-[21.6px] text-white">
              {blog?.title?.length > 38
                ? blog?.title?.slice(0, 38) + "..."
                : blog?.title || "Blog Heading Here"}
            </h1>
            <p className="text-[12px] font-normal leading-[16.2px] text-white/50">
              {blog?.subTitle?.length > 150
                ? blog?.subTitle?.slice(0, 150) + "..."
                : blog?.subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
