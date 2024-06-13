import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);
  return result;
};
const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeInfoIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteBikeFromDB = async (bikeId: string) => {
  const result = await Bike.findByIdAndDelete(bikeId);

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeInfoIntoDB,
  deleteBikeFromDB,
};
