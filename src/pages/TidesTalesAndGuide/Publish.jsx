import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PublishModal from "../TidesTalesAndGuide/PublishModal";
import { BlogContext } from "../../contexts/BlogContext";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
const Publish = () => {
  const [selectedOption, setSelectedOption] = useState("everyone");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    setViewers,
    viewers,
    title,
    setTitle,
    subTitle,
    setSubTitle,
    story,
    setStory,
    imageText,
    setImageText,
    coverFile,
    setCoverFile,
    coverUrl,
    setCoverUrl,
    setDueDate,
    dueDate,
  } = useContext(BlogContext);
  console.log("🚀 ~ Publish ~ coverFile:", coverFile);
  console.log("🚀 ~ Publish ~ coverUrl:", coverUrl);

  const { state } = useLocation();

  const [loading, setLoading] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setViewers(event.target.value);
  };

  function createHtmlTemplate(content, title, subtitle) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${subtitle}">
  </head>
  <body>
    ${content}
  </body>
  </html>
  `;
  }

  const handlePublish = async () => {
    try {
      console.log("cover", coverFile);
      setLoading(true);
      const formdata = new FormData();
      formdata.append("title", title);
      {
        coverFile
          ? formdata.append("cover", coverFile)
          : formdata.append("updateCover", coverUrl);
      }
      formdata.append("subTitle", subTitle);
      if (imageText) {
        formdata.append("imageTitle", imageText);
      }
      if (dueDate?.unix) {
        formdata.append("scheduleDate", dueDate?.unix);
      }
      formdata.append("story", createHtmlTemplate(story, title, subTitle));
      formdata.append("viewer", viewers);
      if (state?.id) {
        const response = await axios.put(`/admin/blog/${state?.id}`, formdata);
        if (response.status === 200) {
          // Update the blogsData to remove the deleted blog
          SuccessToast("Blog created successfully");
          setIsModalOpen(true);
          setCoverFile(null);
          setCoverUrl(null);
          setTitle("");
          setStory("");
          setSubTitle("");
          setImageText("");
          setViewers("");
          setLoading(false);
        }
      } else {
        const response = await axios.post(`/admin/blog`, formdata);
        if (response.status === 200) {
          // Update the blogsData to remove the deleted blog
          SuccessToast("Blog created successfully");
          setIsModalOpen(true);
          setCoverFile(null);
          setCoverUrl(null);
          setTitle("");
          setStory("");
          setSubTitle("");
          setImageText("");
          setViewers("");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/blog/createnewblog"); // Redirect to the desired path
  };

  useEffect(() => {
    setViewers("everyone");
  }, []);
  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 bg-[#0D1B2A]">
      {/* Top Right Button */}
      <div className="flex justify-end mb-6">
        <button
          className="text-[#199BD1] w-[107px] bg-[#1A293D] px-6 py-2 rounded-lg hover:bg-[#147BA1]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="text-white bg-[#199BD1] ml-2 px-3 flex justify-center items-center gap-1 py-2 rounded-lg hover:bg-[#147BA1]"
          onClick={handlePublish}
        >
          Update Now
          {loading && <FiLoader className="animate-spin text-lg ml-1" />}
        </button>
      </div>

      {/* Centered Publish Section */}
      <div className="flex justify-center items-center">
        <div className="rounded-[18px] p-6 flex flex-col items-center gap-4 bg-[#0D1B2A]">
          <h2 className="text-white text-[26px] font-semibold text-center">
            Publish
          </h2>

          {/* Radio Options */}
          <div className="bg-[#0D1B2A] w-[756px] h-[167px] rounded-[12px] p-6 flex flex-col justify-center gap-4 border-[#D9D9D9] border">
            <span className="text-[16px] text-white">This post is for....</span>
            <div className="flex flex-col">
              <label className="flex">
                <input
                  type="checkbox"
                  value="everyone"
                  checked={selectedOption === "everyone"}
                  onChange={handleOptionChange}
                  className="form-checkbox text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Everyone</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  value="manager"
                  checked={selectedOption === "manager"}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">
                  Only for Managers
                </span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  value="employees"
                  checked={selectedOption === "employees"}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">
                  Only for Employees
                </span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  value="singleuser"
                  checked={selectedOption === "singleuser"}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">
                  Only for Single Users
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {isModalOpen && (
        <>
          <PublishModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
      )}
    </div>
  );
};

export default Publish;
