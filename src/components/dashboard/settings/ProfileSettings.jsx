import { useMemo, useState } from "react";
import Button from "../global/Button";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import userService from "../../../services/userService";
import countryList from "react-select-country-list";
import { Select } from "../..";

export default function ProfileSettings() {
  const { user, updateUserDetails } = useAuth();

  const inputData = [
    { label: "Full Name", name: "firstName", readOnly: false },
    { label: "User's ID", name: "userId", readOnly: true },
    { label: "Phone Number", name: "phone", readOnly: false },
    { label: "Country", name: "country", readOnly: false },
    { label: "Email", name: "email", readOnly: true },
  ];
  let names = user?.user?.name ? user?.user?.name.split(/\s+/) : [];
  let fName = names.length > 0 ? names[0] : "";
  const [allData, setAllData] = useState({
    firstName: fName,
    userId: user?.user?.userId,
    phone: user?.user?.phone,
    country: user?.user?.country,
    email: user?.user?.email,
  });
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #000",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#000 !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#000",
    }),
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await userService.updateUserDetails(user, {
        ...allData,
        name: `${allData.firstName}`,
        phoneNo: allData.phone,
      });

      if (response?.data?.success) {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          setIsLoading(false);
          updateUserDetails(updatedUserResponse?.data?.data);
          toast.success("Profile Updated Successfully");
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const options = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (selectedCountry) =>
    handleDataChange("country", selectedCountry.label);

  return (
    <div className="mt-4 space-y-4 text-black">
      <h1 className="text-2xl ">Profile Settings</h1>
      <div className="grid grid-cols-1  gap-4 w-full items-center">
        {inputData.map(({ label, name, readOnly }) => (
          <div key={name} className="w-full">
            <label className="block text-black font-normal mb-1">{label}</label>
            {name === "country" ? (
              <Select
                options={options}
                value={options.find((option) => option.label === allData[name])}
                onChange={handleCountryChange}
                customStyles={customStyles}
              />
            ) : (
              <input
                type="text"
                name={name}
                readOnly={readOnly}
                value={allData[name]}
                onChange={(e) => handleDataChange(name, e.target.value)}
                className="w-full  text-black px-2.5 py-[7px] border rounded-md border-solid border-slate-200 outline-none !ml-0"
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full md:flex md:items-center md:justify-end">
        <Button
          className="w-full sm:!w-[10%]"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
