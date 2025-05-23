import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState([]);
  const [uploadError, setUploadError] = useState({
    isError: false,
    message: "",
  });
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [isOffer, setIsoffer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imgUrl: [],
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleImageUpload = async () => {
    if (imageFile.length > 0 && imageFile.length + formData.imgUrl.length < 7) {
      setLoading(true);
      const promises = [];
      console.log(imageFile);
      console.log(formData);
      for (const file of imageFile) {
        promises.push(uploadToCloudinary(file));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imgUrl: formData.imgUrl.concat(urls) });
          setLoading(false);
        })
        .catch((error) => {
          setUploadError({ ...uploadError, isError: true, message: error });
          setLoading(false);
        });
    } else {
      setUploadError({
        ...uploadError,
        isError: true,
        message: "Select file first (max:6)",
      });
      setLoading(false);
    }
  };

  const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nivasa"); // Your Cloudinary preset
      formData.append("cloud_name", "do02igykn"); // Your Cloudinary cloud name

      axios
        .post(
          "https://api.cloudinary.com/v1_1/do02igykn/image/upload",
          formData
        )
        .then((response) => resolve(response.data.secure_url))
        .catch((error) => reject(`Upload failed: ${error.message}`));
    });
  };

  const handleDelete = (index) => {
    setFormData({
      ...formData,
      imgUrl: formData.imgUrl.filter(
        (items) => items !== formData.imgUrl[index]
      ),
    });
  };

  uploadError.isError &&
    toast.error(uploadError.message, {
      autoClose: 2000,
    });

  const handleFormSubmit = async (data) => {
    try {
      setFormSubmitLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...data,
            imgUrl: formData.imgUrl,
            userRef: currentUser._id,
          }),
        }
      );
      const serverRes = await res.json();
      if (serverRes.success === false) {
        toast.error(serverRes.message, {
          autoClose: 2000,
        });
        setFormSubmitLoading(false);
      } else {
        navigate(`/listing/${serverRes._id}`);
        setFormSubmitLoading(false);
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
      setFormSubmitLoading(false);
    }
  };

  return (
    <main>
      <section>
        <div className="container py-7 md:py-16 max-w-5xl">
          <h1 className="text-center text-2xl font-heading font-bold text-black">
            Create a Listing
          </h1>
          <div className="mt-8 form_container">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="feilds_container grid gap-5 md:gap-10  grid-col-1 md:grid-cols-2 items-start  ">
                {/* ====== Form Sections Start Form Here ===== */}
                <div className="info_container">
                  <div className="input_feilds">
                    <input
                      id="title"
                      type="text"
                      placeholder="Property name"
                      name="title"
                      className="form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm "
                      min={10}
                      max={50}
                      {...register("title", {
                        required: "This feild is required*",
                      })}
                    />
                    {errors.title && (
                      <p className="text-red-700 text-xs">
                        {errors.title.message}
                      </p>
                    )}

                    <textarea
                      id="description"
                      type="text"
                      placeholder="Description"
                      name="description"
                      className="form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm mt-3"
                      {...register("description", {
                        required: "This feild is required*",
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-700 text-xs">
                        {errors.description.message}
                      </p>
                    )}

                    <input
                      id="address"
                      type="text"
                      placeholder="Address"
                      name="address"
                      className="form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm mt-3"
                      {...register("address", {
                        required: "This feild is required*",
                      })}
                    />
                    {errors.address && (
                      <p className="text-red-700 text-xs font-semibold">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="additional_info mt-6 max-w-xs">
                    <div className="property_type">
                      <p className="font-heading text-black">
                        Select property type
                      </p>
                      <div className="form-control mt-2">
                        <label
                          className="label cursor-pointer flex items-center justify-start gap-2
                                            "
                        >
                          <input
                            type="radio"
                            name="sale"
                            id="sale"
                            required
                            value={"sale"}
                            className="radio w-5 h-5 bg-transparent border border-solid border-gray-400  checked:bg-brand-blue checked:border-brand-blue dark:checked:bg-white dark:checked:border-brand-blue"
                            {...register("type")}
                          />

                          <span className="label-text font-medium">
                            For Sale
                          </span>
                        </label>
                      </div>
                      <div className="form-control ">
                        <label
                          className="label cursor-pointer flex items-center justify-start gap-2
                                            "
                        >
                          <input
                            type="radio"
                            name="rent"
                            id="rent"
                            value={"rent"}
                            required
                            className="radio w-5 h-5 bg-transparent border border-solid border-gray-400  checked:bg-brand-blue checked:border-brand-blue dark:checked:bg-white dark:checked:border-brand-blue"
                            {...register("type")}
                          />
                          <span className="label-text font-medium">
                            For Rent
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="property_info mt-3">
                      <p className="font-heading text-black">
                        Genarel Information
                      </p>
                      <div className="max-w-[200px] flex items-center justify-between gap-2 mt-2">
                        <span className="label-text font-medium">
                          Area <small>(sqft)</small>
                        </span>
                        <div>
                          <input
                            defaultValue={550}
                            className="border-2 focus:border-brand-blue rounded-md max-w-[84px] py-1 px-2 bg-white"
                            type="number"
                            name="area"
                            id="area"
                            {...register("area", { required: "required" })}
                          />
                          {errors.area && (
                            <p className="text-red-700 text-xs font-semibold">
                              {errors.area.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="max-w-[200px]  flex items-center justify-between gap-2 mt-2">
                        <span className="label-text font-medium">Bedrooms</span>
                        <div>
                          <input
                            defaultValue={1}
                            className="border-2 focus:border-brand-blue rounded-md max-w-[84px] min-w-[84px]  py-1 px-2 bg-white"
                            min={1}
                            max={10}
                            type="number"
                            name="beds"
                            id="bed"
                            {...register("bed", { required: "required" })}
                          />
                          {errors.bed && (
                            <p className="text-red-700 text-xs font-semibold">
                              {errors.bed.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="max-w-[200px] flex items-center justify-between gap-2 mt-1">
                        <span className="label-text font-medium">
                          Bathrooms
                        </span>
                        <div>
                          <input
                            defaultValue={1}
                            className="border-2 focus:border-brand-blue rounded-md max-w-[84px] min-w-[84px] py-1 px-2 bg-white"
                            min={1}
                            max={10}
                            type="number"
                            name="beds"
                            id="bath"
                            {...register("bath", { required: "required" })}
                          />
                          {errors.bath && (
                            <p className="text-red-700 text-xs font-semibold">
                              {errors.bath.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="additional_feature mt-3">
                      <p className="font-heading text-black">
                        Additional Information
                      </p>
                      <div className="form-control">
                        <label className="label cursor-pointer flex items-center justify-start gap-2">
                          <input
                            id="parking"
                            type="checkbox"
                            name="parking"
                            className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-brand-blue"
                            {...register("parking")}
                          />
                          <span className="label-text font-medium">
                            Parking
                          </span>
                        </label>
                        <label className="label cursor-pointer flex items-center justify-start gap-2">
                          <input
                            id="furnished"
                            type="checkbox"
                            className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-brand-blue"
                            {...register("furnished")}
                          />
                          <span className="label-text font-medium">
                            Furnished
                          </span>
                        </label>

                        <label className="label cursor-pointer flex items-center justify-start gap-2">
                          <input
                            id="offer"
                            type="checkbox"
                            className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-brand-blue"
                            {...register("offer")}
                            onChange={() => setIsoffer(!isOffer)}
                          />
                          <span className="label-text font-medium">
                            Do you have any discount?
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className=" mt-1">
                      <div className="pricing_info flex flex-col">
                        <p className="mt-3  font-heading text-black">
                          Regular Price{" "}
                        </p>
                        <span className="text-sm font-content font-bold text-red-900">
                          (₹ /month)
                        </span>
                        <div className="flex flex-row mt-2 ">
                          <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-2 font-bold text-grey-darker text-xl">
                            ₹
                          </span>
                          <input
                            id="price"
                            type="number"
                            name="price"
                            className="bg-white p-2 rounded-md text-grey-darkest border-2 focus:border-brand-blue font-bold text-red-700 text-lg max-w-[200px]"
                            {...register("price", {
                              required: "This feild is required*",
                            })}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-red-700 text-xs font-semibold">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                      {isOffer && (
                        <div className="pricing_info flex flex-col">
                          <p className="mt-3  font-heading text-black">
                            Discount Price{" "}
                          </p>
                          <span className="text-sm font-content font-bold text-red-900">
                            (₹ /month)
                          </span>
                          <div className="flex flex-row mt-2 ">
                            <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-2 font-bold text-grey-darker text-xl">
                              ₹
                            </span>
                            <input
                              id="discountPrice"
                              type="number"
                              name="discountPrice"
                              className="bg-slate-100 p-2 rounded-md text-grey-darkest border-2 focus:border-brand-blue font-bold text-red-700 text-lg max-w-[200px]"
                              {...register("discountPrice", {
                                required: "This feild is required*",
                                validate: (value) => {
                                  const { price } = getValues();
                                  if (+price < +value) {
                                    return "*Discount price should be lower than regular price";
                                  }
                                },
                              })}
                            />
                          </div>
                          {errors.discountPrice && (
                            <p className="text-red-700 text-xs font-semibold">
                              {errors.discountPrice.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* === Image Uploading Section Start Here === */}
                <div>
                  <p className="font-content text-[16px] mb-3 font-normal text-black">
                    <span className="font-semibold mr-1">Note:</span>
                    First image will be cover image (max:6)
                  </p>
                  <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">
                    <input
                      onChange={(e) => setImageFile(e.target.files)}
                      required
                      multiple
                      accept="image/*"
                      type="file"
                      className={`file-input file:bg-brand-blue dark:bg-white bg-red-00 ${
                        loading ? "md:w-4/6" : "md:w-4/5"
                      } w-full`}
                    />
                    <button
                      disabled={loading || imageFile.length === 0}
                      onClick={handleImageUpload}
                      type="button"
                      className={`w-full text-green-600 text-sm py-2 border-2 border-green-600 rounded-md mt-2 uppercase font-heading  ${
                        loading ? "md:w-2/6" : "md:w-1/5"
                      } md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-gray-500 disabled:text-gray-500`}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                  <div>
                    {formData.imgUrl.length > 0 &&
                      formData.imgUrl.map((imgSrc, index) => {
                        return (
                          <div
                            key={index}
                            className="uploaded_images p-2 pr-5 border-2 mt-4  rounded-md flex items-center justify-between"
                          >
                            <img
                              src={imgSrc}
                              alt="property Image"
                              className="w-24 h-20 object-cover rounded-md"
                            />
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="font-medium text-lg text-red-700 flex items-center underline hover:opacity-75"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                    <div className="post_btn mt-7">
                      <button
                        disabled={
                          formData.imgUrl.length < 1 ||
                          loading ||
                          formSubmitLoading
                        }
                        type="submit"
                        className="w-full bg-brand-blue text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300 text-white p-3"
                      >
                        {formSubmitLoading ? "Creating..." : "Create Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};

export default CreatePost;
