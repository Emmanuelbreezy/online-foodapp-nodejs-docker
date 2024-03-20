export interface CreateVendorInput {
  name: string;
  ownerName: string;
  foodType: string[];
  pincode: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface EditLoginInputDto {
  name: string;
  address: string;
  phoneNumber: string;
  foodType: string[]
}

export interface VendorLoginInputs {
  email: string;
  password: string;
}
export interface VendorPayloadDto {
  _id: string;
  email: string;
  name: string;
  foodType: string[]
  role?: string;
}