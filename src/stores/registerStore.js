import { create } from "zustand";

const useRegisterFormStore = create((set) => ({
  fullname: "",
  user_type: "buyer", // default to buyer
  farm_image: null,
  farm_name: "",
  farm_address: "",
  email: "",
  password: "",
  phone_number: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setFullName: (fullname) => set({ fullname }),
  setSelectedCountry: (selectedCountry) => set({ selectedCountry }),
  setUserType: (userType) => set({ user_type: userType }), // Fixed key to match the state
  setFarmName: (farmName) => set({ farm_name: farmName }),
  setFarmAddress: (farmAddress) => set({ farm_address: farmAddress }),
  setFarmImage: (farmImage) => set({ farm_image: farmImage }),
  setFarmDescription: (farmDescription) =>
    set({ farm_description: farmDescription }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPhoneNumber: (phoneNumber) => set({ phone_number: phoneNumber }), // Fixed key to match the state
  resetForm: () =>
    set({
      fullname: "",
      user_type: "buyer",
      farm_image: null,
      farm_name: "",
      farm_address: "",
      email: "",
      password: "",
      phone_number: "",
    }),
}));

export default useRegisterFormStore;
