import { React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import axios from "axios";
import {
  loddingStart,
  signoutFailed,
  signoutSuccess,
  userDeleteFail,
  userDeleteSuccess,
  userUpdateFailed,
  userUpdateSuccess,
} from "../redux/user/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import Loading from "../components/Loading.jsx";
import { clearSavedListing } from "../redux/saveListing/saveListingSlice.js";
import Footer from "../components/Footer.jsx";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadingPerc, setUploadingPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userPosts, setUserPost] = useState({
    isPostExist: false,
    posts: [],
  });

  const [userPostLoading, setUserPostLoading] = useState(false);

  const fileRef = useRef(null);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    if (file) {
      setUploadingPerc(0);
      setFileUploadError(false);
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", "nivasa"); // Your Cloudinary preset
      formDataCloud.append("cloud_name", "do02igykn"); // Your Cloudinary cloud name
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/do02igykn/image/upload",
          formDataCloud,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadingPerc(percentCompleted);
            },
          }
        );
        setFormData((prev) => ({ ...prev, avatar: response.data.secure_url }));
        setUploadingPerc(100);
      } catch (error) {
        setFileUploadError(true);
        setUploadingPerc(0);
      }
    }
  };

  useEffect(() => {
    if (file) handleFileUpload(file);
    // eslint-disable-next-line
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      dispatch(loddingStart());
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          autoClose: 2000,
        });
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
          body: JSON.stringify(formData),
        }
      );
      const userData = await res.json();

      //===checking reqest success or not ===//
      if (userData.success === false) {
        dispatch(userUpdateFailed(userData.message));

        //===showing error in tostify====//
        toast.error(userData.message, {
          autoClose: 5000,
        });
      } else {
        dispatch(userUpdateSuccess(userData));
        toast.success("Profile updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      dispatch(userUpdateFailed(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(loddingStart());
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          autoClose: 2000,
        });
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      const resData = await res.json();
      //===checking reqest success or not ===//
      if (resData.success === false) {
        dispatch(userDeleteFail(resData.message));

        //===showing error in tostify====//
        toast.error(resData.message, {
          autoClose: 2000,
        });
      } else {
        dispatch(userDeleteSuccess());
      }
    } catch (error) {
      dispatch(userDeleteFail(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          autoClose: 2000,
        });
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signout`,
        {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header
          }, // Include cookies if needed
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailed(data.message));
        toast.error(data.message, { autoClose: 2000 });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(signoutSuccess());
        dispatch(clearSavedListing());
      }
    } catch (error) {
      dispatch(signoutFailed(error.message));
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  // ======Loading User Posts  =====//
  useEffect(() => {
    const loadPost = async () => {
      try {
        setUserPostLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/posts/${currentUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.message || "Failed to load posts", {
            autoClose: 2000,
          });

          // Clear invalid token and logout
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(signoutSuccess());
          return;
        }

        const data = await res.json();
        setUserPost({
          ...userPosts,
          isPostExist: true,
          posts: data,
        });
      } catch (error) {
        console.error("Error loading posts:", error);
        toast.error("Unable to load posts. Please try again.", {
          autoClose: 2000,
        });
      } finally {
        setUserPostLoading(false);
      }
    };

    if (currentUser?._id) {
      loadPost();
    }
  }, [currentUser?._id, dispatch]);

  // ======Handling User Post DELETE  =====//
  const handlePostDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );

      const data = await res.json();

      //===checking reqest success or not ===//
      if (data.success === false) {
        //===showing error in tostify====//
        toast.error(data.message, {
          autoClose: 2000,
        });
      } else {
        const restPost = userPosts.posts.filter((post) => post._id !== postId);
        setUserPost({
          ...userPosts,
          posts: restPost,
        });

        toast.success(data, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <section>
        <div className="max-w-7xl sm:max-w-full mx-auto grid md:gap-6 temp lg:grid-cols-4  md:grid-cols-5 grid-cols-1 items-start">
          <div className="profile_info p-5 bg-white  w-full  md:col-span-2 lg:col-span-1  md:max-h-full md:min-h-screen h-full col-span-1 ">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="image_container w-full flex items-center justify-center  relative max-w-[100px] mx-auto">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    accept="image/*"
                    type="file"
                    name="profile"
                    id="profile_image"
                    ref={fileRef}
                  />
                  <img
                    src={formData.avatar || currentUser.avatar}
                    onClick={() => fileRef.current.click()}
                    className="h-24 w-24 object-cover mb-3 rounded-full border-[1px]  border-brand-blue"
                    alt="profile image"
                  />
                  <i className="h-6 w-6 rounded-full flex items-center justify-center bg-brand-blue text-white absolute bottom-3 right-0">
                    <AiFillEdit />
                  </i>
                </div>

                {fileUploadError ? (
                  <p className="text-xs text-red-700 font-medium text-center">
                    File upload failed
                  </p>
                ) : uploadingPerc > 0 && uploadingPerc < 100 ? (
                  <p className="text-xs text-black font-medium text-center">
                    File uploading...{uploadingPerc}%
                  </p>
                ) : (
                  uploadingPerc === 100 && (
                    <p className="text-xs text-green-600 font-medium text-center">
                      File uploaded!!!
                    </p>
                  )
                )}
              </div>

              <label className="text-left font-heading text-sm pl-1 ">
                Username
              </label>
              <input
                defaultValue={currentUser.username}
                name="username"
                type="text"
                placeholder="Username"
                className="form_input bg-slate-200 rounded-md !pl-3 mt-1 !border-[1px] focus:!border-brand-blue mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Email
              </label>
              <input
                defaultValue={currentUser.email}
                name="email"
                type="email"
                placeholder="Username"
                className="  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-brand-blue mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mt-1  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-brand-blue"
                onChange={handleChange}
              />

              <button
                disabled={loading}
                type="submit"
                className="py-2 px-5 bg-brand-blue text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              >
                {loading ? "Loading..." : "Save Changes"}
              </button>
            </form>
            <div className="btn_container">
              <div className=" flex justify-between items-center md:flex-col xl:flex-row mt-2">
                <button
                  onClick={handleLogOut}
                  className="md:w-full font-heading  xl:w-auto py-2 px-5 bg-red-800 text-white rounded-md   mt-2 hover:opacity-90 text-sm"
                >
                  Log Out
                </button>

                <button
                  onClick={handleDelete}
                  className="md:w-full xl:w-auto py-2 px-5 bg-red-800  text-white font-heading rounded-md mt-2 hover:opacity-90 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/*======== post section start here ========= */}

          <div className=" mt-5 md:mt-0 col-span-3 post_section profile_info p-2 flex flex-col   bg-transparent  w-full ">
            {userPostLoading ? (
              <div>
                <Loading />
                <p className="text-brand-blue text-center font-heading text-xl">
                  Loading your post…
                </p>
              </div>
            ) : (
              <div className="grid post_card grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:h-full overflow-scroll pb-10 px-4 scrollbar-hide md:pt-5">
                {/* ADD NEW POST BUTTON  */}
                <div className="cursor-pointer rounded-md  bg-white  shadow-lg hover:shadow-xl">
                  <button
                    onClick={() => navigate("/create_post")}
                    type="submit"
                    className=" px-5 bg-slate-300 font-heading shadow-lg text-black text-lg  rounded-sm hover:opacity-95 w-full h-full flex justify-center items-center flex-col py-10 sm:py-10"
                  >
                    <BsFillPlusSquareFill className="text-center md:mb-3 md:text-5xl text-black text-sm sm:text-xl" />
                    Create New Post
                  </button>
                </div>

                {userPosts.isPostExist &&
                  userPosts.posts.map((post) => (
                    <PostCard
                      key={post._id}
                      postInfo={{ post, handlePostDelete }}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
