import { TBike } from './Bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
};
