import mongoose from "mongoose";

export interface StopType {
  id?: string;
  country: string;
  city: string;
  description: string;
  images: string[];
  date: Date;
  position: {
    lat: number | null;
    lng: number | null;
  };
}

export interface IJourney extends mongoose.Document {
  countries: string[];
  cities: string[];
  stops: StopType[];
  createdBy: string;
}

const JourneySchema = new mongoose.Schema<IJourney>({
  countries: {
    type: [String],
    required: true,
  },
  cities: {
    type: [String],
    required: true,
  },
  stops: {
    type: [],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Journey ||
  mongoose.model<IJourney>("Journey", JourneySchema);
